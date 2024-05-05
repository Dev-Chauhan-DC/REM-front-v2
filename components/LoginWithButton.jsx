import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import GoogleColorLogo from '../assets/svgs/GoogleColorLogo'
import theme from '../theme'

const LoginWithButton = () => {
    return (
        <Pressable
            style={{
                height: 55,
                borderColor: theme.color.black,
                borderRadius: 5,
                borderWidth: 1,
                paddingHorizontal: 25,
                justifyContent: "center"
            }}>
            <View
                style={{
                    flexDirection: "row",
                    gap: 44
                }}>
                <GoogleColorLogo style={{
                    width: 20,
                    height: 20,

                }} />
                <Text
                    style={{
                        color: theme.color.black,
                        fontSize: 14,
                        fontFamily: theme.font.medium
                    }}>Continue with Google</Text>
            </View>
        </Pressable>
    )
}

export default LoginWithButton
