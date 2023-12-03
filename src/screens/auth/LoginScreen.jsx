import {
    Alert,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, {useState, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFormik} from "formik";
import * as Yup from "yup"

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:Yup.object({
            email:Yup.string().required("required").email(),
            password:Yup.string().required("required")
        }),
        onSubmit: async (values)=>{
            console.log(values)
            const user = {
                email: values.email,
                password: values.password,
            };

            await axios
                .post("http://192.168.54.95:8000/login", user)
                .then((response) => {
                    console.log(response);
                    const token = response.data.token;
                    console.log(token);

                    AsyncStorage.setItem("authToken", token);

                    navigation.replace("Home");
                })
                .catch((error) => {
                    if (error.message === "Request failed with status code 404"){
                        Alert.alert("Login Error", "User not Found");

                    }else  if (error.message === "Request failed with status code 401"){
                        Alert.alert("Login Error", "Invalid Credentials");

                    }
                    console.log(error.message);
                });
        }
    })
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.replace("Home");
                } else {
                    // token not found , show the login screen itself
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        checkLoginStatus();
    }, []);
    const handleLogin = async () => {
        // if(email.length ===0)

    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                padding: 10,
                alignItems: "center",
            }}
        >
            <KeyboardAvoidingView>
                <View
                    style={{
                        marginTop: 100,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{color: "#4A55A2", fontSize: 17, fontWeight: "600"}}>
                        Sign In
                    </Text>

                    <Text style={{fontSize: 17, fontWeight: "600", marginTop: 15}}>
                        Sign In to Your Account
                    </Text>
                </View>

                <View style={{marginTop: 50}}>
                    <View>
                        <Text style={{fontSize: 18, fontWeight: "600", color: "gray"}}>
                            Email
                        </Text>

                        <TextInput

                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomColor: touched.email && errors.email ? "red": "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                            placeholderTextColor={"#afacac"}
                            placeholder="Enter Your Email"
                        />
                        <Text style={{color:"red"}} >{ touched.email&&errors.email && errors.email}</Text>

                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "600", color: "gray"}}>
                            Password
                        </Text>

                        <TextInput
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            secureTextEntry={true}
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomColor: touched.password && errors.password ? "red": "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                            placeholderTextColor={"#afacac"}
                            placeholder="Enter your password"
                        />
                        <Text style={{color:"red"}} >{ touched.password&&errors.password && errors.password}</Text>
                    </View>

                    <Pressable
                        onPress={handleSubmit}
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
                            Login
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                        style={{marginTop: 15}}
                    >
                        <Text style={{textAlign: "center", color: "gray", fontSize: 16}}>
                            Dont't have an account? Sign Up
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
