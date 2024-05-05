import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const MultipleOptionSelect = ({ title, options, style, selectedOption, optionStyle, textStyle, selectedOptionBackground, optionContainerStyle, titleStyle, showPlayButton, onPlayClick }) => {

    const [selectedArray, setSelectedArray] = useState([])

    const multipleHandle = (i) => {
        var array = [...selectedArray];
        if (array.length >= 0 && array.includes(i)) {
            const newArray = array.filter(item => item !== i);
            setSelectedArray([...newArray])
        } else if (array.length >= 0 && !array.includes(i)) {
            var array2 = [...selectedArray];
            array2.push(i)
            setSelectedArray([...array2])

        }
    }

    useEffect(() => {
        selectedOption(selectedArray)
    }, [selectedArray])

    return (
        <View style={{ ...style }}>
            {
                title ?
                    <Pressable
                        onPress={() => onPlayClick ? onPlayClick() : null}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 16,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.semiBold,
                                fontSize: 14,
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
                    borderRadius: 5,
                    overflow: "hidden"
                }}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 12,
                            ...optionContainerStyle
                        }}>
                        {
                            options ? options.map((i, index) => {
                                return (
                                    <Pressable
                                        onPress={() => multipleHandle(index + 1)}
                                        key={index}
                                        style={{
                                            height: 40,
                                            backgroundColor: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? theme.color.primary : theme.color.gray100,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingHorizontal: 25,
                                            borderRadius: 5,
                                            ...optionStyle
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? "white" : theme.color.black,
                                                fontFamily: theme.font.medium,
                                                textTransform: "capitalize",
                                                ...textStyle
                                            }}
                                        >{i}</Text>
                                    </Pressable>)
                            })
                                :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default MultipleOptionSelect