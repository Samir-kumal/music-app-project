import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { router } from "expo-router/src/imperative-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Common/Loading";
import theme from "../constants/theme";
import { MaterialIcons } from '@expo/vector-icons'; 
const Profile = () => {
  const { userInfo, setIsLoading, isLoading,setIsLoggedIn,handleLogout } = useContext(DataContext);
  const textInfo = "text-2xl font-bold";
  const textContainer = "flex flex-row items-center ";
  console.log(userInfo);

  const handleButtonPress = async () => {
   
    
  };
  return (
    <>
      {isLoading ? (
        <Loading text={"Logging out..."}/>
      ) : (
        <View>
          <View className="w-full h-60 relative flex items-center justify-center">
            <Image
              className="w-1/2 h-48 rounded-full "
              source={{ uri: userInfo?.userImage }}
            />
           {userInfo?.isArtist && <View className="absolute flex flex-row items-center w-12 h-12 rounded-full bottom-0 right-36 ">
            <MaterialIcons name="verified" size={44} color={theme.Secondary} />
            <Text className = "font-bold text-md">Artist</Text>
              </View>}
          </View>
          <View className=" px-4">
            <View className={textContainer}>
              <Text className={textInfo}>Name:</Text>
              <Text className="text-xl px-2">{userInfo?.userName}</Text>
            </View>
            <View className={textContainer}>
              <Text className={textInfo}>Email:</Text>
              <Text className="text-xl px-2">{userInfo?.userEmail}</Text>
            </View>
          </View>
          <View className="mt-20">
            <TouchableOpacity
              onPress={handleLogout}
              className="w-[90%] mx-auto border-2 py-4 border-blue-800 flex items-center justify-center rounded-full"
            >
              <Text className="text-black">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;
