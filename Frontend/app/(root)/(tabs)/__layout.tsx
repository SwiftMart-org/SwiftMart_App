import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";

const __layout = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cart" />
        <Stack.Screen name="Feed" />
        <Stack.Screen name="Home" />
        <Stack.Screen name="Profile" />
        <Stack.Screen name="Search" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
};

export default __layout;
