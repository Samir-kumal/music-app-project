import {Image, Pressable, StyleSheet, Text, TouchableOpacity, ScrollView,View,useColorScheme} from "react-native";
import React, {useLayoutEffect, useContext, useEffect, useState} from "react";

import {MaterialIcons,Entypo} from "@expo/vector-icons";
import {UserType} from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../../components/User";
import GreetingComponent from "../../components/Home/GreetingComponent";
import MyPlayList from "../../components/Home/MyPlayList";
import theme from "../../constants/theme";
import DiscoverMusic from "../../components/Home/DiscoverMusic";
import TopArtists from "../../components/Home/TopArtists";
import { DataContext } from "../../context/DataProvider";
import StatusBar from "../../components/Common/StatusBar";

const HomeScreen = () => {
    const {userId, setUserId} = useContext(UserType);
   
    return (
       <>
<StatusBar/>
        <ScrollView>
            <View>
                <MyPlayList/>
               <View className = "flex flex-row justify-end items-center">
               {/* <TouchableOpacity className = "w-1/2 py-3 rounded-full flex items-center justify-center " style = {{backgroundColor:theme.Secondary}}>
                    <Text className = "text-white text-lg">Explore</Text>
                </TouchableOpacity> */}
               
               </View>
               <DiscoverMusic/>
               <TopArtists/>
            </View>
            {/* <View style={{padding: 10}}>
                {users.map((item, index) => (
                    <User key={index} item={item}/>
                ))}
            </View> */}
        </ScrollView>
       </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
