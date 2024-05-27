import {Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import theme from '../theme'
import LocationIcon from '../assets/svgs/LocationIcon'
import googleApis from '../apis/googleApis'
import {debounce} from 'lodash';


const SearchWithSuggestions = ({searchResult}) => {

    const [suggestions, setSuggestions] = useState([])
    const [isSuggestion, setIsSuggestion] = useState(false)
    const [inputValue, setInputValue] = useState("")



    const searchHandle = async (i) => {
        setInputValue(i)


        const debouncedFunction = debounce(async () => {

            const response = await googleApis.googlePlaceAutoComplateApi(i);
            if (response && response.data && response.data.predictions) {
                setSuggestions(response.data.predictions);
                setIsSuggestion(true);
            }
        }, 500);

        debouncedFunction();

    }


    const seledtedSuggestionHandle = async (index) => {
        const placeId = suggestions[index].place_id
        const response = await googleApis.googlePlaceDetails(placeId)


        const data = {
            location: response.data.result.geometry.location,
            viewport: response.data.result.geometry.viewport,
            address: response.data.result.formatted_address,
        }
        searchResult ? searchResult(data) : null;

        setIsSuggestion(false)
        setInputValue(data.address)
    }


    return (
        <View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 20,
                    elevation: 5,
                    overflow: "hidden",
                    paddingHorizontal: 10,
                    borderWidth: Platform.OS === "ios" ? 1 : 0,
                    borderColor: theme.color.gray200
                }}
            >
                <TextInput
                    cursorColor={theme.color.primary}
                    value={inputValue}
                    onChangeText={searchHandle}
                    placeholderTextColor={theme.color.gray300}
                    placeholder='Search your area'
                    style={{
                        paddingHorizontal: 20,
                        fontFamily: theme.font.medium,
                        height: 45,
                        color: theme.color.black
                    }}
                />


                <View
                    style={{
                        paddingBottom: 10,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: theme.color.gray100,
                        display: isSuggestion && suggestions.length !== 0 ? "" : "none",
                    }}
                >
                    {
                        suggestions.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => seledtedSuggestionHandle(index)}
                                    key={index}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center"
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
                                                marginEnd: 10
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
                                                flex: 1,
                                                paddingVertical: 8
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: theme.color.black,
                                                    fontFamily: theme.font.medium,
                                                    fontSize: 12,
                                                    marginBottom: 2
                                                }}
                                            >{item.description}</Text>
                                            <Text
                                                style={{
                                                    color: theme.color.gray300,
                                                    fontFamily: theme.font.medium,
                                                    fontSize: 10
                                                }}
                                            >{item.types[0] === "administrative_area_level_1" ? "State" : item.types[0] === "locality" ? "City" : item.types[0] === "sublocality_level_1" ? "Area" : item.types[0] === "postal_code" ? "Postal Code" : item.types[0] === "country" ? "Country" : "Place"}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    }


                </View>

            </View>
        </View>
    )
}

export default SearchWithSuggestions
