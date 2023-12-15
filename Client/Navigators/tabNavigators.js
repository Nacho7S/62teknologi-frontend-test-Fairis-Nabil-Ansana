import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import SearchScreen from '../Screens/SearchScreen'
import { Ionicons } from '@expo/vector-icons'
import StackNavigatorsHome from './stackNavigatorsHome'

export default function TabNavigators() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen
        name='HomeScreen'
        component={StackNavigatorsHome}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="home"
                color={focused ? "black" : "grey"}
                size={size}
              />
            )
          },
          headerShown: false
        }}
      />
      <Tab.Screen
        name='Maps'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
                <Ionicons name="map" size={size} color={focused ? "black" : "grey"}/>
              )
          }
        }}
      />
    </Tab.Navigator>
  )
}