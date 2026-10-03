import AsyncStorage from '@react-native-async-storage/async-storage';

export type Doacao = {
  id: string;
  tipoItem: string;
  quantidade: string;
  pontoDestino: string;
};

const STORAGE_KEY = '@mao_amiga:doacoes';

export async function salvarDoacao(doacao: Doacao): Promise<void> {
  const doacoes = await carregarDoacoes();
  doacoes.push(doacao);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(doacoes));
}

export async function carregarDoacoes(): Promise<Doacao[]> {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);
  if (dados) {
    return JSON.parse(dados);
  }
  return [];
}