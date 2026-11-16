import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
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
import { buscarPaginaDoacoes } from '../services/doacoesService';
import type { Doacao } from '../types/doacao';
import { formatarData } from '../utils/formatarData';

const DoacaoItem = React.memo(function DoacaoItem({
  doacao,
  onPress,
}: {
  doacao: Doacao;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.tipo}>{doacao.tipoItem}</Text>
      <Text style={styles.info}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.info}>Destino: {doacao.pontoDestino}</Text>
      {doacao.criadoEm ? <Text style={styles.data}>{formatarData(doacao.criadoEm)}</Text> : null}
    </TouchableOpacity>
  );
});

export default function TelaHistorico() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
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
    buscarPaginaDoacoes(busca, 0)
      .then((pagina) => {
        setDoacoes(pagina.content);
        paginaRef.current = 0;
        totalPaginasRef.current = pagina.page.totalPages;
      })
      .catch(() => setErro('Não foi possível carregar as doações. Verifique se a API está ligada.'))
      .finally(() => setCarregando(false));
  }, []);

  // recarrega ao voltar para a tela: a doação nova aparece no topo (a API ordena da mais nova para a mais antiga)
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
    buscarPaginaDoacoes(buscaAtual, proximaPagina)
      .then((pagina) => {
        // se o usuário filtrou de novo enquanto carregava, descarta o resultado antigo
        if (buscaAtual !== filtroRef.current) return;
        setDoacoes((prev) => [...prev, ...pagina.content]);
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
          style={styles.botaoTentar}
          onPress={() => carregarPrimeiraPagina(filtroRef.current)}
        >
          <Text style={styles.botaoTentarTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <View style={styles.barraBusca}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Filtrar por tipo de item..."
          value={filtro}
          onChangeText={setFiltro}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
          <Text style={styles.botaoBuscarTexto}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={doacoes}
        keyExtractor={(doacao) => doacao.id}
        contentContainerStyle={styles.container}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <DoacaoItem
            doacao={item}
            onPress={() => router.push({ pathname: '/detalhe-doacao', params: { id: item.id } })}
          />
        )}
        ListFooterComponent={
          carregandoMais ? (
            <ActivityIndicator size="small" color="#1B3A5C" style={styles.carregandoMais} />
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.vazio}>
            {buscaAtiva
              ? `Nenhuma doação encontrada para "${buscaAtiva}".`
              : 'Nenhuma doação registrada ainda.'}
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
  botaoTentar: {
    backgroundColor: '#1B3A5C',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    minHeight: 44,
  },
  botaoTentarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
