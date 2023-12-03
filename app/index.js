import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { DataContext } from '../src/context/DataProvider'
import { Redirect } from 'expo-router'
const index = () => {
    const user = useContext(DataContext)

    console.log(user);

  return (
    <>
     {user? <Redirect href={"(tabs)"} /> : <Redirect href={"(auth)/signin"} />}
    </>
  )
}

export default index