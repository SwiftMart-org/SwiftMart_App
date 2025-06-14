import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <View style={{ flex: 1 }}>
    <StatusBar barStyle="dark-content" />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      
      <Stack.Screen name="+not-found" />
    </Stack>
  </View>
  )
}

export default _layout