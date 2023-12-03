import { View, Text } from 'react-native'
import React,{createContext, useEffect,useState} from 'react'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode";

export const DataContext = createContext(null);
const DataProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {

        const fetchUserInfo = async ()=>{
            try {
                const token = await AsyncStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.userId;
                console.log(decodedToken)
                const response = await axios.post("http://localhost:8000/messages",{
                    userId
                })
                console.log(response.data)

                setUserInfo(response.data);

            } catch (error){
                console.log("error retrieving users", error.message);

            }
        }
        fetchUserInfo()
    }, [])
  return (
    <DataContext.Provider value={userInfo}>
     {children}
    </DataContext.Provider>
  )
}

export default DataProvider