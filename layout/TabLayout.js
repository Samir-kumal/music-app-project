import { View, Text,TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { Tabs } from 'expo-router/tabs'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router/src/imperative-api';
import { DataContext } from '../src/context/DataProvider';
import GreetingComponent from '../src/components/Home/GreetingComponent';
import theme from '../src/constants/theme';
import { MaterialIcons } from '@expo/vector-icons'; 

const TabLayout = () => {
    const {userInfo} = useContext(DataContext);
    const [isLoaded, setIsLoaded] = React.useState(false);


    React.useEffect(() => {
        setIsLoaded(true);
    }, [userInfo]);
  return (
    <Tabs 
    screenOptions={{
        tabBarActiveTintColor: theme.Secondary,
        labelStyle: { fontSize: 12 },
        
      }}
    >
        <Tabs.Screen
        name='index'
        options={{
            headerShown: true,
            title: 'Home',
            headerTitle: '',
            tabBarIcon:({color})=>(
                <Entypo name="home" size={24} color={color} />
            )  ,

            headerLeft:()=>(
                <GreetingComponent/>
            ),
            headerRight:()=>(
                <View style = {{display:"flex", flexDirection:"row"}}>
<TouchableOpacity onPress={()=> router.push("/(screens)/chats")} style = {{width:40, height:40,marginHorizontal:12,borderRadius:100,display:"flex", alignItems:"center", justifyContent:"center"}}>
<Entypo name="chat" size={24} color="black" />
                </TouchableOpacity>
                    <TouchableOpacity onPress={()=> router.push("/(screens)/profile")} style = {{width:40, height:40,marginHorizontal:12,borderRadius:100,display:"flex", alignItems:"center", justifyContent:"center"}}>
               { isLoaded && <Image style= {{width:"100%", height:"100%",borderRadius:100}} className = "w-full h-full object-cover " source={{uri:userInfo && userInfo.userImage }}/>}

                </TouchableOpacity>
                </View>
            ) 
             
        }}
        />

<Tabs.Screen
        name='playlist'
        options={{
            headerShown: true,
            headerTitle: 'Play List',
            tabBarIcon:({color})=>(
                <Entypo name="music" size={24} color={color} />
            )
        }}
        />
         <Tabs.Screen
        name='people'
        options={{
            headerShown: true,
            headerTitle: 'Add People',
            tabBarIcon:({color})=>(
                <MaterialIcons name="person-search" size={24} color={color} />
            )
        }}
        />
         <Tabs.Screen
        name='friendlist'
        options={{
            headerShown: true,
            headerTitle: 'Friends List',
            tabBarIcon:({color})=>(
                <FontAwesome5 name="user-friends" size={24} color={color} />
            )
        }}
        />
          
         <Tabs.Screen
        name='requests'
        options={{
            headerShown: true,
            headerTitle: 'Add People',
            tabBarIcon:({color})=>(
                <FontAwesome5 name="user-plus" size={24} color={color} />
            )
        }}
        />
    </Tabs>
  )
}

export default TabLayout