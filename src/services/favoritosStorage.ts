import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@mao_amiga:favoritos';

export async function carregarFavoritos(): Promise<string[]> {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export async function toggleFavorito(id: string): Promise<string[]> {
  const favoritos = await carregarFavoritos();
  const index = favoritos.indexOf(id);
  if (index >= 0) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(id);
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
  return favoritos;
}

export async function removerFavorito(id: string): Promise<string[]> {
  const favoritos = await carregarFavoritos();
  const novaLista = favoritos.filter((fav) => fav !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  return novaLista;
}
