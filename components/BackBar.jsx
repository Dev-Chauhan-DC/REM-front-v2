import { View, Text, Pressable } from 'react-native'
import React from 'react'
import LeftArrow from '../assets/svgs/LeftArrow'
import { useNavigation } from '@react-navigation/native'

const BackBar = ({onLayout}) => {

    const navigation = useNavigation()
    return (
        <Pressable
            onLayout={({ nativeEvent }) => onLayout ? onLayout(nativeEvent) : null}
            onPress={() => navigation.goBack()}
        >
            <LeftArrow
                style={{
                    width: 23,
                    height: 23,
                    marginBottom: 20
                }}
            />
        </Pressable>
    )
}

export default BackBar