import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Doacao } from '../data/doacoes';
import { carregarDoacoes } from '../data/doacoes';

const DoacaoItem = React.memo(function DoacaoItem({ doacao }: { doacao: Doacao }) {
  return (
    <View style={styles.item}>
      <Text style={styles.tipo}>{doacao.tipoItem}</Text>
      <Text style={styles.info}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.info}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.data}>{doacao.criadoEm}</Text>
    </View>
  );
});

export default function TelaHistorico() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      carregarDoacoes().then(setDoacoes);
    }, [])
  );

  if (doacoes.length === 0) {
    return (
      <View style={styles.containerVazio}>
        <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push('/doacao')}
        >
          <Text style={styles.botaoTexto}>Cadastrar Doação</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={doacoes}
      keyExtractor={(doacao) => doacao.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <DoacaoItem doacao={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  containerVazio: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazio: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  data: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
});