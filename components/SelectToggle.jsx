import {View, Text, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import theme from '../theme'

const SelectToggle = ({twoOption, selectedOption, style, initiallySelected, error}) => {
    const [selectedItem, setSelectedIcon] = useState(0)


    useEffect(() => {
        setSelectedIcon(initiallySelected ? initiallySelected : 0)
    }, [initiallySelected])

    return (
        <View
            style={{...style}}>
            {
                error ?
                    <Text
                        style={{
                            color: theme.color.locationRed,
                            fontFamily: theme.font.medium,
                            fontSize: 16,
                            textAlign: "center",
                            marginBottom: 10
                        }}
                    >{error}</Text>
                    :
                    <></>
            }
            <View
                style={{
                    backgroundColor: theme.color.gray100,
                    // backgroundColor: "red",
                    alignSelf: "center",
                    height: 40,
                    borderRadius: 40 / 2,
                    flexDirection: "row",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                {
                    twoOption.map((i, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    setSelectedIcon(index)
                                    selectedOption(i, index)
                                }}
                                style={{
                                    width: 166 / 2,
                                    backgroundColor: selectedItem === index ? theme.color.primary : theme.color.gray100,
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 40
                                }}
                            >
                                <Text


                                    style={{
                                        color: selectedItem === index ? "white" : theme.color.black,
                                        textTransform: "capitalize",
                                        fontFamily: theme.font.medium,

                                    }}
                                >{i}</Text>
                            </Pressable>
                        )
                    })
                }

            </View>
        </View>
    )
}

export default SelectToggle
