import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router/tabs'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { router } from 'expo-router/src/imperative-api';

const TabLayout = () => {
  return (
    <Tabs 
    screenOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue' },
        
      }}
    >
        <Tabs.Screen
        name='index'
        options={{
            headerShown: true,
            title: 'Home',
            tabBarIcon:()=>(
                <Entypo name="home" size={24} color="black" />
            )  ,
            headerRight:()=>(
                <TouchableOpacity onPress={()=> router.push("/(screens)/profile")} style = {{width:40, height:40,backgroundColor:"red",marginHorizontal:12,borderRadius:100,display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Image style= {{width:"100%", height:"100%",borderRadius:100}} className = "w-full h-full object-cover " source={{uri:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}}/>

                </TouchableOpacity>
            ) 
             
        }}
        />
         <Tabs.Screen
        name='friendlist'
        options={{
            headerShown: true,
            headerTitle: 'Friends List',
            tabBarIcon:()=>(
                <FontAwesome5 name="user-friends" size={24} color="black" />
            )
        }}
        />
    </Tabs>
  )
}

export default TabLayout