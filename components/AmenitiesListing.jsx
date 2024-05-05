import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'









const AmenitiesListing = ({ onPlayClick, showPlayButton, style, iconList, 
    titleList, onChangeArray, initArray }) => {
    const screenWidth = useWindowDimensions().width
    const [selectedArray, setSelectedArray] = useState([])




    const amenityHandle = (i) => {
        var array = [...selectedArray];
        let answerArray = []
        if(array.length >= 0 && array.includes(i)){
            const newArray = array.filter(item => item !== i);
            setSelectedArray([...newArray])
            answerArray = [...newArray]
        }else if(array.length >= 0 && !array.includes(i)){
            var array2 = [...selectedArray];
            array2.push(i)
            setSelectedArray([...array2])
            answerArray = [...array2]
        }

        onChangeArray ? onChangeArray([...answerArray]) : []

    }










    useEffect(() => {
        setSelectedArray(initArray ? initArray : [])
    }, [initArray])

    return (
        <View style={{ ...style }}>
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
                        fontSize: 16,
                        fontFamily: theme.font.medium

                    }}
                >Amenities</Text>
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
                    flexDirection: 'row',
                    flexWrap: 'wrap',

                }}
            >
                {
                    titleList.map((i, index) => {
                        return (
                            <Pressable
                                onPress={() => amenityHandle(index + 1)}
                                key={index}
                                style={{
                                    gap: 5,
                                    backgroundColor: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? theme.color.primary : theme.color.gray100,
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    width: '49%',
                                    marginRight: index % 2 === 0 ? "2%" : 0,
                                    marginBottom: "2%"
                                }}
                            >
                                {iconList[index] ?
                                    React.cloneElement(iconList[index], {
                                        style: {
                                            width: 25,
                                            height: 25,
                                            fill: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? "white" : theme.color.gray400,
                                        },
                                    })
                                    :
                                    <></>
                                }
                                <Text
                                    style={{
                                        color: selectedArray.length >= 0 && selectedArray.includes(index + 1) ? "white" : theme.color.gray400,
                                        fontSize: 14,
                                        fontFamily: theme.font.medium
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

export default AmenitiesListing