import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Doacao } from '../data/doacoes';
import { carregarDoacoes, excluirDoacao } from '../data/doacoes';

export default function TelaDetalheDoacao() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doacao, setDoacao] = useState<Doacao | null>(null);

  useEffect(() => {
    carregarDoacoes().then((lista) => {
      const encontrada = lista.find((d) => d.id === id);
      setDoacao(encontrada ?? null);
    });
  }, [id]);

  function handleExcluir() {
    Alert.alert(
      'Excluir doação',
      'Tem certeza que deseja excluir esta doação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await excluirDoacao(id as string);
            router.back();
          },
        },
      ]
    );
  }

  if (!doacao) {
    return (
      <View style={styles.container}>
        <Text>Doação não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo do item</Text>
      <Text style={styles.valor}>{doacao.tipoItem}</Text>

      <Text style={styles.label}>Quantidade</Text>
      <Text style={styles.valor}>{doacao.quantidade}</Text>

      <Text style={styles.label}>Ponto de destino</Text>
      <Text style={styles.valor}>{doacao.pontoDestino}</Text>

      <Text style={styles.label}>Data do registro</Text>
      <Text style={styles.valor}>{doacao.criadoEm || 'Sem data registrada'}</Text>

      <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir}>
        <Text style={styles.botaoExcluirTexto}>Excluir Doação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: '#999999',
    marginTop: 16,
  },
  valor: {
    fontSize: 18,
    color: '#1B3A5C',
    marginTop: 4,
  },
  botaoExcluir: {
    backgroundColor: '#D32F2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    minHeight: 44,
  },
  botaoExcluirTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});