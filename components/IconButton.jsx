import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Sort from '../assets/svgs/Sort'
import theme from '../theme'
import CompareIcon from '../assets/svgs/CompareIcon'

const IconButton = ({ style, name, onPress, onLayout }) => {
    return (
        <Pressable
            onLayout={({ nativeEvent }) => onLayout ? onLayout(nativeEvent) : null}
            onPress={() => onPress ? onPress() : null}
            style={{
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                borderColor: theme.color.gray100,
                borderRadius: 50,
                alignSelf: 'flex-end',
                paddingHorizontal: 15,
                height: 30,
                gap: 5,
                ...style
            }}>
            {
                name === "sort"
                    ?
                    <Sort style={{
                        width: 20,
                        height: 20,
                        fill: theme.color.gray400
                    }} />
                    :
                    <CompareIcon style={{
                        width: 20,
                        height: 20,
                        fill: theme.color.gray400,
                    }} />
            }

            <Text
                style={{
                    color: theme.color.gray400,
                    fontSize: 12,
                    fontFamily: theme.font.medium
                }}>{name === "sort" ? "Sort by" : "Compare"}</Text>
        </Pressable>
    )
}

export default IconButton