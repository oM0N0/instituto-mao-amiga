const API_URL = 'http://192.168.1.64:8080'; // emulador Android
// no celular, trocar pelo IP do computador:
// const API_URL = 'http://192.168.1.64:8080';

export async function get<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${API_URL}${caminho}`);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}`);
  }
  return resposta.json();
}