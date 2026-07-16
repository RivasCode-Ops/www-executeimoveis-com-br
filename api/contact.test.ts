import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler, { sanitizeBody } from './contact';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function makeReq(method: string, body: unknown): VercelRequest {
  return { method, body } as VercelRequest;
}

function makeRes() {
  const res = {
    statusCode: 0,
    payload: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: unknown) {
      this.payload = data;
      return this;
    },
  };
  return res as typeof res & VercelResponse;
}

describe('sanitizeBody', () => {
  it('remove espaços das pontas e ignora campos não-string', () => {
    const clean = sanitizeBody({
      nome: '  Maria  ',
      telefone: 86999990000,
      extra: 'ignorado',
    });
    expect(clean.nome).toBe('Maria');
    expect(clean.telefone).toBeUndefined();
    expect('extra' in clean).toBe(false);
  });

  it('corta campos no limite de tamanho', () => {
    const clean = sanitizeBody({ mensagem: 'x'.repeat(10_000) });
    expect(clean.mensagem?.length).toBe(500);
  });

  it('tolera body não-objeto', () => {
    expect(sanitizeBody(null)).toEqual({});
    expect(sanitizeBody('texto')).toEqual({});
    expect(sanitizeBody(undefined)).toEqual({});
  });
});

describe('handler', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('CRM_LEADS_WEBHOOK_URL', '');
    vi.stubEnv('CRM_LEADS_WEBHOOK_SECRET', '');
    vi.stubEnv('CONTACT_TO_EMAIL', 'leads@example.com');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('rejeita métodos que não sejam POST com 405', async () => {
    const res = makeRes();
    await handler(makeReq('GET', {}), res);
    expect(res.statusCode).toBe(405);
  });

  it('responde 200 sem processar quando o honeypot está preenchido', async () => {
    const res = makeRes();
    await handler(makeReq('POST', { nome: 'Bot', telefone: '1', website: 'spam' }), res);
    expect(res.statusCode).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('exige nome e telefone (400)', async () => {
    const res = makeRes();
    await handler(makeReq('POST', { nome: '   ', telefone: '' }), res);
    expect(res.statusCode).toBe(400);
  });

  it('retorna 503 quando e-mail e CRM falham', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'err',
    } as Response);
    const res = makeRes();
    await handler(makeReq('POST', { nome: 'Maria', telefone: '86999990000' }), res);
    expect(res.statusCode).toBe(503);
  });

  it('retorna 200 quando o fallback FormSubmit entrega', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);
    const res = makeRes();
    await handler(makeReq('POST', { nome: 'Maria', telefone: '86999990000' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({ ok: true, email: true, crm: false });
    expect(vi.mocked(fetch).mock.calls[0][0]).toContain('formsubmit.co/ajax/leads%40example.com');
  });

  it('usa Resend quando RESEND_API_KEY está configurada e reporta CRM', async () => {
    vi.stubEnv('RESEND_API_KEY', 'key-teste');
    vi.stubEnv('CRM_LEADS_WEBHOOK_URL', 'https://crm.example.com/webhook');
    vi.stubEnv('CRM_LEADS_WEBHOOK_SECRET', 'segredo');
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);
    const res = makeRes();
    await handler(
      makeReq('POST', { nome: 'Maria', telefone: '86999990000', email: 'maria@example.com' }),
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({ ok: true, email: true, crm: true });
    const urls = vi.mocked(fetch).mock.calls.map((c) => String(c[0]));
    expect(urls).toContain('https://api.resend.com/emails');
    expect(urls).toContain('https://crm.example.com/webhook');
  });

  it('envia alerta no Telegram quando configurado e conta como canal entregue', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'tok');
    vi.stubEnv('TELEGRAM_CHAT_ID', '123');
    // e-mail (FormSubmit) falha, CRM não configurado; só o Telegram entrega
    vi.mocked(fetch).mockImplementation((url: unknown) =>
      Promise.resolve(
        String(url).includes('api.telegram.org')
          ? ({ ok: true } as Response)
          : ({ ok: false, status: 500, text: async () => 'err' } as Response),
      ),
    );
    const res = makeRes();
    await handler(makeReq('POST', { nome: 'Maria', telefone: '86999990000' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({ ok: true, telegram: true });
    const urls = vi.mocked(fetch).mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => u.includes('api.telegram.org/bottok/sendMessage'))).toBe(true);
  });

  it('cai no FormSubmit quando o Resend falha', async () => {
    vi.stubEnv('RESEND_API_KEY', 'key-teste');
    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'err' } as Response)
      .mockResolvedValueOnce({ ok: true } as Response);
    const res = makeRes();
    await handler(makeReq('POST', { nome: 'Maria', telefone: '86999990000' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({ ok: true, email: true });
    expect(String(vi.mocked(fetch).mock.calls[1][0])).toContain('formsubmit.co');
  });
});
