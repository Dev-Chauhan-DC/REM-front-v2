import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import theme from '../theme'
import PlayIcon from '../assets/svgs/PlayIcon'

const Input = ({
                   placeholder,
                   keyboardType,
                   showPlayButton,
                   onPlayClick,
                   onChangeText,
                   value,
                   style,
                   textInputStyle,
                   error
               }) => {
    const [isFocus, setIsFocus] = useState(false)
    const [inputText, setInputText] = useState("")
    const inputRef = useRef(null)

    useEffect(() => {
        value && value.length == 0 ? setIsFocus(false) : setIsFocus(true);
    }, [value])

    return (
        <View style={{...style}}>

            {
                showPlayButton
                    ?
                    <Pressable
                        onPress={() => onPlayClick()}
                        style={{
                            paddingBottom: 5
                        }}
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
            <Pressable onPress={() => inputRef.current.focus()} style={{
                position: "relative",
                borderColor: error ? theme.color.locationRed : theme.color.gray300,
                borderWidth: 1,
                borderRadius: 5, paddingTop: 18, height: 55
            }}>
                <TextInput
                    value={value ? value : null}
                    keyboardType={keyboardType}
                    ref={inputRef}
                    cursorColor={theme.color.gray300}
                    onChangeText={
                        (i) => {
                            onChangeText ? onChangeText(i) : null
                            setInputText(i)
                        }}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => value && value.length == 0 ? setIsFocus(false) : null}
                    style={{
                        borderWidth: 0,
                        borderColor: theme.color.gray400,
                        color: theme.color.black,
                        borderRadius: 5,
                        paddingHorizontal: 20,
                        paddingVertical: 0,
                        fontSize: 16,
                        ...textInputStyle
                    }}
                >

                </TextInput>
                <Text style={{
                    position: "absolute",
                    top: isFocus ? 5 : 15,
                    left: 20,
                    color: theme.color.gray300,
                    fontSize: isFocus ? 11 : 16,
                    fontFamily: theme.font.regular
                }}>{placeholder}</Text>
            </Pressable>
            {
                error ?
                    <Text
                        style={{
                            color: theme.color.locationRed,
                            fontFamily: theme.font.medium,
                            fontSize: 16,
                            marginTop: 3
                        }}
                    >{error}</Text>
                    :
                    <></>
            }
        </View>
    )
}

export default Input
