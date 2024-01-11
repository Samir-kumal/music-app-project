import {View, Text} from 'react-native'
import React, {createContext} from 'react'
const AuthContext = createContext(null);
const Auth = () => {
    return (
        <View>
            <Text>Auth</Text>
        </View>
    )
}
export default Auth
