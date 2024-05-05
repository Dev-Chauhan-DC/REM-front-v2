import {View, Text, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme';
import StepsBottom from '../../components/StepsBottom';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import SearchWithSuggestions from '../../components/SearchWithSuggestions';
import {useRecoilState} from 'recoil';
import {mapRegionState, regionState} from '../../atoms/listing/second';
import {debounce} from 'lodash';


const Second = () => {
    const navigation = useNavigation();

    const [region, setRegion] = useRecoilState(regionState);
    const [mapRegion, setMapRegion] = useRecoilState(mapRegionState);
    const [error, setError] = useState('');

    const debouncedHandleRegionChange = debounce((newRegion) => {
        setMapRegion(newRegion);
    }, 200);

    const handleMapPress = async (event) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        setRegion({
            ...region,
            latitude,
            longitude,
        });
    };

    const handleRegionChange = (i) => {
        debouncedHandleRegionChange(i);
    };

    const searchResultHandle = async (data) => {

        setMapRegion({
            latitude: data.location.lat,
            longitude: data.location.lng,
            latitudeDelta: data.viewport.northeast.lat - data.viewport.southwest.lat,
            longitudeDelta: data.viewport.northeast.lng - data.viewport.southwest.lng,
        });

    };

    const nextButtonHandle = async () => {

        if (!region.longitude && !region.latitude) {
            setError('Please press on map to locate your property');
            return;
        }
        navigation.navigate('third');
    };


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
                }}
            >

                <ScrollView
                    style={{
                        backgroundColor: "white"
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: theme.screen.horizontalPadding,
                            paddingTop: theme.screen.paddingTop,
                        }}
                    >

                        <View
                            style={{
                                gap: 20,
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                }}
                            >
                                <SearchWithSuggestions
                                    searchResult={searchResultHandle}
                                />
                            </View>
                            <View
                                style={{
                                    height: 500,
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                    marginTop: 60,
                                    zIndex: -1,
                                }}
                            >

                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={{
                                        height: '100%',
                                        borderRadius: 5,
                                    }}
                                    region={mapRegion}
                                    initialRegion={region}
                                    onPress={handleMapPress}
                                    onRegionChange={handleRegionChange}
                                >
                                    <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>

                                </MapView>
                            </View>

                        </View>
                        <Text
                            style={{
                                color: theme.color.primary,
                                fontFamily: theme.font.semiBold,
                                fontSize: 14,
                                marginTop: 10,
                            }}
                        >latitude:

                            <Text style={{
                                color: theme.color.black,
                            }}> {region.latitude}</Text>
                        </Text>
                        <Text
                            style={{
                                color: theme.color.primary,
                                fontFamily: theme.font.semiBold,
                                fontSize: 14,
                                marginTop: 10,
                            }}
                        >longitude:

                            <Text style={{
                                color: theme.color.black,
                            }}> {region.longitude}</Text>
                        </Text>

                        {
                            error
                                ?
                                <Text
                                    style={{
                                        color: theme.color.locationRed,
                                        fontFamily: theme.font.medium,
                                        fontSize: 16,
                                        marginTop: 16,
                                    }}
                                >{error}</Text>
                                :
                                <></>
                        }


                    </View>

                </ScrollView>
                <StepsBottom
                    onNextPress={() => nextButtonHandle()}
                    stepCount={5}
                    currentStep={2}
                />
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
            </View>
        </SafeAreaView>
    );
};

export default Second;
