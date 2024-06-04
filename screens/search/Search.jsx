import {
    View,
    Text,
    Pressable,
    TextInput,
    useWindowDimensions,
    StatusBar,
    SafeAreaView,
    ToastAndroid, ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react'
import LeftArrow from '../../assets/svgs/LeftArrow'
import SearchIcon from '../../assets/svgs/SearchIcon'
import theme from '../../theme'
import LocationIcon from '../../assets/svgs/LocationIcon'
import {useNavigation} from '@react-navigation/native'
import googleApis from '../../apis/googleApis'
import {useRecoilState} from 'recoil';
import {
    filterStringState,
    latitudeState, longitudeState,
    northeastLatState,
    northeastLngState, pageState, propertiesState, searchQueryState,
    southwestLatState,
    southwestLngState,
} from '../../atoms/search';
import queryString from '../../utilities/queryString/queryString';


const Search = () => {

    const screenWidth = useWindowDimensions().width
    const navigation = useNavigation()
    const [suggestions, setSuggestions] = useState([])
    const [northeastLat, setNortheastLat] = useRecoilState(northeastLatState);
    const [southwestLat, setSouthwestLat] = useRecoilState(southwestLatState);
    const [northeastLng, setNortheastLng] = useRecoilState(northeastLngState);
    const [southwestLng, setSouthwestLng] = useRecoilState(southwestLngState);
    const [latitude, setLatitude] = useRecoilState(latitudeState);
    const [longitude, setLongitude] = useRecoilState(longitudeState);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [properties, setProperties] = useRecoilState(propertiesState);
    const [page, setPage] = useRecoilState(pageState);
    const [filterString, setFilterString] = useRecoilState(filterStringState);
    const [apiCallLoading, setApiCallLoading] = useState(false)

    const searchHandle = async (i) => {
        const response = await googleApis.googlePlaceAutoComplateApi(i)

        if (response && response.data && response.data.predictions) {
            setSuggestions(response.data.predictions)
        }


    }

    const selectedSuggestionHandle = async (index) => {

        try {
            setApiCallLoading(true)

            const placeId = suggestions[index].place_id
            const response = await googleApis.googlePlaceDetails(placeId);

            setProperties([])
            setPage(1)

            const newStr = queryString.set(filterString, "page", "1")
            setFilterString(newStr)


            const data = {
                location: response.data.result.geometry.location,
                viewport: response.data.result.geometry.viewport,
                address: response.data.result.formatted_address,
            }

            setNortheastLat(data?.viewport?.northeast?.lat || 37.51)
            setSouthwestLat(data?.viewport?.southwest?.lat || 8.43)
            setNortheastLng(data?.viewport?.northeast?.lng || 97.85)
            setSouthwestLng(data?.viewport?.southwest?.lng || 68.73)

            setLatitude(data?.location?.lat || 21.27058340704162)
            setLongitude(data?.location?.lng || 72.94321056780348)

            setSearchQuery(data?.address)

            navigation.navigate("home")
            setApiCallLoading(false)
        } catch (e) {
            setApiCallLoading(false)
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
        }
    }


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white"
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: theme.screen.horizontalPadding
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: theme.color.gray200,
                        borderRadius: 100,
                        height: 45,
                        marginTop: 5,
                        justifyContent: "space-between",
                        overflow: "hidden",
                    }}
                >
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 45,
                            height: 45,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <LeftArrow
                            style={{
                                width: 23,
                                height: 23,
                                fill: theme.color.black
                            }}
                        />
                    </Pressable>
                    <TextInput
                        onChangeText={searchHandle}
                        placeholder='Search city or area'
                        placeholderTextColor={theme.color.gray400}
                        cursorColor={theme.color.gray300}
                        style={{
                            width: screenWidth - 45 - 45 - 40 - 2,
                            color: theme.color.black,
                            fontFamily: theme.font.medium,
                            fontSize: 14,
                        }}
                    />
                    <View
                        style={{
                            width: 45,
                            height: 45,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {
                            !apiCallLoading ?
                                <SearchIcon style={{
                                    width: 17,
                                    height: 17,
                                    fill: theme.color.black
                                }}/> :
                                <ActivityIndicator
                                    color={theme.color.black}
                                    style={{
                                        width: 17,
                                        height: 17,
                                        fill: theme.color.black
                                    }}
                                />
                        }

                    </View>
                </View>
                {/*  */}
                <View
                    style={{
                        paddingTop: 20
                    }}
                >

                    {
                        suggestions.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => selectedSuggestionHandle(index)}
                                    key={index}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: theme.color.gray100,
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 50,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <LocationIcon
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                        fill: theme.color.black
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    gap: 4,
                                                    width: screenWidth - theme.screen.horizontalPadding - theme.screen.horizontalPadding - 23 - 30 - 20 - 10
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: theme.color.black,
                                                        fontSize: 14,
                                                        fontFamily: theme.font.medium,

                                                    }}
                                                >{item.description}</Text>
                                                <Text
                                                    style={{
                                                        color: theme.color.gray300,
                                                        fontSize: 12,
                                                        fontFamily: theme.font.medium
                                                    }}
                                                >{item.types[0] === "administrative_area_level_1" ? "State" : item.types[0] === "locality" ? "City" : item.types[0] === "sublocality_level_1" ? "Area" : item.types[0] === "postal_code" ? "Postal Code" : item.types[0] === "country" ? "Country" : "Place"}</Text>
                                            </View>
                                        </View>
                                        <LeftArrow
                                            style={{
                                                width: 23,
                                                height: 23,
                                                transform: [{rotate: '33deg'}],
                                                fill: theme.color.black,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: screenWidth - 30 - 10 - 40,
                                            backgroundColor: theme.color.gray100,
                                            height: 1,
                                            alignSelf: "flex-end",
                                            marginTop: 8,
                                            marginBottom: 10
                                        }}
                                    >
                                    </View>
                                </Pressable>
                            )
                        })
                    }


                </View>
                <StatusBar backgroundColor={"white"} barStyle={'dark-content'}/>
            </View>
        </SafeAreaView>
    )
}

export default Search
