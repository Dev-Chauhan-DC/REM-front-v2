import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const TwoCursorProgressBar = ({ title, onPlayClick, showPlayButton, titleStyle }) => {



    return (
        <View
            style={{
                marginBottom: 30
            }}
        >
            {
                title ?
                    <Pressable
                        onPress={() => onPlayClick ? onPlayClick() : null}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 25,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.medium,
                                fontSize: 16,
                                ...titleStyle

                            }}
                        >{title}</Text>
                        {
                            showPlayButton
                                ?
                                <PlayIcon
                                    style={{
                                        width: 16,
                                        height: 16,
                                        fill: theme.color.gray300,
                                    }}
                                />
                                :
                                <></>
                        }
                    </Pressable>
                    :
                    <></>
            }
            <View
                style={{
                    width: "100%",
                    height: 4,
                    backgroundColor: theme.color.gray100,
                    borderRadius: 10,
                    position: "relative"
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "10%",
                        height: "100%",
                        backgroundColor: theme.color.primary,
                        width: "50%",
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                    }}
                >
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: theme.color.primary,
                            borderRadius: 50,
                            position: "relative"
                        }}
                    >
                        <Text
                            style={{
                                color: theme.color.black,
                                fontSize: 12,
                                fontFamily: theme.font.medium,
                                position: "absolute",
                                width: 50,
                                top: 20,
                                textAlign: "center",
                                left: -20

                            }}
                        >50 Year</Text>

                    </View>
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: theme.color.primary,
                            borderRadius: 50,
                            position: "relative"
                        }}
                    >
                        <Text
                            style={{
                                color: theme.color.black,
                                fontSize: 12,
                                fontFamily: theme.font.medium,
                                position: "absolute",
                                width: 50,
                                top: 20,
                                textAlign: "center",
                                left: -20

                            }}
                        >50 Year</Text>

                    </View>

                </View>

            </View>
        </View>
    )
}

export default TwoCursorProgressBar