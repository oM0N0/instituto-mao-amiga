import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusDoErro } from '../services/api';
import { buscarDoacaoPorId, excluirDoacao } from '../services/doacoesService';
import { avisar, confirmarExclusao } from '../utils/dialogos';
import type { Doacao } from '../types/doacao';
import { formatarData } from '../utils/formatarData';

export default function TelaDetalheDoacao() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // recarrega sempre que a tela aparece, para mostrar os valores novos depois de editar
  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      setErro('');
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
    }, [id])
  );

  function handleExcluir() {
    confirmarExclusao('Excluir doação', 'Tem certeza que deseja excluir esta doação?', async () => {
      try {
        await excluirDoacao(id);
        router.back();
      } catch {
        avisar('Erro', 'Não foi possível excluir a doação. Verifique se a API está ligada.');
      }
    });
  }

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

        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => router.push({ pathname: '/doacao', params: { id: doacao.id } })}
          >
            <Text style={styles.botaoTexto}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir}>
            <Text style={styles.botaoTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
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
  botoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: '#1B3A5C',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: '#D32F2F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
