import { View, Text, TextInput } from 'react-native'
import React from 'react'
import theme from '../theme'

const SmallInput = ({ placeholder, style, onChangeText }) => {
  return (
    <TextInput
      onChangeText={(i) => { onChangeText(i) }}
      cursorColor={theme.color.primary}
      placeholder={placeholder ? placeholder : "Add placeholder"}
      placeholderTextColor={theme.color.gray300}
      style={{
        height: 30,
        borderWidth: 1,
        borderColor: theme.color.gray300,
        borderRadius: 20,
        fontSize: 10,
        padding: 0,
        margin: 0,
        fontFamily: theme.font.medium,
        width: 150,
        // textAlign: "center",
        ...style,
        color: theme.color.primary,
        paddingStart: 20

      }}
    />
  )
}

export default SmallInput