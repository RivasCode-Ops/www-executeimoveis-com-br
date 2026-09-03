import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler, {
  sanitizeBody,
  waLink,
  clientIp,
  rateLimited,
  resetRateLimit,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './contact';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function makeReq(method: string, body: unknown, headers: Record<string, string> = {}): VercelRequest {
  return { method, body, headers } as unknown as VercelRequest;
}

function makeRes() {
  const res = {
    statusCode: 0,
    payload: undefined as unknown,
    headers: {} as Record<string, string>,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
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

describe('waLink', () => {
  it('adiciona o código do Brasil a DDD + número', () => {
    expect(waLink('86977776666')).toBe('https://wa.me/5586977776666');
    expect(waLink('(86) 9 9463-3075')).toBe('https://wa.me/5586994633075');
  });
  it('respeita número que já vem com 55 e trata vazio', () => {
    expect(waLink('5586994633075')).toBe('https://wa.me/5586994633075');
    expect(waLink('')).toBeNull();
    expect(waLink(undefined)).toBeNull();
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

describe('clientIp', () => {
  it('prefere x-real-ip', () => {
    expect(clientIp(makeReq('POST', {}, { 'x-real-ip': '203.0.113.7' }))).toBe('203.0.113.7');
  });

  it('cai para o primeiro endereço de x-forwarded-for', () => {
    const req = makeReq('POST', {}, { 'x-forwarded-for': '203.0.113.9, 70.41.3.18' });
    expect(clientIp(req)).toBe('203.0.113.9');
  });

  it('devolve null quando não há cabeçalho de origem', () => {
    expect(clientIp(makeReq('POST', {}))).toBeNull();
  });
});

describe('rateLimited', () => {
  beforeEach(() => resetRateLimit());

  it('aceita até o teto e barra a seguinte', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(rateLimited('203.0.113.1')).toBe(false);
    }
    expect(rateLimited('203.0.113.1')).toBe(true);
  });

  it('conta cada IP separadamente', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) rateLimited('203.0.113.2');
    expect(rateLimited('203.0.113.2')).toBe(true);
    expect(rateLimited('203.0.113.3')).toBe(false);
  });

  it('libera quando a janela passa', () => {
    const t0 = 1_000_000;
    for (let i = 0; i < RATE_LIMIT_MAX; i++) rateLimited('203.0.113.4', t0);
    expect(rateLimited('203.0.113.4', t0)).toBe(true);
    expect(rateLimited('203.0.113.4', t0 + RATE_LIMIT_WINDOW_MS + 1)).toBe(false);
  });
});

describe('handler — limite de taxa', () => {
  beforeEach(() => resetRateLimit());

  it('devolve 429 com Retry-After depois do teto, sem tocar nos canais', async () => {
    const lead = { nome: 'Maria', telefone: '86999990000' };
    const ip = { 'x-real-ip': '203.0.113.50' };

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      await handler(makeReq('POST', lead, ip), makeRes());
    }

    const res = makeRes();
    await handler(makeReq('POST', lead, ip), res);

    expect(res.statusCode).toBe(429);
    expect(res.headers['Retry-After']).toBe(String(RATE_LIMIT_WINDOW_MS / 1000));
    expect((res.payload as { ok: boolean }).ok).toBe(false);
  });

  it('não limita quando a requisição não traz IP (teste unitário, fora da borda)', async () => {
    const res = makeRes();
    for (let i = 0; i < RATE_LIMIT_MAX + 3; i++) {
      await handler(makeReq('POST', { nome: 'Ana', telefone: '86988887777', website: 'isca' }), res);
    }
    expect(res.statusCode).toBe(200);
  });
});
