import { View, Text, Pressable } from 'react-native'
import React from 'react'
import theme from '../theme'
import Mapview from '../assets/svgs/Mapview'
import FilterIcon from '../assets/svgs/FilterIcon'
import SearchIcon from '../assets/svgs/SearchIcon'
import { useNavigation, useRoute } from '@react-navigation/native'
import ListIcon from '../assets/svgs/ListIcon'

const SearchHeader = ({ style, onLayout, searchValue, currentView, onMapViewPress, onListViewPress, onFilterPress }) => {

    const navigation = useNavigation();

    return (
        <View
            onLayout={({ nativeEvent }) => onLayout ? onLayout(nativeEvent) : null}
            style={{
                ...style,
                flexDirection: "row",
                gap: 7
            }}>

            {
                currentView === "map"
                    ?
                    <Pressable
                        onPress={() => onListViewPress ? onListViewPress() : null}
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white"

                        }}
                    >
                        <ListIcon
                            style={{
                                fill: theme.color.black,
                                width: 18,
                                height: 18
                            }} />

                    </Pressable>
                    :
                    <Pressable
                        onPress={() => onMapViewPress ? onMapViewPress() : null}
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white"

                        }}
                    >
                        <Mapview
                            style={{
                                fill: theme.color.black,
                                width: 18,
                                height: 18
                            }} />
                    </Pressable>
            }



            <Pressable
                onPress={() => { navigation.navigate("search") }}
                style={{
                    flex: 1,
                    backgroundColor: theme.color.gray100,
                    borderRadius: 30,
                    alignItems: "center",
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    gap: 15,
                    overflow: "hidden"
                }}
            >
                <SearchIcon
                    style={{
                        width: 16,
                        height: 16,
                        fill: theme.color.black,
                    }}
                />
                <Text
                    numberOfLines={1}

                    style={{
                        color: theme.color.black,
                        fontFamily: theme.font.medium,
                        overflow: "scroll",
                        flex: 1
                    }}
                >{searchValue ? searchValue : "Search Anything"}</Text>
            </Pressable>
            <Pressable
                onPress={() => onFilterPress ? onFilterPress() : null}
                style={{
                    width: 35,
                    height: 35,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",



                }}
            >

                <FilterIcon
                    style={{
                        fill: theme.color.black,
                        width: 18,
                        height: 18
                    }} />
            </Pressable>
        </View>
    )
}

export default SearchHeader