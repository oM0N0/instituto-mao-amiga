import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Doacao } from '../data/doacoes';
import { carregarDoacoes } from '../data/doacoes';

function DoacaoItem({ doacao }: { doacao: Doacao }) {
  return (
    <View style={styles.item}>
      <Text style={styles.tipo}>{doacao.tipoItem}</Text>
      <Text style={styles.info}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.info}>Destino: {doacao.pontoDestino}</Text>
    </View>
  );
}

export default function TelaHistorico() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    carregarDoacoes().then(setDoacoes);
  }, []);

  return (
    <View style={styles.container}>
      {doacoes.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
      ) : (
        <FlatList
          data={doacoes}
          keyExtractor={(doacao) => doacao.id}
          renderItem={({ item }) => <DoacaoItem doacao={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  vazio: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  info: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});