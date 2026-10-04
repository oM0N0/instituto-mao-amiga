import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { Doacao } from '../data/doacoes';
import { carregarDoacoes } from '../data/doacoes';

const DoacaoItem = React.memo(function DoacaoItem({ doacao, onPress }: { doacao: Doacao; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.tipo}>{doacao.tipoItem}</Text>
      <Text style={styles.info}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.info}>Destino: {doacao.pontoDestino}</Text>
      {doacao.criadoEm ? <Text style={styles.data}>{doacao.criadoEm}</Text> : null}
    </TouchableOpacity>
  );
});

export default function TelaHistorico() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [busca, setBusca] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      carregarDoacoes().then(setDoacoes);
    }, [])
  );

  const doacoesFiltradas = doacoes.filter((d) =>
    d.tipoItem.toLowerCase().includes(busca.toLowerCase())
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
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
        style={styles.campoBusca}
        placeholder="Buscar por tipo de item..."
        value={busca}
        onChangeText={setBusca}
      />

      {doacoesFiltradas.length === 0 ? (
        <View style={styles.containerVazio}>
          <Text style={styles.vazio}>
            Nenhuma doação encontrada para "{busca}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={doacoesFiltradas}
          keyExtractor={(doacao) => doacao.id}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <DoacaoItem
              doacao={item}
              onPress={() => router.push({ pathname: '/detalhe-doacao', params: { id: item.id } })}
            />
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  campoBusca: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    margin: 16,
    marginBottom: 0,
    minHeight: 44,
  },
  container: {
    padding: 16,
  },
  containerVazio: {
    flex: 1,
    padding: 16,
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