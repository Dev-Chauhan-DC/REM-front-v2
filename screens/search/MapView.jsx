import {View, Text, ToastAndroid, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../../theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import formatPropertyPrice from '../../utilities/formatPropertyPrice';
import apis from '../../apis/apis';
import {useRecoilState} from 'recoil';
import {
    filterStringState,
    mapPropertiesState,
    northeastLatState,
    northeastLngState,
    southwestLatState,
    southwestLngState,
} from '../../atoms/search';
import queryString from '../../utilities/queryString/queryString';


const MapViewScreen = ({onMarkerPressHandle}) => {

    const [northeastLat, setNortheastLat] = useRecoilState(northeastLatState);
    const [southwestLat, setSouthwestLat] = useRecoilState(southwestLatState);
    const [northeastLng, setNortheastLng] = useRecoilState(northeastLngState);
    const [southwestLng, setSouthwestLng] = useRecoilState(southwestLngState);
    const [filterString, setFilterString] = useRecoilState(filterStringState);
    const [mapProperties, setMapProperties] = useRecoilState(mapPropertiesState);
    const [apiCallLoading, setApiCallLoading] = useState(false)

    const mapSearchHandle = async () => {
        try {
            setApiCallLoading(true)

            const newFilterString = queryString.set(filterString, 'view', 'map');

            let data = {
                swlat: southwestLat,
                swlong: southwestLng,
                nelat: northeastLat,
                nelong: northeastLng,
                filters: newFilterString,
            };

            const response = await apis.getSearchResults(data);

            setMapProperties(response?.data?.data);
            setApiCallLoading(false)

        } catch (e) {
            setApiCallLoading(false)
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);

        }
    };


    useEffect(() => {
        mapSearchHandle();
    }, [filterString, southwestLng]);


    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{height: '100%'}}
                region={{
                    latitude: (northeastLat + southwestLat) / 2,
                    longitude: (northeastLng + southwestLng) / 2,
                    latitudeDelta: Math.abs(northeastLat - southwestLat),
                    longitudeDelta: Math.abs(northeastLng - southwestLng),
                }}
            >
                {
                    mapProperties ? mapProperties.map((i, index) => {
                        return (
                            <Marker
                                onPress={() => onMarkerPressHandle(i?.id)}
                                key={index}
                                coordinate={{latitude: i.latitude, longitude: i.longitude}}

                            >
                                <View
                                    style={{
                                        backgroundColor: theme.color.locationRed,
                                        borderRadius: 5,
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
                                        position: 'relative',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 12,
                                            fontFamily: theme.font.semiBold,
                                        }}
                                    >
                                        ₹{formatPropertyPrice(i.price)}
                                    </Text>
                                </View>
                            </Marker>
                        );
                    }) : <></>
                }
            </MapView>

            {
                apiCallLoading ?
                    <ActivityIndicator
                        color={theme.color.primary}
                        style={{

                            position: 'absolute',
                            zIndex: 10000,
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'white',
                            margin: 20,
                            padding: 5,
                            borderRadius: 50,
                        }}
                    />
                    :
                    <></>
            }

        </View>

    );
};

export default MapViewScreen;
