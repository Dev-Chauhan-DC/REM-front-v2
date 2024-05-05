import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const MultipleOptionSelectWithIcon = ({ iconList, optionsList, title, style, selectedOption, onPlayClick, showPlayButton }) => {
    const [selectedArray, setSelectedArray] = useState([])


     const multipleHandle = (i) => {
        var array = [...selectedArray];
        if(array.length >= 0 && array.includes(i)){
            const newArray = array.filter(item => item !== i);
            setSelectedArray([...newArray])
        }else if(array.length >= 0 && !array.includes(i)){
            var array2 = [...selectedArray];
            array2.push(i)
            setSelectedArray([...array2])

        }
    }

    useEffect(()=>{
        selectedOption(selectedArray)
    },[selectedArray])
    return (
        <View>
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
                        fontFamily: theme.font.medium,

                        fontSize: 16,
                        ...style
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
            <View
                style={{
                    borderRadius: 5,
                    overflow: "hidden"
                }}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <View
                        style={{
                            alignItems: "flex-start",
                            flexDirection: "row",
                            gap: 12,
                        }}
                    >
                        {
                            optionsList
                                ?
                                optionsList.map((i, index) => {
                                    return (
                                        <Pressable
                                            onPress={() => multipleHandle(index + 1)}
                                            key={index}
                                            style={{
                                                alignItems: "center",
                                                paddingHorizontal: 13,
                                                backgroundColor: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? theme.color.primary : theme.color.gray100,
                                                borderRadius: 5,
                                                paddingVertical: 13,
                                                gap: 4,
                                            }}
                                        >
                                            {
                                                React.cloneElement(iconList[index], {
                                                    style: {
                                                        width: 35,
                                                        height: 35,
                                                        fill: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? "white" : theme.color.gray400,
                                                    },
                                                })

                                            }
                                            <Text
                                                style={{
                                                    color: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? "white" : theme.color.gray400,
                                                    fontSize: 14,
                                                    textTransform: "capitalize",
                                                    fontFamily: theme.font.medium
                                                }}
                                            >{i}</Text>
                                        </Pressable>
                                    )
                                })
                                :
                                <></>
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default MultipleOptionSelectWithIcon