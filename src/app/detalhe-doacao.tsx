import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusDoErro } from '../services/api';
import { buscarDoacaoPorId } from '../services/doacoesService';
import type { Doacao } from '../types/doacao';
import { formatarData } from '../utils/formatarData';

export default function TelaDetalheDoacao() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // a navegação passa só o id; os dados da doação vêm da API
  useEffect(() => {
    buscarDoacaoPorId(id)
      .then(setDoacao)
      .catch((e) => {
        if (statusDoErro(e) === 404) {
          setErro('Doação não encontrada.');
        } else {
          setErro('Erro ao carregar a doação. Verifique se a API está ligada.');
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

  if (erro || !doacao) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <Text style={styles.erroTexto}>{erro || 'Doação não encontrada.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Tipo do item</Text>
        <Text style={styles.valor}>{doacao.tipoItem}</Text>

        <Text style={styles.label}>Quantidade</Text>
        <Text style={styles.valor}>{doacao.quantidade}</Text>

        <Text style={styles.label}>Ponto de destino</Text>
        <Text style={styles.valor}>{doacao.pontoDestino}</Text>

        <Text style={styles.label}>Data do registro</Text>
        <Text style={styles.valor}>
          {doacao.criadoEm ? formatarData(doacao.criadoEm) : 'Sem data registrada'}
        </Text>
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
  erroTexto: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#888888',
    marginTop: 16,
  },
  valor: {
    fontSize: 18,
    color: '#1B3A5C',
    marginTop: 4,
  },
});
