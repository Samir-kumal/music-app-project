import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router/stack';
import DataProvider from '../src/context/DataProvider';
import { UserContext } from '../src/context/UserContext';
const RootLayout = () => {
  return (
    <DataProvider>
        <UserContext>
    <Stack>
        <Stack.Screen
        name='index'
        options={{
            headerShown: true,
            headerTitle: 'OnBoard',
            
        }}
        />
        <Stack.Screen
        name='(tabs)'   
        options={{
            headerShown: false,
            
        }}
        />
        <Stack.Screen
        name='(auth)/signin'
        options={{
            headerShown: true,
            headerTitle: 'OnBoard',
            
        }}
        />
        <Stack.Screen
        name='(auth)/signup'
        options={{
            headerShown: true,
            headerTitle: 'OnBoard',
            
        }}
        />  
         <Stack.Screen
        name='(screens)/profile'
        options={{
            headerShown: true,
            headerTitle: 'profile',
            
        }}
        />
    </Stack>
    </UserContext>
    </DataProvider>
  )
}

export default RootLayout