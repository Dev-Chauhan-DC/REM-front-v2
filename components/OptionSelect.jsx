import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const OptionSelect = ({ title, options, style, selectedOption,
    optionStyle, textStyle, selectedOptionBackground,
    optionContainerStyle, titleStyle, showPlayButton, onPlayClick,
    initiallySelected, error }) => {

    const [selected, setSelected] = useState(0)

    useEffect(()=>{
        setSelected(initiallySelected ? initiallySelected : 0)
    }, [initiallySelected])

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
                            marginBottom: error ? 10 :16,
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
            {
                error ?
                    <Text
                        style={{
                            color: theme.color.locationRed,
                            fontFamily: theme.font.medium,
                            fontSize: 16,
                            marginBottom: 16
                        }}
                    >{error}</Text>
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
                                        onPress={() => {
                                            setSelected(index);
                                            selectedOption(i, index)
                                        }}
                                        key={index}
                                        style={{
                                            height: 40,
                                            backgroundColor: selected === index
                                                ? (selectedOptionBackground ? selectedOptionBackground : theme.color.primary)
                                                : theme.color.gray100,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingHorizontal: 25,
                                            borderRadius: 5,
                                            ...optionStyle
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: selected === index ? "white" : theme.color.black,
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

export default OptionSelect
