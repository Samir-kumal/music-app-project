import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useLayoutEffect, useContext, useEffect, useState} from "react";
import { Entypo } from '@expo/vector-icons'; 

import {MaterialIcons} from "@expo/vector-icons";
import {UserType} from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../../components/User";

const HomeScreen = () => {
    const {userId, setUserId} = useContext(UserType);
    const [users, setUsers] = useState([]);
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: "",
    //         headerLeft: () => (
    //             <Text style={{fontSize: 16, fontWeight: "bold"}}>Swift Chat</Text>
    //         ),
    //         headerRight: () => (
    //             <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
    //                 <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24}
    //                           color="black"/>
    //                 <MaterialIcons
    //                     // onPress={() => navigation.navigate("Friends")}
    //                     name="people-outline"
    //                     size={24}
    //                     color="black"
    //                 />
    //                 <Pressable 
    //                 // onPress={() => navigation.navigate("Profile")}
    //                 >
    //                     <Image style={{width: 30, height: 30, borderRadius: 20}}
    //                           source={{uri:""}}/>

    //                 </Pressable>
    //             </View>
    //         ),
    //     });
    // }, []);

    useEffect(() => {

        const fetchUserInfo = async ()=>{
            try {
                const token = await AsyncStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.userId;
                console.log(decodedToken)
                const response = await axios.post("http://localhost:8000/messages",{
                    userId
                })
                console.log(response.data)

                // setUsers(response.data);

            } catch (error){
                console.log("error retrieving users", error.message);

            }
        }
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);

            axios
                .get(`http://localhost:8000/users/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log("error retrieving users", error);
                });
        };

        fetchUserInfo()
    }, []);

    console.log("users", users);
    return (
        <View>
            <View>
                <Text>
                    hello
                </Text>
            </View>
            <View style={{padding: 10}}>
                {users.map((item, index) => (
                    <User key={index} item={item}/>
                ))}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
