import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
};

const pontoMock: Ponto = {
  nome: 'Mercado Central',
  endereco: 'Av. Rio Branco, 123',
  diasHorarios: 'Seg a Sex, 8h às 18h',
  recebeDistribui: 'Recebe: alimentos, roupas, brinquedos',
};

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
  return <DetalhePonto ponto={pontoMock} />;
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