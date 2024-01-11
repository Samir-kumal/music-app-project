import {View, Text, ActivityIndicator} from 'react-native'
import React from 'react'
import theme from "../../constants/theme";

const StatusLoading = () => {
    return (
        <View style={{backgroundColor:theme.Primary}} className = "flex-1 items-center justify-center">
            <ActivityIndicator size={"large"} color={theme.Secondary}/>
        </View>
    )
}
export default StatusLoading
