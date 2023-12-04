import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { DiscoverMusicData } from "./DiscoverMusic";
import { router } from "expo-router/src/imperative-api";
import { DataContext } from "../../context/DataProvider";

const MyPlayList = () => {
  const { width, height } = Dimensions.get("window");
  const { songs } = useContext(DataContext);

  const arrayOfImageUrls = [
    "https://i.scdn.co/image/ab67616d00001e02589c88e6373be151694065a7",
    "https://i.scdn.co/image/ab67616d0000b273526ed0c0d1ce4f23f7c53d23",
    "https://i.scdn.co/image/ab67616d0000b2739c6e41236e9710de4e358ff8",
    "https://i.scdn.co/image/ab67616d0000b27395dac48287d3c49378394ac0",
    "https://i.scdn.co/image/ab67616d00001e02237bcefbe7ea4e1190e66662",
    "https://i.scdn.co/image/ab67616d00001e02106f8b6e7616eb8cbcd44356",
    "https://i.scdn.co/image/ab67616d0000b27395dac48287d3c49378394ac0",
    "https://i.scdn.co/image/ab67616d00001e024a60872ae145776164540a7f",
    "https://i.scdn.co/image/ab67616d00001e02f74308b91630e9669c2f8f66",

  ];
  const newArrayWithImages = songs.map((obj, index) => ({
    title: obj.title,
    imageurl: arrayOfImageUrls[index], // Assuming there is a corresponding image URL for each object
  }));
  

  console.log(newArrayWithImages);
  return (
    <View className="w-full h-48 bg-slate-100">
      <Text className="text-xl font-bold mx-4">My PlayList</Text>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "center" }}
          className="flex flex-row   gap-3 mt-2 "
        >
          {newArrayWithImages.map((item) => (
            <Pressable
              onPress={() => {
                console.log("clicked", item.title);
                router.push("(tabs)/playlist");
              }}
              style={{ width: width / 2.2, height: height / 6 }}
              key={item.title}
            >
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                source={{ uri: item.imageurl }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyPlayList;
