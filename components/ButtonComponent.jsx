import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import theme from '../theme'

const ButtonComponent = ({ title, onPress, style, titleStyle, onLayout, isLoading }) => {
    return (
        <Pressable
            onLayout={({ nativeEvent }) => onLayout ? onLayout(nativeEvent) : null}
            onPress={() => onPress ? onPress() : null}
            style={{
                backgroundColor: theme.color.primary,
                height: 55,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                ...style,
                flexDirection: "row"
            }}>
            {
                isLoading ?
                    <ActivityIndicator
                        size="small"
                        color={"white"}
                        style={{
                            marginRight: 10
                        }}
                    /> :
                    <></>
            }
            <Text
                style={{
                    fontSize: 16,
                    color: "white",
                    fontFamily: theme.font.regular,
                    ...titleStyle
                }}
            >{title}</Text>
        </Pressable>
    )
}

export default ButtonComponent
