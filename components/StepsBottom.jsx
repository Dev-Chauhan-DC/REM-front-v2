import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import theme from '../theme'
import ButtonComponent from './ButtonComponent'
import { useNavigation } from '@react-navigation/native'

const StepsBottom = ({ stepCount, currentStep, onLayout, onNextPress, primaryBtnText }) => {

    const screenWidth = useWindowDimensions().width

    const arrayWithZeros = Array.from({ length: stepCount }).fill(0);
    const navigation = useNavigation();


    return (
        <View
            onLayout={({ nativeEvent }) => onLayout ? onLayout(nativeEvent) : null}
            style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: screenWidth,
            }}
        >
            <View
                style={{
                    height: 5,
                    flexDirection: "row",
                    gap: 3,
                    flex: 1
                }}
            >
                {
                    arrayWithZeros.map((i, index) => {
                        return (

                            <View
                                key={index}
                                style={{
                                    backgroundColor: index + 1 > currentStep ? theme.color.gray200 : theme.color.primary,
                                    height: "100%",
                                    flex: 1
                                }}
                            ></View>
                        )

                    })
                }

            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 25,
                    paddingVertical: 10
                }}
            >
                <ButtonComponent
                    onPress={() => { navigation.goBack() }}
                    title={"Back"}
                    style={{
                        height: 40,
                        paddingHorizontal: 30,
                        backgroundColor: "white"
                    }}
                    titleStyle={{
                        color: theme.color.black,
                        fontSize: 14,
                        fontFamily: theme.font.medium
                    }}
                />
                <ButtonComponent
                    onPress={() => onNextPress ? onNextPress() : null}
                    title={primaryBtnText ? primaryBtnText : "Next"}
                    style={{
                        height: 40,
                        paddingHorizontal: 30,
                    }}
                    titleStyle={{
                        fontSize: 14,
                        fontFamily: theme.font.medium
                    }}
                />
            </View>
        </View>
    )
}

export default StepsBottom