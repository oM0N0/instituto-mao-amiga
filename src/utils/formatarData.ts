// A API manda a data no formato "2026-11-15T18:49:22".
// Pegamos só os 19 primeiros caracteres para evitar frações de segundo que alguns celulares não entendem.
export function formatarData(dataIso: string): string {
  const data = new Date(dataIso.slice(0, 19));
  if (isNaN(data.getTime())) {
    return dataIso;
  }
  return data.toLocaleString('pt-BR');
}
