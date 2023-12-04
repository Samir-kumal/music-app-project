import { View, Text,Image,TouchableOpacity, Alert } from "react-native";
import React, { useContext,useState } from "react";
import { useLocalSearchParams } from "expo-router/src/hooks";
import { DataContext } from "../context/DataProvider";
import {MaterialIcons} from "@expo/vector-icons"
import axios from "axios"
import theme from "../constants/theme";
const PeopleProfileScreen = () => {


    const {item} = useLocalSearchParams();
    const textInfo = "text-2xl font-bold";
    const textContainer = "flex flex-row items-center ";
    const data = JSON.parse(item);


    const { users, userInfo } = useContext(DataContext);
    const otherUsers =
      users &&
      userInfo &&
      users.filter((user) => user.email !== userInfo.userEmail);
    const [followRequestSent, setFollowRequestSent] = useState(false);
  
    const sendFollowRequest = async (currentUserId, selectedUserId) => {
      try {
        console.log(currentUserId, selectedUserId);
  
        const response = await axios.post(`${URL}/follow-request`, {
          currentUserId,
          selectedUserId,
        });
        console.log(response.data);
        if (response.ok) {
          setFollowRequestSent(true);
        Alert.alert("Request Sent Successfully")
          
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Follow Request Failed due to server error")

      }
    };
  return (
    <View>
      <View>
        <View className="w-full h-60 relative flex items-center justify-center">
          <Image
            className="w-1/2 h-48 rounded-full "
            source={{ uri: data?.image }}
          />
       
        </View>
        <View className=" px-4">
          <View className={textContainer}>
            <Text className={textInfo}>Name:</Text>
            <Text className="text-xl px-2">{data?.name}</Text>
          </View>
          <View className={textContainer}>
            <Text className={textInfo}>Email:</Text>
            <Text className="text-xl px-2">{data?.email}</Text>
          </View>
        </View>
        <View className="mt-20">
          <TouchableOpacity
            onPress={sendFollowRequest}
            className="w-[90%] mx-auto border-2 py-4 border-blue-800 flex items-center justify-center rounded-full"
          >
            <Text className="text-black">Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PeopleProfileScreen;
