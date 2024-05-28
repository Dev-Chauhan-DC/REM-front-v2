import {
    View,
    useWindowDimensions,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    ToastAndroid,
    BackHandler, Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchHeader from '../../components/SearchHeader';
import theme from '../../theme';
import TebNavigation from '../../components/TebNavigation';
import BottomSheet from '../../components/BottomSheet';
import PropertyCard from '../../components/PropertyCard';
import {useNavigation} from '@react-navigation/native';
import apis from '../../apis/apis';
import calculateDaysAgo from '../../utilities/calculateDaysAgo';
import MapViewScreen from './MapView';
import ListView from './ListView';
import Sidebar from '../../components/Sidebar';
import Filter from './Filter';
import ListSelect from '../../components/ListSelect';
import {useRecoilState} from 'recoil';
import {
    filterStringState, latitudeState, longitudeState,
    northeastLatState,
    northeastLngState, pageState, propertiesState, propertyCardDataState, searchQueryState,
    southwestLatState,
    southwestLngState,
} from '../../atoms/search';
import qs from '../../utilities/queryString/queryString';
import queryString from '../../utilities/queryString/queryString';
import {useSafeAreaInsets} from 'react-native-safe-area-context';




const Home = () => {
    const screenHeight = useWindowDimensions().height;
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;


    const [searchHeaderHeight, setSearchHeaderHeight] = useState(0);
    const [tebNavigationHeight, setTebNavigationHeight] = useState(0);
    const [isPropertyModelShow, setIsPropertyModelShow] = useState(false);
    const [currentView, setCurrentView] = useState('map');
    const [isShowSort, setIsShowSort] = useState(false);
    const [northeastLat, setNortheastLat] = useRecoilState(northeastLatState);
    const [southwestLat, setSouthwestLat] = useRecoilState(southwestLatState);
    const [northeastLng, setNortheastLng] = useRecoilState(northeastLngState);
    const [southwestLng, setSouthwestLng] = useRecoilState(southwestLngState);
    const [latitude, setLatitude] = useRecoilState(latitudeState);
    const [longitude, setLongitude] = useRecoilState(longitudeState);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [isFilterShow, setIsFilterShow] = useState(false);
    const [filterString, setFilterString] = useRecoilState(filterStringState);
    const [selectedItem, setSelectedItem] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [properties, setProperties] = useRecoilState(propertiesState);
    const [page, setPage] = useRecoilState(pageState);
    const [propertyCardData, setPropertyCardData] = useRecoilState(propertyCardDataState);

    const navigation = useNavigation();

    const getSearchResults = async () => {
        try {
            setIsLoading(true);

            let data = {
                swlat: southwestLat,
                swlong: southwestLng,
                nelat: northeastLat,
                nelong: northeastLng,
                filters: filterString,
            };

            const response = await apis.getSearchResults(data);
            setCurrentUserId(response?.data?.currentUserId);
            setProperties(response?.data?.data || properties);
            setIsLoading(false);
        } catch (e) {
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };

    const filterNavHandle = () => setIsFilterShow(true);

    const filterSelectHandle = async (i, index) => {

        setProperties([]);
        setPage(1);

        setSelectedItem(index);
        let string = '';
        if (index === 0) {
            string = 'sorting=relevance';
        } else if (index === 1) {
            string = 'sorting=newest';
        } else if (index === 2) {
            string = 'sorting=price-highToLow';
        } else if (index === 3) {
            string = 'sorting=price-lowToHigh';
        } else if (index === 4) {
            string = 'sorting=built_up_area-lowToHigh';
        } else if (index === 5) {
            string = 'sorting=built_up_area-highToLow';
        } else if (index === 6) {
            string = 'sorting=bedroom_count-lowToHigh';
        } else if (index === 7) {
            string = 'sorting=bedroom_count-highToLow';
        } else if (index === 8) {
            string = 'sorting=bathroom_count-lowToHigh';
        } else if (index === 9) {
            string = 'sorting=bathroom_count-highToLow';
        } else if (index === 10) {
            string = 'sorting=hall_count-lowToHigh';
        } else if (index === 11) {
            string = 'sorting=hall_count-highToLow';
        } else if (index === 12) {
            string = 'sorting=kitchen_count-lowToHigh';
        } else if (index === 13) {
            string = 'sorting=kitchen_count-highToLow';
        }

        if (filterString === '') {

            const newStr = qs.set(`?${string}`, 'page', '1');
            setFilterString(newStr);
        } else if (filterString.length > 0) {
            if (filterString.includes('sorting')) {
                const array = filterString.split('&');
                if (array.length === 1) {
                    const array2 = array[0].split('?');
                    array2[1] = string;

                    const newStr = qs.set(`?${array2[1]}`, 'page', '1');
                    setFilterString(newStr);
                } else {
                    const array = filterString.split('&');
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].includes('sorting')) {
                            array[i] = string;
                        }
                    }
                    const strNew = array.join('&');

                    const newStr = qs.set(strNew, 'page', '1');
                    setFilterString(newStr);
                }
            } else {
                const newStr = qs.set(`${filterString}&${string}`, 'page', '1');
                setFilterString(newStr);
            }
        }

        setIsShowSort(false);
    };

    const onMarkerPressHandle = async (id) => {
        try {
            if (id) {
                const newQueryString = queryString.set(filterString, 'view', 'card');
                const response = await apis.getPropertyById(parseInt(id), newQueryString);
                setPropertyCardData(response?.data?.data);
            }
            setIsPropertyModelShow(true);
        } catch (e) {
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
        }
    };

    const backAction = () => {
        if (isFilterShow) {
            setIsFilterShow(false);
            return true;
        }
        if (isPropertyModelShow) {
            setIsPropertyModelShow(false);
            return true;
        }
        if (isShowSort) {
            setIsShowSort(false);
            return true;
        }
        return false;
    };

    useEffect(() => {


        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [isFilterShow, isPropertyModelShow, isShowSort]);

    return (
        <SafeAreaView

            style={{
                flex: 1,
                backgroundColor: "white",
            }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        paddingTop: theme.screen.paddingTop,
                    }}>
                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                        }}>
                        <SearchHeader
                            onFilterPress={filterNavHandle}
                            searchValue={
                                searchQuery ? searchQuery : 'Search Anything'
                            }
                            onLayout={i => setSearchHeaderHeight(i.layout.height)}
                            onMapViewPress={() => setCurrentView('map')}
                            onListViewPress={() => setCurrentView('list')}
                            currentView={currentView}
                        />
                    </View>

                    <View
                        style={{
                            height:
                                screenHeight -
                                searchHeaderHeight -
                                tebNavigationHeight -
                                theme.screen.paddingTop -
                                10 - safeRemovedTotalHeightIos,
                            marginTop: 10,
                            position: 'relative',
                        }}>
                        {currentView === 'map' ? (
                            <View>
                                {isLoading ? (
                                    <ActivityIndicator
                                        color={theme.color.primary}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 10000,
                                            top: 0,
                                            left: 0,
                                            backgroundColor: '#ffffffb8',
                                            margin: 20,
                                            padding: 5,
                                            borderRadius: 50,
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                                <MapViewScreen
                                    latitude={latitude}
                                    longitude={longitude}
                                    northeastLat={northeastLat}
                                    southwestLat={southwestLat}
                                    northeastLng={northeastLng}
                                    southwestLng={southwestLng}
                                    properties={properties}
                                    onMarkerPressHandle={(i) => onMarkerPressHandle(i)}
                                />
                            </View>
                        ) : (
                            <ListView
                                currentUserId={currentUserId}
                                isLoading={isLoading}
                                onSortPress={() => setIsShowSort(true)}
                                getSearchResults={getSearchResults}
                                screenHeight={screenHeight}
                                searchHeaderHeight={searchHeaderHeight}
                                tebNavigationHeight={tebNavigationHeight}
                                properties={properties}
                            />
                        )}
                    </View>

                </View>


                <BottomSheet
                    showBackgroundBlur={true}
                    isShow={isShowSort}
                    outsideClick={() => setIsShowSort(false)}>
                    <View>
                        <ListSelect
                            selectedItem={selectedItem}
                            style={{
                                marginBottom: 10,
                            }}
                            selected={(i, j) => {
                                filterSelectHandle(i, j);
                            }}
                            items={[
                                'Relevance',
                                'Newest',
                                'High to Low (Price)',
                                'Low to High (Price)',
                                'Low to High (sqrt)',
                                'High to Low (sqrt)',
                                'Low to High (Bedroom)',
                                'High to Low (Bedroom)',
                                'Low to High (Bathroom)',
                                'High to Low (Bathroom)',
                                'Low to High (Hall)',
                                'High to Low (Hall)',
                                'Low to High (Kitchen)',
                                'High to Low (Kitchen)',
                            ]}
                        />
                    </View>

                </BottomSheet>


                <BottomSheet
                    outsideClick={() => setIsPropertyModelShow(false)}
                    showBackgroundBlur={true}
                    style={{
                        marginBottom: tebNavigationHeight,
                        paddingHorizontal: 12,
                    }}
                    isShow={isPropertyModelShow}
                >
                    <PropertyCard
                        days={`${calculateDaysAgo(propertyCardData?.createdAt)}`}
                        images={propertyCardData?.property_photos?.[0]?.photos || ''}
                        price={propertyCardData?.price || ''}
                        bad={propertyCardData?.bedroom_count || ''}
                        bath={propertyCardData?.bathroom_count || ''}
                        hall={propertyCardData?.hall_count || ''}
                        kitchen={propertyCardData?.kitchen_count || ''}
                        sqft={propertyCardData?.built_up_area || ''}
                        address={propertyCardData?.address || ''}
                        listedBy={propertyCardData?.user?.user_roles_id in {
                            0: 'User',
                            1: 'User',
                            2: 'Builder',
                            3: 'Agent',
                        } ?
                            {
                                0: 'User',
                                1: 'User',
                                2: 'Builder',
                                3: 'Agent'
                            }[propertyCardData.user.user_roles_id] : 'Agent'}
                        ShowLikeButton={false}
                        onPress={() => navigation.navigate('propertyInfo', {propertyId: propertyCardData.id})}
                    />
                </BottomSheet>
                <TebNavigation onLayout={i => setTebNavigationHeight(i.layout.height)}/>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
                <Sidebar isShow={isFilterShow}>
                    <Filter
                        onCancelPress={() => setIsFilterShow(false)}
                        onFilterApply={str => {
                            setProperties([]);
                            setPage(1);
                            const newStr = qs.set(str, 'page', '1');
                            setFilterString(newStr);
                            setIsFilterShow(false);
                        }}
                    />
                </Sidebar>
            </View>
        </SafeAreaView>
    );
};

export default Home;
