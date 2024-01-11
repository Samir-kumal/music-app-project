import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Image,
    ScrollView,

    Pressable,
    Alert, TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import { URL } from "../../context/DataProvider";
import { router } from "expo-router/src/imperative-api";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = React.useState('first');

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.uri);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // const uploadImageToServer = async (imageUri,email) => {
    //   const formData = new FormData();
    //   formData.append('image', {
    //     uri: imageUri,
    //     type: 'image/jpeg',
    //     name: new Date() + '_image.jpeg',
    //     email:email
    //   });

    //   const response = await axios.post(`${URL}/upload`, formData);

    //   const json = await response.json();

    //   if (response.ok) {
    //     return json.imageUrl; // URL of uploaded image
    //   }

    //   throw new Error(json.error);
    // };
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
      isArtist: checked === "first"
    };

    console.log("clicked")

    // uploadImageToServer(image,email)
    // send a POST  request to the backend API to register the user
    axios
      .post(`${URL}/users/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
        setTimeout(()=>{
            router.push("(auth)/signin");

        },2000)
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <ScrollView
        contentContainerStyle={{alignItems:"center"}}
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >


          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register To your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#afacac"}

              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#afacac"}

              placeholder="enter Your Email"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#afacac"}

              placeholder="Password"
            />
          </View>
          <View style={{ marginTop: 10}}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Are you an Artist?
            </Text>

            <View className = "flex flex-row justify-between">
    <View className = "flex flex-row items-center">
      <Text>Yes</Text>
    <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
    </View>
    <View className = "flex flex-row items-center">
      <Text>No</Text>
    <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
    </View>
    </View>
          </View>


          <View style={{ marginTop: 10, width:"100%",height:180, display:"flex" }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Image
            </Text>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              secureTextEntry={false}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#afacac"}

              placeholder="Enter Profile Image url"
            />
              {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, margin:10 }} />}


          </View>

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already Have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
