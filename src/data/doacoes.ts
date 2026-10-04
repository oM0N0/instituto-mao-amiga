import AsyncStorage from '@react-native-async-storage/async-storage';

export type Doacao = {
  id: string;
  tipoItem: string;
  quantidade: string;
  pontoDestino: string;
  criadoEm: string;
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

export async function excluirDoacao(id: string): Promise<void> {
  const doacoes = await carregarDoacoes();
  const novaLista = doacoes.filter((d) => d.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export async function atualizarDoacao(doacaoAtualizada: Doacao): Promise<void> {
  const doacoes = await carregarDoacoes();
  const novaLista = doacoes.map((d) =>
    d.id === doacaoAtualizada.id ? doacaoAtualizada : d
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}