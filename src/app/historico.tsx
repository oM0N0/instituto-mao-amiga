import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

function calcularResumo(doacoes: Doacao[]) {
  const porTipo: Record<string, { quantidade: number; contagem: number }> = {};

  for (const d of doacoes) {
    const tipo = d.tipoItem.toLowerCase();
    if (!porTipo[tipo]) {
      porTipo[tipo] = { quantidade: 0, contagem: 0 };
    }
    porTipo[tipo].quantidade += Number(d.quantidade) || 0;
    porTipo[tipo].contagem += 1;
  }

  return Object.entries(porTipo)
    .map(([tipo, dados]) => ({
      tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      quantidade: dados.quantidade,
      contagem: dados.contagem,
    }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

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

  const resumo = calcularResumo(doacoes);

  if (doacoes.length === 0) {
    return (
      <SafeAreaView style={styles.containerVazio} edges={['bottom', 'left', 'right']}>
        <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push('/doacao')}
        >
          <Text style={styles.botaoTexto}>Cadastrar Doação</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const cabecalho = (
    <View style={styles.resumoContainer}>
      <Text style={styles.resumoTitulo}>
        Total: {doacoes.length} {doacoes.length === 1 ? 'doação' : 'doações'}
      </Text>
      {resumo.map((r) => (
        <Text key={r.tipo} style={styles.resumoLinha}>
          {r.tipo}: {r.quantidade} un. ({r.contagem} {r.contagem === 1 ? 'doação' : 'doações'})
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
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
          ListHeaderComponent={cabecalho}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <DoacaoItem
              doacao={item}
              onPress={() => router.push({ pathname: '/detalhe-doacao', params: { id: item.id } })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  resumoContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  resumoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 8,
  },
  resumoLinha: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
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