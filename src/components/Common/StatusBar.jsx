import { View, Text, StatusBar } from 'react-native'
import React,{useContext} from 'react'
import { DataContext } from '../../context/DataProvider';

const StatusBarComponent = () => {
    const {colorScheme} = useContext(DataContext);
  return (
    <>
      <StatusBar barStyle={colorScheme === "dark" ? "dark-content" : "light-content"} />
    </>
  )
}

export default StatusBarComponent