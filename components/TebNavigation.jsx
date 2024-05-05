import {View, Text, useWindowDimensions, Pressable} from 'react-native'
import React, {useEffect} from 'react'
import Search from '../assets/svgs/SearchIcon'
import Heart from '../assets/svgs/Heart'
import Person from '../assets/svgs/Person'
import ActiveSearch from '../assets/svgs/ActiveSearch'
import ActiveHeart from '../assets/svgs/ActiveHeart'
import ActivePerson from '../assets/svgs/ActivePerson'
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import theme from '../theme'

const TebNavigation = ({onLayout, style}) => {

    const screenWidth = useWindowDimensions().width
    const navigation = useNavigation()
    const currentScreenName = useRoute().name


    return (
        <View
            onLayout={({nativeEvent}) => onLayout ? onLayout(nativeEvent) : null}
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "white",
                height: 50,
                width: screenWidth,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                elevation: 20,
                ...style
            }}>

            <Pressable
                onPress={() => navigation.navigate("home")}
            >
                {
                    currentScreenName === "home"
                        ?
                        <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <ActiveSearch style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>
                        :
                        <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <Search style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>
                }

            </Pressable>


            <Pressable
                onPress={() => navigation.navigate("like")}
            >
                {
                    currentScreenName === "like"
                        ?

                        <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <ActiveHeart style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>
                        :
                        <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <Heart style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>
                }

            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("profile")}
            >
                {
                    currentScreenName === "profile"
                        ? <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <ActivePerson style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>

                        :
                        <View style={{
                            width: screenWidth / 3,
                            backgroundColor: "white",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"

                        }}>
                            <Person style={{
                                width: 20,
                                height: 20,
                                fill: theme.color.black
                            }}/>
                        </View>
                }
            </Pressable>

        </View>
    )
}

export default TebNavigation
