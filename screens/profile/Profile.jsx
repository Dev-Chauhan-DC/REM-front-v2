import {
    View,
    Text,
    Pressable,
    ScrollView,
    useWindowDimensions,
    Alert,
    Linking, StatusBar, ToastAndroid, BackHandler, SafeAreaView, Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import TebNavigation from '../../components/TebNavigation';
import RightHalfArrow from '../../assets/svgs/RightHalfArrow';
import ButtonComponent from '../../components/ButtonComponent';
import PropertyCard from '../../components/PropertyCard';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import PhoneIcon from '../../assets/svgs/PhoneIcon';
import apis from '../../apis/apis';
import calculateDaysAgo from '../../utilities/calculateDaysAgo';
import { formatPhoneNumber } from '../../utilities/formatPhoneNumber';
import LoadingCard from '../../components/LoadingCard';
import qs from '../../utilities/queryString/queryString';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/profile/user';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";

const Profile = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const [tebNavigationHeight, setTebNavigation] = useState(0);
    const [listPropertyButtonHeight, setListPropertyButton] = useState(0);
    const [profileBarHeight, setProfileBarHeight] = useState(0);
    const [interestedPeopleSheet, setInterestedPeopleSheet] = useState(false);
    const [userProperties, setUserProperties] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const [interestedPeoples, setInterestedPeoples] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [iPPage, setIPPage] = useState(1);
    const [currentIPOpenId, setCurrentIPOpenId] = useState(0);

    const screenHeight = useWindowDimensions().height;
    const navigation = useNavigation();

    const loadingCardArrray = [0, 0, 0, 0, 0, 0];



    const getUserProperties = async () => {
        try {


            const response = await apis.getUserProperties(query);
            if (response && response.data && response.data.data) {

                setUserProperties([...userProperties, ...response?.data?.data]);

            }
        } catch (e) {
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);

        }
    };

    const debouncedFunction = debounce(() => {
        setPage(page + 1);
        const newStr = qs.set(query, 'page', page + 1);
        setQuery(newStr);
    }, 500)

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        if (distanceFromBottom < 1) {
            debouncedFunction()
        }
    };

    const propertyDeleteHandle = async propertyId => {
        Alert.alert(
            'Delete Property',
            'Are you sure!!',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteProperty() },
            ],
            { cancelable: false },
        );

        const deleteProperty = async () => {
            try {
                const response = await apis.deleteProperty(propertyId);
                setUserProperties([])
                setPage(1)
                const newStr = qs.set(query, 'page', 1);
                setQuery(newStr);
                getUserProperties();
            } catch (e) {
                ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
            }
        };
    };

    const interestedPeopleHandle = async (propertyId, page) => {
        try {
            setCurrentIPOpenId(propertyId);
            setIPPage(1);
            const response = await apis.getInterestedPeople(propertyId, page);
            const data = response?.data?.data || [];
            setInterestedPeoples([...interestedPeoples, ...data]);
            setInterestedPeopleSheet(true);
        } catch (e) {
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
        }
    };

    const debouncedFunctionIP = debounce(async () => {
        await interestedPeopleHandle(currentIPOpenId, (iPPage + 1));
        setIPPage(iPPage + 1);
    }, 500)

    const handleScrollIP = async (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        if (distanceFromBottom < 1) {
            debouncedFunctionIP()

        }
    };

    const backAction = () => {
        if (interestedPeopleSheet) {
            setInterestedPeopleSheet(false);
            return true;
        }
        return false;
    };

    useEffect(() => {
        getUserProperties();
    }, [query]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [interestedPeopleSheet]);

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
                <Pressable
                    onPress={() => navigation.navigate('profileInfo')}
                    onLayout={({ nativeEvent }) =>
                        setProfileBarHeight(nativeEvent.layout.height)
                    }
                    style={{
                        backgroundColor: theme.color.gray100,
                        height: 80,
                        overflow: 'hidden',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}>

                        <View
                            style={{
                                gap: 2,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.semiBold,
                                }}>
                                {user && user.first_name && user.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : 'Update Name'}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: theme.color.gray300,
                                    fontFamily: theme.font.semiBold,
                                    textTransform: "capitalize"
                                }}>
                                {user?.user_role?.role || ""}
                            </Text>
                        </View>
                    </View>
                    <RightHalfArrow
                        style={{
                            width: 14,
                            height: 14,
                            fill: theme.color.gray300,
                        }}
                    />
                </Pressable>

                <ButtonComponent
                    onPress={() => navigation.navigate('first')}
                    onLayout={i => setListPropertyButton(i.layout.height)}
                    title={'List property'}
                    style={{
                        marginTop: 20,
                        backgroundColor: theme.color.black,
                    }}
                    titleStyle={{
                        fontFamily: theme.font.medium,
                    }}
                />

                <View
                    style={{
                        marginTop: 10,
                        height:
                            screenHeight -
                            tebNavigationHeight -
                            theme.screen.paddingTop -
                            20 -
                            listPropertyButtonHeight -
                            profileBarHeight -
                            10 - safeRemovedTotalHeightIos,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                    <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: theme.font.semiBold,
                                color: theme.color.black,
                                marginBottom: 20,
                                marginTop: 40,
                            }}>
                            Listed Properties
                        </Text>
                        {userProperties.length === 0 ? (
                            <LoadingCard
                                style={{
                                    marginBottom: 20,
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {isLoading ? (
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
                        ) : (
                            <></>
                        )}
                        {userProperties ? (
                            userProperties.map((i, index) => {
                                return (
                                    <PropertyCard
                                        onPress={() =>
                                            navigation.navigate('propertyInfo', { propertyId: i.id })
                                        }
                                        images={
                                            i.property_photos[0] && i.property_photos[0].photos
                                                ? i.property_photos[0].photos
                                                : null
                                        }
                                        onPressDelete={() => propertyDeleteHandle(i?.id || '')}
                                        days={`${calculateDaysAgo(i?.createdAt || '')}`}
                                        listedBy={i?.user?.user_role?.role || ''}
                                        address={i.address}
                                        sqft={i.built_up_area}
                                        kitchen={i.kitchen_count}
                                        hall={i.hall_count}
                                        bath={i.bathroom_count}
                                        price={i.price}
                                        bad={i.bedroom_count}
                                        key={index}
                                        onInterestedPeoplePress={() => interestedPeopleHandle(i.id)}
                                        ShowCloseButton={true}
                                        showInterestedPeopleButton={true}
                                        style={{ marginBottom: 20 }}
                                    />
                                );
                            })
                        ) : (
                            <Text>no property posted</Text>
                        )}
                    </ScrollView>
                </View>

                <BottomSheet
                    style={{
                        marginBottom: tebNavigationHeight,
                    }}
                    outsideClick={() => {
                        setInterestedPeopleSheet(false);
                        setInterestedPeoples([]);
                    }}
                    showBackgroundBlur={true}
                    isShow={interestedPeopleSheet}>
                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                            paddingTop: 30,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: theme.font.semiBold,
                                color: theme.color.black,
                                marginBottom: 36,
                            }}>
                            People who have seen your number
                        </Text>
                        <View style={{
                            maxHeight: 300,
                        }}>
                            <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScrollIP}>
                                <View
                                    style={{
                                        gap: 30,
                                        marginBottom: 20,
                                    }}>
                                    {interestedPeoples.length !== 0 ? (
                                        interestedPeoples.map((i, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            gap: 12,
                                                            alignItems: 'center',
                                                        }}>
                                                        {/*<Image*/}
                                                        {/*  style={{*/}
                                                        {/*    height: 40,*/}
                                                        {/*    width: 40,*/}
                                                        {/*    resizeMode: 'contain',*/}
                                                        {/*    borderRadius: 35,*/}
                                                        {/*  }}*/}
                                                        {/*  source={{uri: `${i.user.avatar}`}}*/}
                                                        {/*/>*/}
                                                        <View
                                                            style={{
                                                                gap: 5,
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontFamily: theme.font.medium,
                                                                    fontSize: 14,
                                                                    color: theme.color.black,
                                                                    textTransform: 'capitalize',
                                                                }}>
                                                                {i.user.first_name + ' ' + i.user.last_name}{' '}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: theme.font.medium,
                                                                    fontSize: 12,
                                                                    color: theme.color.primary,
                                                                }}>
                                                                {formatPhoneNumber(`+91 ${i.user.phone_number}`)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <Pressable
                                                        onPress={() =>
                                                            Linking.openURL(`tel:${i.user.phone_number}`)
                                                        }>
                                                        <PhoneIcon
                                                            style={{
                                                                width: 16,
                                                                height: 16,
                                                                fill: theme.color.black,
                                                            }}
                                                        />
                                                    </Pressable>
                                                </View>
                                            );
                                        })
                                    ) : (
                                        <Text
                                            style={{
                                                fontFamily: theme.font.medium,
                                                fontSize: 14,
                                                color: theme.color.primary,
                                            }}>
                                            Please give more time to get customer.
                                        </Text>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </BottomSheet>
                <TebNavigation onLayout={i => setTebNavigation(i.layout.height)} />
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            </View>
        </SafeAreaView>
    );
};

export default Profile;
