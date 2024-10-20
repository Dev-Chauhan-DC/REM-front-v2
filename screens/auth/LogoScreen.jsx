import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LogoSvg from '../../assets/svgs/LogoSvg'

const LogoScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LogoSvg />



      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
    </View>
  )
}

export default LogoScreen

