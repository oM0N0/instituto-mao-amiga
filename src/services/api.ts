// IP do computador que está rodando a API (no celular não funciona "localhost").
// Para descobrir no Windows: rode "ipconfig" e pegue o "Endereço IPv4".
const API_URL = 'http://192.168.1.64:8080';

// tempo máximo de espera por uma resposta, para o app não ficar travado carregando
const TEMPO_LIMITE_MS = 10000;

export class ApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`Erro ${status}`);
    this.status = status;
  }
}

// devolve o status HTTP do erro (ex.: 400, 404) ou undefined se a API não respondeu
export function statusDoErro(erro: unknown): number | undefined {
  if (erro && typeof erro === 'object' && 'status' in erro) {
    return (erro as ApiError).status;
  }
  return undefined;
}

async function requisitar(caminho: string, opcoes: RequestInit = {}): Promise<Response> {
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
  try {
    const resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, signal: controle.signal });
    if (!resposta.ok) {
      throw new ApiError(resposta.status);
    }
    return resposta;
  } finally {
    clearTimeout(timer);
  }
}

export async function get<T>(caminho: string): Promise<T> {
  const resposta = await requisitar(caminho);
  return resposta.json();
}

export async function post<T>(caminho: string, body: unknown): Promise<T> {
  const resposta = await requisitar(caminho, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return resposta.json();
}

export async function put<T>(caminho: string, body: unknown): Promise<T> {
  const resposta = await requisitar(caminho, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return resposta.json();
}

export async function del(caminho: string): Promise<void> {
  await requisitar(caminho, { method: 'DELETE' });
}
