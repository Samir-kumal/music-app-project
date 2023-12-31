import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext, URL } from "../../context/DataProvider";
import theme from "../../constants/theme";
import axios from "axios";
import { router } from "expo-router/src/imperative-api";
const PeopleScreen = () => {
  const { users, userInfo } = useContext(DataContext);
  const otherUsers =
    users &&
    userInfo &&
    users.filter(
      (user) =>
        user.email !== userInfo.userEmail &&
        !user.friends.includes(userInfo.userId)
    );

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
        Alert.alert("Request Sent Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = (item) => {
    router.push({
      pathname: "(screens)/people_profile",
      params: {
        item: JSON.stringify(item),
      },
    });
  };

  return (
    <View>
      {otherUsers.length > 0 ? (
        otherUsers.map((item) => (
          <Pressable
            onPress={() => handlePress(item)}
            key={item.email}
            className="flex flex-row relative h-20  justify-between bg-white my-2 items-center mx-2 px-3"
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={{ uri: item.image }}
            />
            <View className="flex h-8  justify-center">
              <Text className="text-md font-semibold">{item.name}</Text>

              <Text className="text-xs text-gray-400">Email: {item.email}</Text>
            </View>
            <Pressable
              onPress={() => sendFollowRequest(userInfo.userId, item._id)}
              style={{ backgroundColor: theme.Secondary }}
              className=" px-3 py-2 rounded-full"
            >
              <Text className="text-white">Follow</Text>
            </Pressable>
          </Pressable>
        ))
      ) : (
        <>
          <View  className = "items-center justify-center h-80">
            <Text className = "text-bold ">No new People</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PeopleScreen;
