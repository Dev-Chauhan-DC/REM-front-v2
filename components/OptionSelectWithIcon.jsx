import {View, Text, ScrollView, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const OptionSelectWithIcon = ({
                                  iconList,
                                  optionsList,
                                  title,
                                  style,
                                  selectedOption,
                                  onPlayClick,
                                  showPlayButton,
                                  initiallySelected,
                                  error
                              }) => {
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        setSelected(initiallySelected ? initiallySelected : 0)
    }, [initiallySelected])

    return (
        <View>
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
                                            onPress={() => {
                                                setSelected(index)
                                                selectedOption(i, index)
                                            }}
                                            key={index}
                                            style={{
                                                alignItems: "center",
                                                paddingHorizontal: 13,
                                                backgroundColor: selected === index ? theme.color.primary : theme.color.gray100,
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
                                                        fill: selected === index ? "white" : theme.color.gray400,
                                                    },
                                                })

                                            }
                                            <Text
                                                style={{
                                                    color: selected === index ? "white" : theme.color.gray400,
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

export default OptionSelectWithIcon
