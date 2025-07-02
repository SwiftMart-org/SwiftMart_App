import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import "react-native-reanimated"
import { SafeAreaView } from 'react-native-safe-area-context'
import "../global.css"
import { Stack } from 'expo-router'
import { CartProvider } from './context/CartContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Manrope": require('@/assets/fonts/Manrope-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }
    prepare()
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }



  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <CartProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(root)" />
        <Stack.Screen name="+not-found" />
        </Stack>
        </CartProvider>
    </View>
  );
}