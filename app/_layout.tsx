import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="invest" options={{ title: 'Invest' }} />
      <Stack.Screen name="portfolio" options={{ title: 'Portfolio' }} />
      <Stack.Screen name="academy" options={{ title: 'Academy' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
