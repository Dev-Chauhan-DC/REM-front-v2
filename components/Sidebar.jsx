import { Pressable, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import LeftArrow from '../assets/svgs/LeftArrow'
import theme from '../theme'

const Sidebar = ({ children, isShow }) => {
    const screenHeight = useWindowDimensions().height
    const screenWidth = useWindowDimensions().width

    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                flex: 1,
                backgroundColor: "gray",
                height: screenHeight,
                width: screenWidth,
                display: isShow ? "" : "none"
            }}
        >
            {children}
        </View>
    )
}

export default Sidebar
