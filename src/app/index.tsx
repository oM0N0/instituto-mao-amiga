import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Ponto } from '../data/pontos';
import { pontosMock } from '../data/pontos';

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
  const router = useRouter();

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={pontosMock}
        keyExtractor={(ponto) => ponto.id}
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