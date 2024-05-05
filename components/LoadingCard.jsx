import { View, Text } from 'react-native'
import React from 'react'
import theme from '../theme'

const LoadingCard = ({style}) => {
    return (
        <View
            style={{
                ...style
            }}
        >
            <View
                style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10

                }}
            ></View>
            <View
                 style={{
                    height: 12,
                    width: "40%",
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10,
                    marginTop: 10

                }}
            ></View>
            <View
                 style={{
                    height: 12,
                    width: "100%",
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10,
                    marginTop: 10

                }}
            ></View>
            <View
                 style={{
                    height: 12,
                    width: "90%",
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10,
                    marginTop: 10

                }}
            ></View>
            <View
                 style={{
                    height: 12,
                    width: "60%",
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10,
                    marginTop: 10

                }}
            ></View>
        </View>
    )
}

export default LoadingCard