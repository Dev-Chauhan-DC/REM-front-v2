import {View, Text, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import CheckIcon from '../assets/svgs/CheckIcon'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const CheckBoxWithTitle = ({title, checkStatus, showPlayButton, onPlayClick, initCheck, style}) => {
    const [isCheck, setIsCheck] = useState(false)


    useEffect(() => {
        setIsCheck(initCheck ? initCheck : false)
    }, [initCheck])


    const pressHandle = () => {
        const data = !isCheck
        setIsCheck(data)
        checkStatus ? checkStatus(data) : null
    }


    return (
        <View
            style={{
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
                ...style
            }}
        >
            <Pressable
                onPress={() => {

                    pressHandle()
                }}
                style={{
                    flexDirection: "row",
                    gap: 12
                }}
            >
                <View

                    style={{
                        width: 22,
                        height: 22,
                        borderRadius: 5,
                        backgroundColor: isCheck ? theme.color.primary : theme.color.gray100,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >{
                    isCheck ?
                        <CheckIcon
                            style={{
                                width: 12,
                                height: 12,
                                fill: "white"
                            }}
                        />
                        :
                        <></>
                }

                </View>
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: theme.font.medium,
                        color: theme.color.black
                    }}
                >{title}</Text>
            </Pressable>
            {
                showPlayButton
                    ?
                    <Pressable

                        onPress={() => onPlayClick()}
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
        </View>
    )
}

export default CheckBoxWithTitle
