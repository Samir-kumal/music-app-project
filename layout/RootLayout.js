import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router/stack';
import DataProvider from '../src/context/DataProvider';
import { UserContext } from '../src/context/UserContext';
import { PaperProvider } from 'react-native-paper';
import AudioProvider from '../src/context/AudioProvider';
const RootLayout = () => {
  return (
    <DataProvider>
        <UserContext>
        <PaperProvider>
            <AudioProvider>

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
        name='(auth)/onboard'
        options={{
            headerShown: false,
            headerTitle: 'OnBoard',
            
        }}
        />
        <Stack.Screen
        name='(auth)/signin'
        options={{
            headerShown: false,
            
        }}
        />
        <Stack.Screen
        name='(auth)/signup'
        options={{
            headerShown: true,
            headerTitle:"Registration"
            
        }}
        />  
         <Stack.Screen
        name='(screens)/profile'
        options={{
            headerShown: true,
            headerTitle: 'profile',
            animation:"slide_from_right"
            
        }}
        />
         <Stack.Screen
        name='(screens)/chats'
        options={{
            headerShown: true,
            headerTitle: 'Chats',
            
        }}
        />
          <Stack.Screen
        name='(screens)/chat_message_screen'
        options={{
            headerShown: true,
            headerTitle: 'Chats',
           
            
        }}
        />
         <Stack.Screen
        name='(screens)/explore_new_music'
        options={{
            headerShown: true,
            headerTitle: 'Discover New Music',
            animation:"slide_from_bottom"
            
        }}
        />
          <Stack.Screen
        name='(screens)/artist_profile'
        options={{
            headerShown: true,
            headerTitle: 'Artists',
            animation:"slide_from_bottom"
            
        }}
        />
          <Stack.Screen
        name='(screens)/people_profile'
        options={{
            headerShown: true,
            headerTitle: 'Profile',
            animation:"slide_from_bottom"
            
        }}
        />
    </Stack>
    </AudioProvider>
    </PaperProvider>
    </UserContext>
    </DataProvider>
  )
}

export default RootLayout