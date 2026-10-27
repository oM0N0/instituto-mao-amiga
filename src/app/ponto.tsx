import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarPontoPorId } from '../services/pontosService';
import type { Ponto } from '../types/ponto';

export default function TelaDetalhePonto() {
  const { id } = useLocalSearchParams();
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    setCarregando(true);
    setErro('');
    buscarPontoPorId(Number(id))
      .then(setPonto)
      .catch((e) => {
        if (e.message.includes('404')) {
          setErro('Ponto não encontrado.');
        } else {
          setErro('Erro ao carregar o ponto.');
        }
      })
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <ActivityIndicator size="large" color="#1B3A5C" />
      </SafeAreaView>
    );
  }

  if (erro || !ponto) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <Text style={styles.erro}>{erro || 'Ponto não encontrado.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.nome}>{ponto.nome}</Text>
        <Text style={styles.info}>{ponto.endereco}</Text>
        <Text style={styles.info}>{ponto.diasHorarios}</Text>
        <Text style={styles.info}>{ponto.recebeDistribui}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centro: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  erro: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
  container: {
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