import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Pontos de Coleta' }} />
      <Stack.Screen name="ponto" options={{ title: 'Detalhe do Ponto' }} />
    </Stack>
  );
}