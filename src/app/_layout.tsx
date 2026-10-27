import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Pontos de Coleta' }} />
      <Stack.Screen name="ponto" options={{ title: 'Detalhe do Ponto' }} />
      <Stack.Screen name="doacao" options={{ title: 'Cadastrar Doação' }} />
      <Stack.Screen name="historico" options={{ title: 'Histórico de Doações' }} />
      <Stack.Screen name="detalhe-doacao" options={{ title: 'Detalhe da Doação' }} />
    </Stack>
  );
}