import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme'
import CheckIcon from '../assets/svgs/CheckIcon'

const ListSelect = ({ items, selected, style, selectedItem }) => {
    return (
        <View
            style={{
                ...style
            }}
        >
            {
                items.map((i, index) => {
                    return (
                        <Pressable
                            onPress={
                                () => {
                                    (selected ? selected(i, index) : null);
                                }}
                            key={index}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: theme.screen.horizontalPadding,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}

                        >
                            <Text
                                style={{
                                    color: selectedItem === index ? theme.color.primary : theme.color.black,
                                    fontFamily: theme.font.medium,
                                    fontSize: 16,

                                }}

                            >{i}</Text>
                            {
                                selectedItem === index
                                    ?
                                    <CheckIcon
                                        style={{
                                            width: 10,
                                            height: 10,
                                            fill: theme.color.primary
                                        }}
                                    />
                                    :
                                    <></>
                            }

                        </Pressable>

                    )
                })
            }

        </View>
    )
}

export default ListSelect