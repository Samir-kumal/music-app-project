import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { router } from "expo-router/src/imperative-api";

export const DataContext = createContext(null);
const endpoint = "/users";
export const URL = "http://192.168.54.141:9000";
const DataProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [newSongs, setNewSongs] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);

      // console.log(response.data)
      const user = decodedToken;
      if (user) {
        setUserInfo((prev) => ({
          ...prev,
          userId: user.userId,
          userName: user.userName,
          userEmail: user.userEmail,
          userImage: user.userImage,
          isArtist: user.isArtist,
        }));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("error retrieving userData", error.message);
    }
  };
  const fetchUsers = async () => {
    const result = await axios.get(`${URL}${endpoint}`);
    const data = result.data;
    setUsers(data);
    // console.log(data);
  };
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${URL}/songs`);
      const data = await response.data;
      setSongs(data);
      // console.log(data)
    } catch (error) {
      console.error("Error fetching songs:", error.message);
    }
  };

  const fetchNewSongs = async () => {
    try {
      const response = await axios.get(`${URL}/newSongs`);
      const data = response.data;
      setNewSongs(data);
    } catch (error) {
      console.log("Error fetching songs:", error.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
    fetchSongs();
    fetchNewSongs();
    fetchUsers();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  console.log(userInfo);

  useEffect(() => {
    if (isLoggedIn || userInfo) {
      router.replace("(tabs)");
    }
  },[userInfo]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    setTimeout(() => {
        router.push("(auth)/signin");
      }, 2000);
      setIsLoading(true);
      setIsLoggedIn(false);
  };
  return (
    <DataContext.Provider
      value={{
        userInfo,
        fetchUserInfo,
        users,
        songs,
        newSongs,
        handleLogout,
        setIsLoading,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
