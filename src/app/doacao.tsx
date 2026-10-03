import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TelaCadastroDoacao() {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');

  function validarQuantidade(valor: string) {
    setQuantidade(valor);
    if (valor === '') {
      setErroQuantidade('');
      return;
    }
    if (isNaN(Number(valor)) || Number(valor) <= 0) {
      setErroQuantidade('Quantidade deve ser um número maior que zero.');
    } else {
      setErroQuantidade('');
    }
  }

  function handleCadastrar() {
    if (!tipoItem.trim()) {
      Alert.alert('Erro', 'Informe o tipo do item.');
      return;
    }
    if (!quantidade.trim() || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida.');
      return;
    }
    if (!pontoDestino.trim()) {
      Alert.alert('Erro', 'Informe o ponto de destino.');
      return;
    }
    Alert.alert('Sucesso', `Doação registrada!\n\nItem: ${tipoItem}\nQuantidade: ${quantidade}\nDestino: ${pontoDestino}`);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Cadastrar Doação</Text>

          <Text style={styles.label}>Tipo do item</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arroz, Roupas, Brinquedos"
            value={tipoItem}
            onChangeText={setTipoItem}
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={[styles.input, erroQuantidade ? styles.inputErro : null]}
            placeholder="Ex: 10"
            value={quantidade}
            onChangeText={validarQuantidade}
            keyboardType="numeric"
          />
          {erroQuantidade ? <Text style={styles.erro}>{erroQuantidade}</Text> : null}

          <Text style={styles.label}>Ponto de destino</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mercado Central"
            value={pontoDestino}
            onChangeText={setPontoDestino}
          />

          <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
            <Text style={styles.botaoTexto}>Cadastrar Doação</Text>
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
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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