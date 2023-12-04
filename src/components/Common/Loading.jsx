import { View, Text, StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({text}) => {
  return (
    <View
    className="bg-black/10 flex items-center justify-center"
    style={StyleSheet.absoluteFill}
  >
    <View className="w-1/2 h-16 bg-white rounded-md flex flex-row items-center justify-center">
   
      <Text>{text}</Text> 
      <ActivityIndicator size={"small"} />
    </View>
  </View> 
  )
}

export default Loading