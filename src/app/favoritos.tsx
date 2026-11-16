import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusDoErro } from '../services/api';
import { carregarFavoritos, removerFavorito } from '../services/favoritosStorage';
import { buscarPontoPorId } from '../services/pontosService';
import type { Ponto } from '../types/ponto';

export default function TelaFavoritos() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        setCarregando(true);
        setErro('');
        // no aparelho ficam só os ids; os dados de cada ponto vêm da API
        const ids = await carregarFavoritos();
        const resultados: Ponto[] = [];
        let apiFalhou = false;
        for (const id of ids) {
          try {
            const ponto = await buscarPontoPorId(id);
            resultados.push(ponto);
          } catch (e) {
            // 404 = ponto excluído: fica de fora sem quebrar a tela
            if (statusDoErro(e) !== 404) {
              apiFalhou = true;
            }
          }
        }
        setPontos(resultados);
        if (apiFalhou) {
          setErro('Não foi possível carregar alguns pontos. Verifique se a API está ligada.');
        }
        setCarregando(false);
      };
      carregar();
    }, [])
  );

  const desmarcar = async (id: string) => {
    await removerFavorito(id);
    setPontos((prev) => prev.filter((p) => p.id !== id));
  };

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <ActivityIndicator size="large" color="#1B3A5C" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <FlatList
        data={pontos}
        keyExtractor={(ponto) => ponto.id}
        contentContainerStyle={styles.container}
        renderItem={({ item: ponto }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.itemInfo}
              onPress={() => router.push({ pathname: '/ponto', params: { id: ponto.id } })}
            >
              <Text style={styles.nome}>{ponto.nome}</Text>
              <Text style={styles.endereco}>{ponto.endereco} - {ponto.bairro}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoDesmarcar}
              onPress={() => desmarcar(ponto.id)}
            >
              <Text style={styles.coracao}>♥</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          erro ? null : (
            <Text style={styles.vazio}>
              Nenhum ponto favorito ainda. Toque no ♡ de um ponto na lista para favoritar.
            </Text>
          )
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
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  vazio: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 32,
  },
  erro: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemInfo: {
    flex: 1,
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
  botaoDesmarcar: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coracao: {
    fontSize: 24,
    color: '#D32F2F',
  },
});
