import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";

import React, { useContext } from "react";
import theme from "../../constants/theme";
import { DataContext } from "../../context/DataProvider";
import { Foundation } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioProvider";
import { play,pause,resume,playNext } from "../../helper/audioController";
import { router } from "expo-router/src/imperative-api";

const DiscoverMusic = () => {
  const { width, height } = Dimensions.get("window");
  const { newSongs } = useContext(DataContext);
  const {
    soundObj,
    setSoundObj,
    playbackObj,
    setPlaybackObj,
    currentAudio,
    setCurrentAudio,
  } = useContext(AudioContext);

  const handlePress = async (audio) => {
    try {
      if (soundObj === null) {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const playbackObject = new Audio.Sound();
        const status = await play(playbackObject, audio.url);
        setCurrentAudio(audio);
        return setSoundObj(status), setPlaybackObj(playbackObject);
      }
      // pause audio
      else if (
        soundObj &&
        soundObj.isLoaded &&
        soundObj.isPlaying &&
        currentAudio &&
        currentAudio.title === audio.title
      ) {
        const status = await pause(playbackObj);
        setCurrentAudio(audio);
        return setSoundObj(status);
      }
      // resume audio
      else if (
        soundObj.isLoaded &&
        !soundObj.isPlaying &&
        currentAudio.title === audio.title
      ) {
        const status = await resume(playbackObj);
        setCurrentAudio(audio);
        return setSoundObj(status);
      }

      //select another audio
      if (soundObj.isLoaded && currentAudio.title !== audio.title) {
        const status = await playNext(playbackObj, audio.url);
        console.log("After playing next:", currentAudio.id, audio.id);
        setCurrentAudio(audio);
        return setSoundObj(status);
      }

      console.log("audio source", audio);
    } catch (error) {
      console.error("Error playing audio:", error.message);
    }
  };

 const handleShowMore = () =>{
  router.push("(screens)/explore_new_music");
 }

  return (
    <View className="mt-6">
      <View className="flex flex-row justify-between mx-2">
        <Text className="text-xl font-bold">Discover New Music</Text>
        {/* <TouchableOpacity onPress={handleShowMore}
          className="w-1/4 py-1 rounded-full flex items-center justify-center "
          style={{ backgroundColor: theme.Secondary }}
        >
          <Text className="text-white text-lg">Explore</Text>
        </TouchableOpacity> */}
      </View>
      <View className="flex flex-row flex-wrap justify-center gap-3 mt-6 ">
        {newSongs?.map((item) => (
          <TouchableOpacity
            onPress={() => {
              handlePress(item);
            }}
            className
            style={{
              width: width / 2.2,
              height: height / 4,
              position: "relative",
            }}
            key={item.title}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={{ uri: item.imageCover }}
            />
            <View className="absolute bottom-0 h-1/2 px-2 bg-black/30 w-full">
              <Text className="text-white text-[16px]">{item.title}</Text>
            </View>
            <View className="absolute w-full h-full flex items-center justify-center">
            
             <View className = "bg-white p-2 h-12 w-12 rounded-full flex items-center justify-center">
             <Foundation
                name={
                  soundObj?.isPlaying && currentAudio.title === item.title
                    ? "pause"
                    : "play"
                }
                size={32}
                color="black"
              />
             </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DiscoverMusic;
