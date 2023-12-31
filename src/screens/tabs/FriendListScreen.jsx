import { View, Text , Pressable, Image} from 'react-native'
import React, {useEffect,useContext, useState} from 'react'
import { DataContext, URL } from '../../context/DataProvider';
import { acceptedFriendsList } from '../../services/acceptedFriendsList';
import theme from '../../constants/theme';

const FriendListScreen = () => {
  const { userInfo } = useContext(DataContext);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

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
    <View>
      {acceptedFriends &&
          acceptedFriends.map((item, index) => (
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

              <Text className="text-xs text-gray-400">
                Email: {item.email}
              </Text>
            </View>
            <Pressable
              // onPress={() => sendFollowRequest(userInfo.userId, item._id)}
              style={{ backgroundColor: theme.Gray }}
              className=" px-3 py-2 rounded-full"
            >
              <Text className="text-white">Following</Text>
            </Pressable>
          </Pressable>
          ))}
    </View>
  )
}

export default FriendListScreen