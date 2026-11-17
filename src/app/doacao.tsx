import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusDoErro } from '../services/api';
import { buscarDoacaoPorId, cadastrarDoacao, editarDoacao } from '../services/doacoesService';
import { listarPontos } from '../services/pontosService';
import type { Ponto } from '../types/ponto';

// quantidade precisa ser um número inteiro maior que zero (a API recebe um inteiro)
function quantidadeValida(valor: string): boolean {
  const numero = Number(valor.trim());
  return valor.trim() !== '' && Number.isInteger(numero) && numero > 0;
}

export default function TelaCadastroDoacao() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = !!id;
  const router = useRouter();

  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregar, setErroCarregar] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erroQuantidade, setErroQuantidade] = useState('');
  // mensagem mostrada na própria tela, acima do botão (funciona no celular e no navegador)
  const [mensagem, setMensagem] = useState('');

  const carregar = useCallback(async () => {
    try {
      // o ponto de destino é escolhido entre os pontos da API
      const listaPontos = await listarPontos();
      setPontos(listaPontos);

      if (id) {
        const doacao = await buscarDoacaoPorId(id);
        setTipoItem(doacao.tipoItem);
        setQuantidade(String(doacao.quantidade));
        setPontoDestino(doacao.pontoDestino);
      }
    } catch (e) {
      if (statusDoErro(e) === 404) {
        setErroCarregar('Doação não encontrada.');
      } else {
        setErroCarregar('Não foi possível carregar os dados. Verifique se a API está ligada.');
      }
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function tentarNovamente() {
    setCarregando(true);
    setErroCarregar('');
    carregar();
  }

  function validarQuantidade(valor: string) {
    setQuantidade(valor);
    if (valor === '' || quantidadeValida(valor)) {
      setErroQuantidade('');
    } else {
      setErroQuantidade('Quantidade deve ser um número inteiro maior que zero.');
    }
  }

  async function handleSalvar() {
    if (!tipoItem.trim()) {
      setMensagem('Informe o tipo do item.');
      return;
    }
    if (!quantidadeValida(quantidade)) {
      setMensagem('Informe uma quantidade válida.');
      return;
    }
    if (!pontoDestino) {
      setMensagem('Selecione o ponto de destino.');
      return;
    }

    setMensagem('');
    setSalvando(true);
    const dados = {
      tipoItem: tipoItem.trim(),
      quantidade: Number(quantidade.trim()),
      pontoDestino,
    };

    // em caso de erro os campos continuam preenchidos, porque o estado não é limpo
    try {
      if (id) {
        await editarDoacao(id, dados);
      } else {
        await cadastrarDoacao(dados);
      }
      router.back();
    } catch (e) {
      const status = statusDoErro(e);
      if (status === 400) {
        setMensagem('A API recusou os dados. Verifique os campos.');
      } else if (status === 404) {
        setMensagem('Esta doação não existe mais.');
      } else {
        setMensagem('Não foi possível salvar. Verifique se a API está ligada.');
      }
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <ActivityIndicator size="large" color="#1B3A5C" />
      </SafeAreaView>
    );
  }

  if (erroCarregar) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom', 'left', 'right']}>
        <Text style={styles.erroCarregar}>{erroCarregar}</Text>
        <TouchableOpacity style={styles.botao} onPress={tentarNovamente}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>
            {editando ? 'Editar Doação' : 'Cadastrar Doação'}
          </Text>

          <Text style={styles.label}>Tipo do item</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arroz, Roupas, Brinquedos"
            placeholderTextColor="#AAAAAA"
            value={tipoItem}
            onChangeText={setTipoItem}
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={[styles.input, erroQuantidade ? styles.inputErro : null]}
            placeholder="Ex: 10"
            placeholderTextColor="#AAAAAA"
            value={quantidade}
            onChangeText={validarQuantidade}
            keyboardType="numeric"
          />
          {erroQuantidade ? <Text style={styles.erro}>{erroQuantidade}</Text> : null}

          <Text style={styles.label}>Ponto de destino</Text>
          <View style={styles.pontosContainer}>
            {pontos.map((ponto) => (
              <TouchableOpacity
                key={ponto.id}
                style={[
                  styles.pontoBtn,
                  pontoDestino === ponto.nome && styles.pontoSelecionado,
                ]}
                onPress={() => setPontoDestino(ponto.nome)}
              >
                <Text
                  style={[
                    styles.pontoTexto,
                    pontoDestino === ponto.nome && styles.pontoTextoSelecionado,
                  ]}
                >
                  {ponto.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

          <TouchableOpacity style={styles.botao} onPress={handleSalvar} disabled={salvando}>
            {salvando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botaoTexto}>
                {editando ? 'Salvar alterações' : 'Cadastrar Doação'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  centro: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  erroCarregar: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1B3A5C',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1B3A5C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 44,
  },
  inputErro: {
    borderColor: '#D32F2F',
    marginBottom: 4,
  },
  erro: {
    color: '#D32F2F',
    fontSize: 13,
    marginBottom: 16,
  },
  mensagem: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 8,
  },
  pontosContainer: {
    gap: 8,
    marginBottom: 16,
    marginTop: 4,
  },
  pontoBtn: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    minHeight: 44,
    justifyContent: 'center',
  },
  pontoSelecionado: {
    borderColor: '#1B3A5C',
    backgroundColor: '#1B3A5C',
  },
  pontoTexto: {
    fontSize: 15,
    color: '#555555',
  },
  pontoTextoSelecionado: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    minHeight: 44,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
