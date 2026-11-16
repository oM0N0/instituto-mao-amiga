import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusDoErro } from '../services/api';
import { buscarPontoPorId, cadastrarPonto, editarPonto } from '../services/pontosService';

export default function TelaFormPonto() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const editando = !!id;

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [carregando, setCarregando] = useState(editando);
  const [erroCarregar, setErroCarregar] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;
    buscarPontoPorId(id)
      .then((ponto) => {
        setNome(ponto.nome);
        setEndereco(ponto.endereco);
        setBairro(ponto.bairro);
        setHorario(ponto.horario);
        setTipo(ponto.tipo);
      })
      .catch((e) => {
        if (statusDoErro(e) === 404) {
          setErroCarregar('Ponto não encontrado.');
        } else {
          setErroCarregar('Não foi possível carregar o ponto. Verifique se a API está ligada.');
        }
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const salvar = async () => {
    if (!nome.trim() || !endereco.trim() || !bairro.trim() || !horario.trim() || !tipo) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setSalvando(true);
    const dados = {
      nome: nome.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      horario: horario.trim(),
      tipo,
    };

    // em caso de erro os campos continuam preenchidos, porque o estado não é limpo
    try {
      if (id) {
        await editarPonto(id, dados);
      } else {
        await cadastrarPonto(dados);
      }
      router.back();
    } catch (e) {
      const status = statusDoErro(e);
      if (status === 400) {
        Alert.alert('Erro', 'A API recusou os dados. Verifique os campos.');
      } else if (status === 404) {
        Alert.alert('Erro', 'Este ponto não existe mais.');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar. Verifique se a API está ligada.');
      }
    } finally {
      setSalvando(false);
    }
  };

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
        <Text style={styles.erro}>{erroCarregar}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do ponto" />

        <Text style={styles.label}>Endereço</Text>
        <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Endereço" />

        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} placeholder="Bairro" />

        <Text style={styles.label}>Horário</Text>
        <TextInput style={styles.input} value={horario} onChangeText={setHorario} placeholder="Ex.: Seg a Sex, 8h às 17h" />

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.tipoContainer}>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'coleta' && styles.tipoSelecionado]}
            onPress={() => setTipo('coleta')}
          >
            <Text style={[styles.tipoTexto, tipo === 'coleta' && styles.tipoTextoSelecionado]}>
              Coleta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoBtn, tipo === 'distribuição' && styles.tipoSelecionado]}
            onPress={() => setTipo('distribuição')}
          >
            <Text style={[styles.tipoTexto, tipo === 'distribuição' && styles.tipoTextoSelecionado]}>
              Distribuição
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar} disabled={salvando}>
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>
              {editando ? 'Salvar alterações' : 'Cadastrar'}
            </Text>
          )}
        </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: '#555555',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  tipoBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  tipoSelecionado: {
    borderColor: '#1B3A5C',
    backgroundColor: '#1B3A5C',
  },
  tipoTexto: {
    fontSize: 16,
    color: '#555555',
    fontWeight: 'bold',
  },
  tipoTextoSelecionado: {
    color: '#FFFFFF',
  },
  botaoSalvar: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    minHeight: 44,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
