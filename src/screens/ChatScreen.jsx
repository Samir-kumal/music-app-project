import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext, URL } from "../context/DataProvider";
import { router } from "expo-router/src/imperative-api";
import UserChat from "../components/UserChat";
import { acceptedFriendsList } from "../services/acceptedFriendsList";
const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userInfo } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await acceptedFriendsList(userInfo.userId, URL);

      if (data) {
        setAcceptedFriends(data);
      console.log(data);

      }
    };

    fetchData();
  }, []);


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends &&
          acceptedFriends.map((item, index) => (
            <UserChat key={index} item={item} />
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatScreen;
