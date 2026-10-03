import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Ponto } from '../data/pontos';
import { pontosMock } from '../data/pontos';

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
    </TouchableOpacity>
  );
}

export default function TelaListaPontos() {
  const router = useRouter();

  return (
    <FlatList
      data={pontosMock}
      keyExtractor={(ponto) => ponto.id}
      contentContainerStyle={styles.container}
      renderItem={({ item: ponto }) => (
        <PontoItem
          ponto={ponto}
          onPress={() => router.push({ pathname: '/ponto', params: { id: ponto.id } })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  endereco: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});