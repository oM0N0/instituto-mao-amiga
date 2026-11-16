import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarPagina } from '../services/pontosService';
import type { Ponto } from '../types/ponto';

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco} - {ponto.bairro}</Text>
      <Text style={styles.tipo}>{ponto.tipo}</Text>
    </TouchableOpacity>
  );
}

export default function TelaListaPontos() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');
  const [buscaAtiva, setBuscaAtiva] = useState('');
  const router = useRouter();

  // refs guardam valores que a rolagem infinita precisa ler na hora, sem esperar a tela redesenhar
  const filtroRef = useRef('');
  const paginaRef = useRef(0);
  const totalPaginasRef = useRef(0);
  const buscandoMaisRef = useRef(false);

  const carregarPrimeiraPagina = useCallback((busca: string) => {
    setCarregando(true);
    setErro('');
    filtroRef.current = busca;
    setBuscaAtiva(busca);
    buscarPagina(busca, 0)
      .then((pagina) => {
        setPontos(pagina.content);
        paginaRef.current = 0;
        totalPaginasRef.current = pagina.page.totalPages;
      })
      .catch(() => setErro('Não foi possível carregar os pontos. Verifique se a API está ligada.'))
      .finally(() => setCarregando(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPrimeiraPagina(filtroRef.current);
    }, [carregarPrimeiraPagina])
  );

  const carregarMais = () => {
    const proximaPagina = paginaRef.current + 1;
    // não pede a mesma página duas vezes e para na última
    if (buscandoMaisRef.current || proximaPagina >= totalPaginasRef.current) return;

    buscandoMaisRef.current = true;
    setCarregandoMais(true);
    const buscaAtual = filtroRef.current;
    buscarPagina(buscaAtual, proximaPagina)
      .then((pagina) => {
        // se o usuário fez outra busca enquanto carregava, descarta o resultado antigo
        if (buscaAtual !== filtroRef.current) return;
        setPontos((prev) => [...prev, ...pagina.content]);
        paginaRef.current = proximaPagina;
        totalPaginasRef.current = pagina.page.totalPages;
      })
      .catch(() => {
        // falhou ao carregar mais: a lista atual continua na tela e tenta de novo ao rolar
      })
      .finally(() => {
        buscandoMaisRef.current = false;
        setCarregandoMais(false);
      });
  };

  const buscar = () => {
    carregarPrimeiraPagina(filtro.trim());
  };

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
        <TouchableOpacity
          style={[styles.botao, styles.botaoTentar]}
          onPress={() => carregarPrimeiraPagina(filtroRef.current)}
        >
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <View style={styles.barraBusca}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar por nome ou bairro..."
          value={filtro}
          onChangeText={setFiltro}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
          <Text style={styles.botaoBuscarTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pontos}
        keyExtractor={(ponto) => ponto.id}
        contentContainerStyle={styles.container}
        renderItem={({ item: ponto }) => (
          <PontoItem
            ponto={ponto}
            onPress={() => router.push({ pathname: '/ponto', params: { id: ponto.id } })}
          />
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          carregandoMais ? (
            <ActivityIndicator size="small" color="#1B3A5C" style={styles.carregandoMais} />
          ) : (
            <View>
              <TouchableOpacity style={styles.botao} onPress={() => router.push('/form-ponto')}>
                <Text style={styles.botaoTexto}>+ Novo Ponto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoDoacao]}
                onPress={() => router.push('/doacao')}
              >
                <Text style={styles.botaoTexto}>+ Nova Doação</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoHistorico]}
                onPress={() => router.push('/historico')}
              >
                <Text style={styles.botaoTexto}>Histórico de Doações</Text>
              </TouchableOpacity>
            </View>
          )
        }
        ListEmptyComponent={
          <Text style={styles.vazio}>
            {buscaAtiva
              ? `Nenhum ponto encontrado para "${buscaAtiva}".`
              : 'Nenhum ponto cadastrado ainda.'}
          </Text>
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
  vazio: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 32,
  },
  barraBusca: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    gap: 8,
  },
  inputBusca: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  botaoBuscar: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
  },
  botaoBuscarTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  carregandoMais: {
    marginVertical: 16,
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
  tipo: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  botao: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    marginTop: 10,
  },
  botaoTentar: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  botaoDoacao: {
    backgroundColor: '#F57C00',
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
