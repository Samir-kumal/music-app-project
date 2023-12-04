import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router/src/imperative-api";
import Loading from "../../components/Common/Loading";
import * as SecureStore from "expo-secure-store";
import theme from "../../constants/theme";

const OnBoardScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = React.useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  useEffect(() => {
    async function getUserInfo() {
      try {
        const data = await SecureStore.getItemAsync("user_status");
        console.log(data);
        if (data === "existing") {
          setTimeout(() => {
            setIsLoading(false);
            setUser(true);

            router.replace("/signin");
          }, 2000);
        } else if (data == null) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);
  return (
    <>
      {isLoading && <Loading text={"Loading"} />}
      {!user && !isLoading && (
        <View className="relative" style={StyleSheet.absoluteFill}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: "https://i.pinimg.com/736x/0f/d8/57/0fd8577fe8c1c38f28280f9cc3e8d237.jpg",
            }}
          />
          <View className="absolute bg-black/50 w-full h-1/2 bottom-0">
            
            <Text className="font-bold text-white  mx-4 mt-8 text-4xl w-[70%]">
              The Music Hub, Your Social Music Companion, Enjoy your Favourite music
            </Text>
            <TouchableOpacity style = {{backgroundColor:theme.Secondary}}
              onPress={() => router.push("(auth)/signin")}
              className="w-[90%] mx-auto py-3 flex items-center justify-center rounded-full mt-10"
            >
              <Text className="text-white text-xl">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default OnBoardScreen;
