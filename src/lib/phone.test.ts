import { describe, it, expect } from 'vitest';
import { formatPhoneBR, PHONE_PATTERN } from './phone';

describe('formatPhoneBR', () => {
  it('formata celular com 11 dígitos', () => {
    expect(formatPhoneBR('86994633075')).toBe('(86) 99463-3075');
  });

  it('formata fixo com 10 dígitos', () => {
    expect(formatPhoneBR('8634221234')).toBe('(86) 3422-1234');
  });

  it('descarta letras e símbolos', () => {
    expect(formatPhoneBR('abc86994633075xyz')).toBe('(86) 99463-3075');
  });

  it('corta excesso de dígitos em 11', () => {
    expect(formatPhoneBR('869946330759999')).toBe('(86) 99463-3075');
  });

  it('formata parcialmente enquanto digita', () => {
    expect(formatPhoneBR('8')).toBe('8');
    expect(formatPhoneBR('869')).toBe('(86) 9');
    expect(formatPhoneBR('8699')).toBe('(86) 99');
  });

  it('valores completos casam com PHONE_PATTERN, incompletos não', () => {
    const re = new RegExp(`^${PHONE_PATTERN}$`);
    expect(re.test(formatPhoneBR('86994633075'))).toBe(true);
    expect(re.test(formatPhoneBR('8634221234'))).toBe(true);
    expect(re.test(formatPhoneBR('8699'))).toBe(false);
  });
});
