import { View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";
import { Stack } from "expo-router";
import { SearchProvider } from "@/components/SearchContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope: require("@/assets/fonts/Manrope-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <SearchProvider>
    <View className="font-Manrope" style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Auth screens */}
        <Stack.Screen name="(auth)" />

        {/* Tabs layout */}
        <Stack.Screen name="(root)" options={{ headerShown: false }} />

        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Not-found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
    </SearchProvider>
  );
}