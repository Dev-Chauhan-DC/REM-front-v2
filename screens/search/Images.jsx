import {View, Text, StatusBar, Image, Pressable, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import theme from '../../theme'
import LeftArrow from '../../assets/svgs/LeftArrow'
import {useNavigation} from '@react-navigation/native'

const Images = ({route}) => {
    const navigation = useNavigation()
    const [imageLists, setImageLists] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)


    const imageNextHandle = () => {
        if (currentIndex === imageLists.length - 1) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }


    useEffect(() => {
        const imageArray = route.params.imageArray
        setImageLists(imageArray)
    }, [])
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black"
            }}
        >
            <View
                style={{
                    backgroundColor: "black",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: theme.screen.horizontalPadding,
                        position: "absolute",
                        top: 10,
                        left: 0,
                        alignItems: "center"

                    }}
                >
                    <Pressable

                        onPress={() => navigation.goBack()}
                    >
                        <LeftArrow
                            style={{
                                width: 20,
                                height: 20,
                                fill: "white",
                            }}
                        />
                    </Pressable>
                    <Text
                        style={{
                            color: "white",
                            fontFamily: theme.font.regular,
                            fontSize: 14
                        }}
                    >{currentIndex + 1} / {imageLists.length}</Text>
                </View>
                <Pressable
                    style={{
                        width: "100%",
                        zIndex: -10
                    }}
                    onPress={imageNextHandle}>
                    <Image

                        style={{
                            resizeMode: "contain",
                            width: "100%",
                            height: "100%"

                        }}
                        source={
                            imageLists.length !== 0 ?
                                {uri: imageLists[currentIndex].photos}
                                :
                                require("../../assets/images/house.jpg")
                        }
                    />

                </Pressable>

                <StatusBar backgroundColor={"black"} barStyle={"light-content"}/>
            </View>
        </SafeAreaView>
    )
}

export default Images
