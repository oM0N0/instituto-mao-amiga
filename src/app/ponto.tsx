import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import type { Ponto } from '../data/pontos';
import { pontosMock } from '../data/pontos';

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.info}>{ponto.endereco}</Text>
      <Text style={styles.info}>{ponto.diasHorarios}</Text>
      <Text style={styles.info}>{ponto.recebeDistribui}</Text>
    </View>
  );
}

export default function TelaDetalhePonto() {
  const { id } = useLocalSearchParams();
  const ponto = pontosMock.find((p) => p.id === id);

  if (!ponto) {
    return (
      <View style={styles.container}>
        <Text>Ponto não encontrado.</Text>
      </View>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 18,
    marginBottom: 4,
  },
});