import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import "../global.css"
import 'react-native-gesture-handler';
import 'react-native-reanimated';


const index = () => {
  return <Redirect href="/CartScreen" />
    
  
}

export default index