import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../theme'
import Input from './Input'

const TwoInputs = ({ titleStyle, title, betweenText, firstInputKeyboardType, secondInputKeyboardType, firstValue, secondValue, firstPlaceholder, secondPlaceholder }) => {
    const [firstInputValue, setFirstInputValue] = useState("")
    const [secondInputValue, setSecondInputValue] = useState("")


    useEffect(() => {

        firstValue ? firstValue(firstInputValue) : null
        secondValue ? secondValue(secondInputValue) : null


    }, [firstInputValue, secondInputValue])

    return (
        <View>
            <Text
                style={{
                    color: theme.color.black,
                    fontFamily: theme.font.semiBold,
                    fontSize: 14,
                    ...titleStyle,
                    marginBottom: 16

                }}
            >{title}</Text>
            <View
                style={{
                    flexDirection: "row",
                    flex: 1,
                    gap: 5,
                    alignItems: "center"
                }}
            >
                <Input
                    onChangeText={(i) => setFirstInputValue(i)}
                    keyboardType={firstInputKeyboardType ? firstInputKeyboardType : null}
                    placeholder={firstPlaceholder ? firstPlaceholder : ""}
                    style={{
                        flex: 1
                    }}
                    textInputStyle={{
                        marginHorizontal: 20
                    }}
                />
                <Text

                    style={{
                        color: theme.color.black,
                        fontFamily: theme.font.medium,
                        fontSize: 12
                    }}
                >{betweenText ? betweenText : ""}</Text>
                <Input
                    onChangeText={(i) => setSecondInputValue(i)}
                    keyboardType={secondInputKeyboardType ? secondInputKeyboardType : null}
                    placeholder={secondPlaceholder ? secondPlaceholder : ""}
                    style={{
                        flex: 1
                    }}
                    textInputStyle={{
                        marginHorizontal: 20
                    }}
                />
            </View>
        </View>
    )
}

export default TwoInputs

const styles = StyleSheet.create({})