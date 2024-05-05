import { View, Text, StatusBar, Image, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import theme from '../../theme'
import ButtonComponent from '../../components/ButtonComponent'
import Input from '../../components/Input'
import SmallInput from '../../components/SmallInput'

const ListPropertyPlan = () => {
    const { width, height } = useWindowDimensions()
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingHorizontal: theme.screen.horizontalPadding,
                justifyContent: "center"
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
            >
                <View 
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        height: height
                    }}
                >

                    <Image
                        style={{
                            width: "100%",
                            objectFit: "contain",
                            height: height / 2,
                        }}
                        source={require('../../assets/images/listingPlan.png')} />
                    <Text
                        style={{
                            fontFamily: theme.font.medium,
                            color: theme.color.gray400,
                            fontSize: 12,
                            marginTop: 25,
                            alignSelf: 'center'
                        }}
                    >
                        List your property for next 15 days
                    </Text>
                    <ButtonComponent
                        title={"₹100 for 15 days"}
                        style={{
                            width: "100%",
                            marginTop: 7
                        }}
                        titleStyle={{
                            fontFamily: theme.font.semiBold
                        }}
                    />
                    <View
                        style={{
                            width: "100%",
                            alignItems: "flex-end"
                        }}
                    >
                        <SmallInput
                            style={{
                                marginTop: 20
                            }}
                            placeholder={"Apply coupon"}
                        />
                    </View>

                </View>
            </ScrollView>
            <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />
        </View>
    )
}

export default ListPropertyPlan