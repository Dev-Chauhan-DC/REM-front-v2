import {Pressable, StatusBar, StyleSheet, Text, View, useWindowDimensions, Platform} from 'react-native'
import React, { useState } from 'react'
import theme from '../theme'
import {useSafeAreaInsets} from "react-native-safe-area-context";

const BottomSheet = ({ children, isShow, style, outsideClick, showBackgroundBlur, sheetHeight }) => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;
    const screenWidth = useWindowDimensions().width
    const screenHeight = useWindowDimensions().height

    const handleLayout = event => {
        const { height, width } = event.nativeEvent.layout;
        sheetHeight ? sheetHeight(height) : null
    };

    if (isShow) {
        return (

            <View

                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: screenHeight - safeRemovedTotalHeightIos,
                    width: screenWidth,

                }}
            >
                {
                    showBackgroundBlur
                        ?
                        <Pressable
                            onPress={() => outsideClick ? outsideClick() : null}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: screenHeight - safeRemovedTotalHeightIos,
                                width: screenWidth,
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                            }}
                        >

                        </Pressable>
                        :
                        <></>
                }



                <View
                    onLayout={handleLayout}
                    style={{
                        backgroundColor: "white",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: screenWidth,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        zIndex: 1,
                        ...style
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 3,
                                backgroundColor: theme.color.gray300,
                                borderRadius: 10,
                                marginVertical: 5
                            }}
                        ></View>
                    </View>
                    {children}

                </View>



                <StatusBar backgroundColor={showBackgroundBlur ? "#595959" : "white"} />
            </View>

        )
    } if (!isShow) {
        return (
            <></>
        )
    }
}

export default BottomSheet
