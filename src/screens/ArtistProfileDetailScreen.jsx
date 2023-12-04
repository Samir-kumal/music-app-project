import { View, Text, Image,Dimensions, TouchableOpacity,Linking,ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'

const ArtistProfileDetailScreen = () => {
    const {item} = useLocalSearchParams();
    const {width,height} = Dimensions.get("screen");
    const data = JSON.parse(item);
    const URL = `https://www.youtube.com/results?search_query=${data.artist}+album`

  
  return (
    <ScrollView>
      <View className = "relative">
      <Image style = {{width:width, height:height/3}} source={{uri: data.image}}/>
      <View className = "absolute bottom-0 h-1/5 w-full bg-black/20 flex justify-center px-2"><Text className = "text-white font-bold text-2xl">{data.artist}</Text></View>
      </View>
      <View className = "bg-white w-full mt-10 py-4 px-1">
        <Text className = "text-black text-xl px-1 text-center font-semibold">{data.description}</Text>
      </View>

      <View>
        <TouchableOpacity onPress={()=>Linking.openURL(URL)} className  = "w-[80%] mx-auto my-5 py-4 border-[2px] border-blue-800 bg-white rounded-full flex items-center  justify-center">
        <Text className = "text-bold text-lg">
            Check out their latest songs
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ArtistProfileDetailScreen