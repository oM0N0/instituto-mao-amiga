import { Alert, Platform } from 'react-native';

// No navegador o Alert do React Native não aparece na tela,
// então ali usamos o alert/confirm do próprio navegador.
const navegador = globalThis as unknown as {
  alert: (mensagem: string) => void;
  confirm: (mensagem: string) => boolean;
};

export function avisar(titulo: string, mensagem: string) {
  if (Platform.OS === 'web') {
    navegador.alert(`${titulo}\n\n${mensagem}`);
    return;
  }
  Alert.alert(titulo, mensagem);
}

// pede confirmação com Cancelar e Excluir antes de excluir algo
export function confirmarExclusao(titulo: string, mensagem: string, aoConfirmar: () => void) {
  if (Platform.OS === 'web') {
    if (navegador.confirm(`${titulo}\n\n${mensagem}`)) {
      aoConfirmar();
    }
    return;
  }
  Alert.alert(titulo, mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: aoConfirmar },
  ]);
}
