import {
    View,
    ScrollView, ToastAndroid, Text, Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconButton from '../../components/IconButton';
import PropertyCard from '../../components/PropertyCard';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import calculateDaysAgo from '../../utilities/calculateDaysAgo';
import apis from '../../apis/apis';
import LoadingCard from '../../components/LoadingCard';
import {useRecoilState} from 'recoil';
import {
    filterStringState,
    northeastLatState,
    northeastLngState, pageState, propertiesState,
    southwestLatState,
    southwestLngState,
} from '../../atoms/search';
import qs from '../../utilities/queryString/queryString.js';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {debounce} from 'lodash';

const ListView = ({
                      screenHeight,
                      searchHeaderHeight,
                      tebNavigationHeight,
                      onSortPress,
                      currentUserId,

                  }) => {
    const [iconButtonHeight, setIconButtonHeight] = useState(0);

    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const [apiCallLoading, setApiCallLoading] = useState(false);
    const [page, setPage] = useRecoilState(pageState);

    const [northeastLat, setNortheastLat] = useRecoilState(northeastLatState);
    const [southwestLat, setSouthwestLat] = useRecoilState(southwestLatState);
    const [northeastLng, setNortheastLng] = useRecoilState(northeastLngState);
    const [southwestLng, setSouthwestLng] = useRecoilState(southwestLngState);
    const [filterString, setFilterString] = useRecoilState(filterStringState);
    const [properties, setProperties] = useRecoilState(propertiesState);


    const navigation = useNavigation();

    const savePropertyHandle = async (id, index) => {
        try {

            let tempArray = JSON.parse(JSON.stringify(properties));
            if(properties[index].saved_properties.length){

                tempArray[index].saved_properties = []
                setProperties(tempArray)

            }else{
                tempArray[index].saved_properties.push("1")
                setProperties(tempArray)

            }
            const response = await apis.saveProperty(id);
        } catch (e) {
            console.warn(e?.response?.data?.message || 'Something went wrong');
        }
    };

    const debouncedFunction = debounce(() => {
        setPage(page + 1);
        const newStr = qs.set(filterString, 'page', page + 1);
        setFilterString(newStr);
    }, 500);

    const handleScroll = (event) => {
        const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        if (distanceFromBottom < 1) {
            debouncedFunction()
        }
    };


    const listSearchHandle = async () => {
        try {
            setApiCallLoading(true)


            let data = {
                swlat: southwestLat,
                swlong: southwestLng,
                nelat: northeastLat,
                nelong: northeastLng,
                filters: filterString,
            };

            const response = await apis.getSearchResults(data);

            setProperties([...properties, ...response?.data?.data]);

            setApiCallLoading(false)


        } catch (e) {
            setApiCallLoading(false)
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);

        }
    };


    useEffect(() => {

        listSearchHandle();
    }, [filterString, southwestLng]);


    return (
        <View
            style={{
                paddingHorizontal: theme.screen.horizontalPadding,
            }}>
            <IconButton
                onLayout={i => setIconButtonHeight(i.layout.height)}
                onPress={() => (onSortPress ? onSortPress() : null)}
                name={'sort'}
                style={{
                    marginBottom: 10,
                }}
            />
            <View
                style={{
                    height:
                        screenHeight -
                        tebNavigationHeight -
                        searchHeaderHeight -
                        iconButtonHeight -
                        10 -
                        theme.screen.paddingTop -
                        10 - safeRemovedTotalHeightIos,
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                <ScrollView
                    onScroll={handleScroll}
                    showsVerticalScrollIndicator={false}>
                    {apiCallLoading ? (
                        [0,0,0,0,0].map((i, index) => {
                            return (
                                <LoadingCard
                                    style={{
                                        marginBottom: 20,
                                    }}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <></>
                    )}
                    {properties && properties.length !== 0 ? (
                        properties.map((i, index) => {
                            let isSaved = false;
                            return (
                                <PropertyCard
                                    isLikeActive={i?.saved_properties?.length ? true : false}
                                    onHeartClick={() => savePropertyHandle(i?.id, index)}
                                    onPress={() =>
                                        navigation.navigate('propertyInfo', {propertyId: i.id})
                                    }
                                    ShowLikeButton={true}
                                    images={
                                        i.property_photos[0] && i.property_photos[0].photos
                                            ? i.property_photos[0].photos
                                            : null
                                    }
                                    days={`${calculateDaysAgo(i.createdAt)}`}
                                    listedBy={i?.user?.user_role?.role || 'user'}
                                    address={i.address}
                                    sqft={i.built_up_area}
                                    kitchen={i.kitchen_count}
                                    hall={i.hall_count}
                                    bath={i.bathroom_count}
                                    price={i.price}
                                    bad={i.bedroom_count}
                                    key={index}
                                    style={{marginBottom: 20}}
                                />
                            );
                        })
                    ) : (
                        <Text
                            style={{
                                color: theme.color.black,
                                textTransform: "capitalize",
                                fontFamily: theme.font.semiBold,

                            }}
                        >
                           no property found
                        </Text>

                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default ListView;
