import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export default function TelaListaPontos() {
  const router = useRouter();

  return (
    <View style={styles.tela}>
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
      />
      <TouchableOpacity
        style={styles.botaoCadastro}
        onPress={() => router.push('/doacao')}
      >
        <Text style={styles.botaoCadastroTexto}>+ Nova Doação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
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
  botaoCadastro: {
    backgroundColor: '#1B3A5C',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCadastroTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});