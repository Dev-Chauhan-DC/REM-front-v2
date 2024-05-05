import { View, Text, Pressable } from 'react-native'
import React from 'react'
import PlayIcon from '../assets/svgs/PlayIcon'
import theme from '../theme'

const ButtonWithIcon = ({ icon, title, onPress, onPlayClick, showPlayButton }) => {
    return (
        <View>
            {
                showPlayButton
                    ?
                    <Pressable
                        onPress={() => onPlayClick()}
                        style={{
                            paddingBottom: 5
                        }}
                    >
                        <PlayIcon
                            style={{
                                width: 16,
                                height: 16,
                                fill: theme.color.gray300,
                            }}
                        />
                    </Pressable>
                    :
                    <></>
            }
            <Pressable
                onPress={() => onPress ? onPress() : null}
                style={{
                    flexDirection: "row",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: theme.color.gray300,
                    height: 55,
                    alignItems: "center",
                }}
            >

                {icon ?
                    React.cloneElement(icon, {
                        style: {
                            width: 20,
                            height: 20,
                            fill: theme.color.black,
                            marginHorizontal: 20
                        },
                    })
                    :
                    <></>
                }
                <Text
                    style={{
                        fontSize: 14,
                        color: theme.color.black,
                        fontFamily: theme.font.medium
                    }}
                >{title}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonWithIcon