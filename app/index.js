import { View, Text } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { DataContext } from '../src/context/DataProvider'
import { Redirect } from 'expo-router'
import Loading from '../src/components/Common/Loading'
const index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {userInfo, isLoggedIn} = useContext(DataContext)


  setTimeout(()=>{
    setIsLoading(false)
  },2000)
  return (
    <>
   <Redirect href={"(auth)/onboard"} />
    </>
  )
}

export default index