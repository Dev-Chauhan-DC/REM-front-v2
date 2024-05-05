import {
    View,
    useWindowDimensions,
    ScrollView,
    StatusBar,
    ToastAndroid,
    Text,
    BackHandler,
    SafeAreaView, Platform, Pressable, Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TebNavigation from '../../components/TebNavigation';
import IconButton from '../../components/IconButton';
import theme from '../../theme';
import PropertyCard from '../../components/PropertyCard';
import BottomSheet from '../../components/BottomSheet';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import ListSelect from '../../components/ListSelect';
import apis from '../../apis/apis';
import calculateDaysAgo from '../../utilities/calculateDaysAgo';
import LoadingCard from '../../components/LoadingCard';
import queryString from '../../utilities/queryString/queryString';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import DeleteIcon from "../../assets/svgs/DeleteIcon";
import {debounce} from 'lodash';

const Like = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const [sortAndCompareBarHeight, setSortAndCompareBarHeight] = useState(0);
    const [tebNavigationHeight, setTebNavigationHeight] = useState(0);
    const [isActiveCompare, setIsActiveCompare] = useState(false);
    const [isShowSort, setIsShowSort] = useState(false);
    const [properties, setProperties] = useState([]);
    const [comparePropertiesId, setComparePropertiesId] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [filterString, setFilterString] = useState('');
    const [loadingCardArrray, setLoadingCardArrray] = useState([0, 0, 0, 0, 0, 0]);
    const [page, setPage] = useState(1);
    const [compareBottomHeight, setCompareBottomHeight] = useState(0)

    const screenHeight = useWindowDimensions().height;
    const screenWidth = useWindowDimensions().width;
    const navigation = useNavigation();

    const getSavedProperties = async () => {
        try {

            const response = await apis.getSavedProperty(filterString);

            setProperties([...properties, ...response?.data?.data]);

        } catch (e) {
            console.warn(e?.response?.data?.message || 'Something went wrong');
        }
    };

    const debouncedFunction = debounce(() => {
        setPage(page + 1);
        const newStr = queryString.set(filterString, 'page', page + 1);
        setFilterString(newStr);
    }, 500)

    const handleScroll = (event) => {
        const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        if (distanceFromBottom < 1) {
            debouncedFunction()
        }
    };

    const savePropertyHandle = async (id, index) => {
        try {
            const response = await apis.saveProperty(id);

            let propertyArray = [...properties];

            propertyArray.splice(index, 1);
            setProperties(propertyArray);
        } catch (e) {
            if (Platform.OS === 'ios') {
                Alert.alert('', `${e?.response?.data?.message || 'Something went wrong'}`, [
                    {text: 'OK', onPress: () => null},
                ]);

                return;
            }
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
            return;
        }
    };

    const compareHandle = i => {
        if (comparePropertiesId.length === 3 && !comparePropertiesId.includes(i)) {
            if(Platform.OS === 'ios'){
                Alert.alert('', 'Maximum 3', [
                    {text: 'OK',onPress: () => null}
                ])

                return;
            }
            ToastAndroid.show("Maximum 3", ToastAndroid.SHORT)

            return;
        }

        let array = [...comparePropertiesId];
        if (array.length >= 0 && array.includes(i)) {
            const newArray = array.filter(item => item !== i);
            setComparePropertiesId([...newArray]);

        } else if (array.length >= 0 && !array.includes(i)) {
            let array2 = [...comparePropertiesId];
            array2.push(i);
            setComparePropertiesId([...array2]);
        }
    };

    const compareButtonHandle = async () => {
        try {
            let resultString = comparePropertiesId.join(',');

            const response = await apis.getPropertiesById(resultString);
            if (response && response.data && response.data.data.length > 0) {
                navigation.navigate('compare', {data: response.data.data});
            }
        } catch (e) {
            if (Platform.OS === 'ios') {
                Alert.alert('', `${e?.response?.data?.message || 'Something went wrong'}`, [
                    {text: 'OK', onPress: () => null},
                ]);

                return;
            }
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
            return;
        }
    };

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
            const newStr = queryString.set(`?${string}`, 'page', '1');
            setFilterString(newStr);
        } else if (filterString.length > 0) {
            if (filterString.includes('sorting')) {
                const array = filterString.split('&');
                if (array.length === 1) {
                    const array2 = array[0].split('?');
                    array2[1] = string;
                    const newStr = queryString.set(`?${array2[1]}`, 'page', '1');
                    setFilterString(newStr);
                } else {
                    const array = filterString.split('&');
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].includes('sorting')) {
                            array[i] = string;
                        }
                    }
                    const strNew = array.join('&');

                    const newStr = queryString.set(strNew, 'page', '1');
                    setFilterString(newStr);
                }
            } else {

                const newStr = queryString.set(`${filterString}&${string}`, 'page', '1');
                setFilterString(newStr);
            }
        }

        setIsShowSort(false);
    };

    const backAction = () => {
        if (isShowSort) {
            setIsShowSort(false);
            return true;
        }
        if (isActiveCompare) {
            setIsActiveCompare(false);
            setComparePropertiesId([])
            return true;
        }
        return false;
    };

    useEffect(() => {

        getSavedProperties();
    }, [filterString]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [isShowSort, isActiveCompare]);

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
                    backgroundColor: 'white',
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}>
                <View
                    onLayout={({nativeEvent}) =>
                        setSortAndCompareBarHeight(nativeEvent.layout.height)
                    }
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}>
                    {/*<IconButton name={'sort'} onPress={() => setIsShowSort(true)}/>*/}
                    <IconButton
                        onPress={() => {
                            isActiveCompare ? setComparePropertiesId([]) : null
                            setIsActiveCompare(!isActiveCompare);

                        }}
                        name={'compare'}
                    />
                </View>

                <View
                    style={{
                        height:
                            screenHeight -
                            sortAndCompareBarHeight -
                            tebNavigationHeight -
                            theme.screen.paddingTop -
                            10 - compareBottomHeight - safeRemovedTotalHeightIos,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                    <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false}>

                        {properties && properties.length !== 0 ? (
                            properties.map((i, index) => {
                                return (
                                    <PropertyCard
                                        isLikeActive={i.length === 0 ? false : true}
                                        onHeartClick={() => savePropertyHandle(i.property.id, index)}
                                        onPress={() =>
                                            navigation.navigate('propertyInfo', {
                                                propertyId: i.property.id,
                                            })
                                        }
                                        ShowLikeButton={true}
                                        images={
                                            i.property.property_photos[0] &&
                                            i.property.property_photos[0].photos
                                                ? i.property.property_photos[0].photos
                                                : null
                                        }
                                        days={`${calculateDaysAgo(i.property.createdAt)}`}
                                        listedBy={i?.user?.user_role?.role || 0}
                                        address={i.property.address}
                                        sqft={i.property.built_up_area}
                                        kitchen={i.property.kitchen_count}
                                        hall={i.property.hall_count}
                                        bath={i.property.bathroom_count}
                                        price={i.property.price}
                                        bad={i.property.bedroom_count}
                                        key={index}
                                        style={{marginBottom: 20}}
                                        showCompare={isActiveCompare}
                                        onComparePress={() => compareHandle(i.property.id)}
                                        compareArray={comparePropertiesId}
                                        propertyId={i.property.id}
                                    />
                                );
                            })
                        ) : (
                            loadingCardArrray.map((i, index) => {
                                return (
                                    <LoadingCard
                                        style={{
                                            marginBottom: 20,
                                        }}
                                        key={index}
                                    />
                                );
                            })
                        )}
                    </ScrollView>
                </View>


                <View
                    onLayout={(e)=> setCompareBottomHeight(e.nativeEvent.layout.height)}
                    style={{
                        display: isActiveCompare ? "flex" : "none",
                        position: "absolute",
                        bottom: tebNavigationHeight,
                        left: 0,
                        backgroundColor: "white",
                        width: screenWidth,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: theme.screen.horizontalPadding,
                        elevation: 20
                    }}
                >
                    <Pressable onPress={() => setIsActiveCompare(false)}>
                        <DeleteIcon
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </Pressable>
                    <ButtonComponent
                        onPress={compareButtonHandle}
                        title={'Compare'}
                        style={{
                            backgroundColor: theme.color.black,
                            height: 40,
                            paddingHorizontal: 50,
                            marginVertical: 10,
                        }}
                        titleStyle={{
                            fontSize: 16,
                        }}
                    />
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

                <TebNavigation
                    style={{
                        display: isActiveCompare ? "none" : "flex"
                    }}
                    onLayout={i => setTebNavigationHeight(i.layout.height)}/>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
            </View>
        </SafeAreaView>
    );
};

export default Like;
