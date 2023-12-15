import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import BusinessDetails from '../Screens/BusinessDetails'

export default function StackNavigatorsHome() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='Home' component={HomeScreen} />
      <Stack.Screen name='businessDetail' component={BusinessDetails}/>
    </Stack.Navigator>
  )
}