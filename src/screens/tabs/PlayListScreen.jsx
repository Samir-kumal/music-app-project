import { View, Text, Pressable, ScrollView,TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { Foundation } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Loading from "../../components/Common/Loading";
import { pause, play, playNext, resume } from "../../helper/audioController";
import { AudioContext } from "../../context/AudioProvider";
import StatusBarComponent from "../../components/Common/StatusBar";
// import TrackPlayer from 'react-native-track-player';
const PlayListScreen = () => {
  const { songs } = useContext(DataContext);
  // const [soundObj, setSoundObj] = useState(null);
  // const [playbackObj, setPlaybackObj] = useState(null);
  // const [currentAudio, setCurrentAudio] = useState({});
  const {soundObj,setSoundObj,playbackObj,setPlaybackObj,currentAudio,setCurrentAudio} = useContext(AudioContext)
  const handlePress = async (audio) => {

    try {
      if (soundObj === null) {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const playbackObject = new Audio.Sound();
        const status = await play(playbackObject, audio.url);
        setCurrentAudio(audio)
        return (
          setSoundObj(status),
          setPlaybackObj(playbackObject)
        );
      } 
      // pause audio
      
      else if (soundObj && soundObj.isLoaded && soundObj.isPlaying && currentAudio && currentAudio.title === audio.title) {
        const status = await pause(playbackObj);
        setCurrentAudio(audio)
        return setSoundObj(status);
      } 
      // resume audio
      
      else if (
        soundObj.isLoaded &&
        !soundObj.isPlaying &&
        currentAudio.title === audio.title
      ) {
        const status = await resume(playbackObj);
        setCurrentAudio(audio)
        return setSoundObj(status);
      } 
      
      //select another audio
      if (soundObj.isLoaded && currentAudio.title !== audio.title) {
        const status = await playNext(playbackObj, audio.url);
        console.log("After playing next:", currentAudio.id, audio.id);
        setCurrentAudio(audio);
        return setSoundObj(status)
      }

      console.log("audio source", audio);
    } catch (error) {
      console.error("Error playing audio:", error.message);
    }
  };
  useEffect(()=>{
    console.log( currentAudio && currentAudio);
  },[currentAudio])

    return (
    <>
    <StatusBarComponent/>
    <ScrollView>
      <View>
        {songs.length > 0 ? (
          songs.map((item) => (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}
              className="bg-white my-2 mx-2 py-4 w-[95%] px-2 flex flex-row-reverse items-center justify-between gap-x-3"
              key={item.title}
            >
              <View className="w-8 h-8 mx-3 rounded-full bg-white border-2 flex items-center justify-center border-black">
                <Foundation
                  name={ soundObj?.isPlaying && currentAudio.title === item.title ? "pause" : "play"}
                  size={22}
                  color="black"
                />
              </View>
              <Text className="w-[65%]">{item.title}</Text>
              <View className = 'w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center'>
              <Text className = "font-bold text-lg">{item.title[0]}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Loading text={"Loading..."} />
        )}
      </View>
    </ScrollView>
    </>
  );
};

export default PlayListScreen;
