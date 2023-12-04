import { View, Text, ScrollView, Pressable } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { DataContext, URL } from '../context/DataProvider';
import { router } from "expo-router/src/imperative-api";
import UserChat from '../components/UserChat';

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const {userInfo} = useContext(DataContext);

  useEffect(()=>{

    const acceptedFriendsList = async () => {
      try {
        if(userInfo){
          const response = await fetch(
            `${URL}/accepted-friends/${userInfo.userId}`
          );
          const data = await response.json();
  
          if (response.ok) {
            setAcceptedFriends(data);
          }
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);
  
  return (
    <ScrollView showsVerticalScrollIndicator = {false}>
      <Pressable>
        {acceptedFriends.map((item,index) =>(
          <UserChat key={index} item={item}/>
        ))}
      </Pressable>
    </ScrollView>
  )
}

export default ChatScreen