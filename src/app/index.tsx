import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listarPontos } from '../services/pontosService';
import type { Ponto } from '../types/ponto';

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
    </TouchableOpacity>
  );
}

function Botoes({ onNovaDoacao, onHistorico }: { onNovaDoacao: () => void; onHistorico: () => void }) {
  return (
    <>
      <TouchableOpacity style={styles.botao} onPress={onNovaDoacao}>
        <Text style={styles.botaoTexto}>+ Nova Doação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botao, styles.botaoHistorico]} onPress={onHistorico}>
        <Text style={styles.botaoTexto}>Histórico de Doações</Text>
      </TouchableOpacity>
    </>
  );
}

export default function TelaListaPontos() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      setErro('');
      listarPontos()
        .then((pagina) => setPontos(pagina.content))
        .catch(() => setErro('Não foi possível carregar os pontos. Verifique sua conexão.'))
        .finally(() => setCarregando(false));
    }, [])
  );

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <ActivityIndicator size="large" color="#1B3A5C" />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <Text style={styles.erro}>{erro}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={pontos}
        keyExtractor={(ponto) => ponto.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item: ponto }) => (
          <PontoItem
            ponto={ponto}
            onPress={() => router.push({ pathname: '/ponto', params: { id: ponto.id } })}
          />
        )}
        ListFooterComponent={
          <Botoes
            onNovaDoacao={() => router.push('/doacao')}
            onHistorico={() => router.push('/historico')}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
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
    paddingBottom: 32,
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
  botao: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    marginTop: 10,
  },
  botaoHistorico: {
    backgroundColor: '#2E7D32',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});