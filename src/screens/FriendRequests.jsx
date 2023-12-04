import { View, Text ,Image,Pressable} from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import { DataContext, URL } from '../context/DataProvider';
import axios from "axios"
import theme from '../constants/theme';
import { router } from "expo-router/src/imperative-api";

const FriendRequests = () => {
  const { users, userInfo } = useContext(DataContext);
  const [followRequests, setFollowRequests] = useState([]);


  useEffect(() => {
    fetchFollowRequest();
  }, []);

 
  const fetchFollowRequest = async () => {

    try {
     if(userInfo){
      const response  = await axios.get(`${URL}/follow-request/${userInfo.userId}`)
      if(response.status === 200){
        const followRequestsData = response.data.map((friendRequest) => ({
          _id:friendRequest._id,
          name:friendRequest.name,
          email:friendRequest.email,
          image:friendRequest.image
        }))
        setFollowRequests(followRequestsData)
      }
     }
    } catch (error) {
      console.log(error)
    }
  };

  const acceptRequest = async (friendRequestId) => {
    try {
      if(userInfo){
        const response = await fetch(
            `${URL}/friend-request/accept`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({   // body is the data we are sending to the server
                senderId: friendRequestId,
                recepientId: userInfo.userId,
              }),
            }
          );
    
          if (response.ok) {
            setFollowRequests(
              followRequests.filter((request) => request._id !== friendRequestId)
            );
            router.push("(screens)/chats");
          }
      }
    } catch (err) {
      console.log("error acceptin the friend request", err);
    }
  };
  console.log(followRequests);

  return (
    <View>
      <View>
        <Text className = "font-bold text-xl mx-2">Follow Requests</Text>
        {followRequests.length >0 && followRequests.map((item)=>(
          <View
          key={item.email}
          className="flex flex-row relative h-20  justify-between bg-white my-2 items-center mx-2 px-3"
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{ uri: item.image }}
          />
          <View className="flex h-10 w-1/2 mx-2  justify-center">
            <Text className="text-md  font-semibold">{item.name} sent you a follow request</Text>

           
          </View>
          <Pressable
            onPress={() => acceptRequest(item._id)}
            style={{ backgroundColor: theme.Secondary }}
            className=" px-6 py-3 rounded-full"
          >
            <Text className="text-white">Accept</Text>
          </Pressable>
        </View>
        ))}
      </View>
    </View>
  )
}

export default FriendRequests