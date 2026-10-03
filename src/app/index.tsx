import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
};

const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Mercado Central',
    endereco: 'Av. Rio Branco, 123',
  },
  {
    id: '2',
    nome: 'Feira do Bairro',
    endereco: 'Praça Nossa Sra. da Conceição',
  },
  {
    id: '3',
    nome: 'Supermercado Boa Vida',
    endereco: 'Rua 15 de Novembro, 456',
  },
];

function PontoItem({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.item}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
    </View>
  );
}

export default function TelaListaPontos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pontos de Coleta</Text>
      {pontosMock.map((ponto) => (
        <PontoItem key={ponto.id} ponto={ponto} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
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