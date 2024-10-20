import {
    View,
    Text,
    Image,
    Pressable,
    useWindowDimensions,
    ScrollView,
    StatusBar, Linking, SafeAreaView,
    ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import LeftArrow from '../../assets/svgs/LeftArrow';
import ShareIcon from '../../assets/svgs/ShareIcon';
import Heart from '../../assets/svgs/Heart';
import InfoCard from '../../components/InfoCard';
import BuildUpAreaIcon from '../../assets/svgs/BuildUpAreaIcon';
import CarpetAreaIcon from '../../assets/svgs/CarpetAreaIcon';
import FacingIcon from '../../assets/svgs/FacingIcon';
import FlooringIcon from '../../assets/svgs/FlooringIcon';
import PropertyAgeIcon from '../../assets/svgs/PropertyAgeIcon';
import FurnishingStatusIcon from '../../assets/svgs/FurnishingStatusIcon';
import MaintenanceIcon from '../../assets/svgs/MaintenanceIcon';
import FloorIcon from '../../assets/svgs/FloorIcon';
import PowerBackupIcon from '../../assets/svgs/PowerBackupIcon';
import WaterSupplyIcon from '../../assets/svgs/WaterSupplyIcon';
import GatedSecurityIcon from '../../assets/svgs/GatedSecurityIcon';
import KitchenTypeIcon from '../../assets/svgs/KitchenTypeIcon';
import CupBoardsIcon from '../../assets/svgs/CupBoardsIcon';
import PossessionIcon from '../../assets/svgs/PossessionIcon';
import PropertyTypeIcon from '../../assets/svgs/PropertyTypeIcon';
import DaysOnAppIcon from '../../assets/svgs/DaysOnAppIcon';
import IconList from '../../components/IconList';
import { useNavigation } from '@react-navigation/native';
import ButtonComponent from '../../components/ButtonComponent';
import OptionSelect from '../../components/OptionSelect';
import StreetViewIcon from '../../assets/svgs/StreetViewIcon';
import RightHalfArrow from '../../assets/svgs/RightHalfArrow';
import apis from '../../apis/apis';
import calculateDaysAgo from '../../utilities/calculateDaysAgo';
import { formatPhoneNumber } from '../../utilities/formatPhoneNumber';
import ActiveHeart from '../../assets/svgs/ActiveHeart';
import BuildingIcon from "../../assets/svgs/BuildingIcon";
import PlotAreaIcon from "../../assets/svgs/PlotAreaIcon";
import RentIcon from "../../assets/svgs/RentIcon";
import SellIcon from "../../assets/svgs/SellIcon";
import NegotiableIcon from "../../assets/svgs/NegotiableIcon";
import AvailabilityIcon from "../../assets/svgs/AvailabilityIcon";
import ParkingIcon from "../../assets/svgs/ParkingIcon";
import BikeIcon from "../../assets/svgs/BikeIcon";
import AngleIcon from "../../assets/svgs/AngleIcon";
import TenantIcon from "../../assets/svgs/TenantIcon";
import GymIcon from "../../assets/svgs/GymIcon";
import HousePersonIcon from "../../assets/svgs/HousePersonIcon";
import LoanIcon from "../../assets/svgs/LoanIcon";
import ApartmentIcon from "../../assets/svgs/ApartmentIcon";
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/profile/user';
import { loginShowState } from '../../atoms/login';

const PropertyInfo = ({ route }) => {
    const screenWidth = useWindowDimensions().width;
    const [propertyInfo, setPropertyInfo] = useState({});
    const [isPhoneShow, setIsPhoneShow] = useState(false);
    const [user, setUser] = useRecoilState(userState)
    const [loginModal, setLoginModal] = useRecoilState(loginShowState)
    const [like, setLike] = useState(false);
    const [propUser, setPropUser] = useState(null)



    const propertyId = route.params.propertyId;

    const navigation = useNavigation();

    const getPropertyData = async id => {
        try {
            const response = await apis.getPropertyById(id);
            const data =
                response && response.data && response.data.data
                    ? response.data.data
                    : {};
            setPropertyInfo(data);
        } catch (e) {
            console.warn(e?.response?.data?.message || 'Something went wrong');
        }
    };

    const savePropertyHandle = async () => {
        try {
            if (user) {
                const result = await apis.saveProperty(propertyInfo.id);
                if (result.data.data === 1) {
                    ToastAndroid.show('Property Removed', ToastAndroid.SHORT);
                    setLike(false);
                } else {
                    ToastAndroid.show('Property Saved', ToastAndroid.SHORT)
                    setLike(true);
                }
                getPropertyData(propertyId);
                return;
            }

            setLoginModal(true)



        } catch (e) {
            console.warn(e?.response?.data?.message || 'Something went wrong');
        }
    };

    const showNumberClick = async () => {
        try {

            if (!user) {
                setLoginModal(true);
                return;
            }

            if (!propUser) {
                const result = await apis.getUserInfo(propertyInfo.user_id);
                setPropUser(result.data.data);
                const data = {
                    propertyId: propertyInfo.id,
                };
                await apis.createInterestedPerson(data);
                return
            }


            if (propUser?.phone_number) {
                await Linking.openURL(`tel:${propUser.phone_number}`);
            }


        } catch (e) {
            console.warn(e?.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (propertyId) {
            getPropertyData(propertyId);
        }

    }, [route]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white"
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                    }}>
                    <View
                        style={{
                            position: 'relative',
                        }}>
                        <Pressable
                            onPress={() =>
                                navigation.navigate('images', {
                                    imageArray: propertyInfo.property_photos,
                                })
                            }>
                            <Image
                                style={{
                                    height: 250,
                                    width: 'auto',
                                    objectFit: 'cover',
                                    backgroundColor: theme.color.gray200
                                }}
                                source={
                                    propertyInfo.property_photos === undefined
                                        ? require('../../assets/images/house.jpg')
                                        : { uri: propertyInfo?.property_photos[0]?.photos }
                                }
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 25,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                top: 10,
                                left: 10,
                            }}>
                            <LeftArrow
                                style={{
                                    width: 18,
                                    height: 18,
                                    fill: theme.color.black,
                                }}
                            />
                        </Pressable>
                        <View
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                flexDirection: 'row',
                                gap: 10,
                            }}>
                            <Pressable
                                onPress={savePropertyHandle}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 25,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                {like ? (
                                    <ActiveHeart
                                        style={{
                                            width: 14,
                                            height: 14,
                                            fill: theme.color.black,
                                        }}
                                    />
                                ) : (
                                    <Heart
                                        style={{
                                            width: 14,
                                            height: 14,
                                            fill: theme.color.black,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </View>
                        <View
                            style={{
                                backgroundColor: '#000000b8',
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                paddingHorizontal: 15,
                                paddingVertical: 3,
                                borderRadius: 5,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: 'white',
                                    fontFamily: theme.font.medium,
                                }}>
                                1 /{' '}
                                {propertyInfo.property_photos === undefined
                                    ? 0
                                    : propertyInfo.property_photos.length}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                        }}>
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.semiBold,
                                fontSize: 18,
                                marginTop: 14,
                                marginBottom: 15,
                            }}>
                            {propertyInfo.price ? propertyInfo.price.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                minimumFractionDigits: 0
                            }) : '0'}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.color.gray400,
                                fontFamily: theme.font.medium,
                                marginBottom: 15,
                            }}>
                            {propertyInfo.address}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginBottom: 35,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: theme.font.bold,
                                    }}>
                                    {propertyInfo.bedroom_count}
                                </Text>{' '}
                                bedroom
                                <Text
                                    style={{
                                        color: theme.color.gray200,
                                    }}>
                                    {' '}
                                    |{' '}
                                </Text>
                            </Text>
                            {/*  */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: theme.font.bold,
                                    }}>
                                    {propertyInfo.bathroom_count}
                                </Text>{' '}
                                bathroom
                                <Text
                                    style={{
                                        color: theme.color.gray200,
                                    }}>
                                    {' '}
                                    |{' '}
                                </Text>
                            </Text>
                            {/*  */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: theme.font.bold,
                                    }}>
                                    {propertyInfo.hall_count}
                                </Text>{' '}
                                hall
                                <Text
                                    style={{
                                        color: theme.color.gray200,
                                    }}>
                                    {' '}
                                    |{' '}
                                </Text>
                            </Text>
                            {/*  */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: theme.font.bold,
                                    }}>
                                    {propertyInfo.kitchen_count}
                                </Text>{' '}
                                kitchen
                                <Text
                                    style={{
                                        color: theme.color.gray200,
                                    }}>
                                    {' '}
                                    |{' '}
                                </Text>
                            </Text>
                            {/*  */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: theme.font.bold,
                                    }}>
                                    {propertyInfo.balcony_count}
                                </Text>{' '}
                                balcony
                            </Text>
                            {/*  */}
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginHorizontal: 15,
                            flexWrap: 'wrap',
                        }}>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Purpose'}
                                value={`For ${propertyInfo?.purpose?.purpose || ""}`}
                                icon={propertyInfo?.purpose_id == 1 ? <SellIcon /> : <RentIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        {
                            propertyInfo?.plot_area ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Plot Area'}
                                        value={`${propertyInfo?.plot_area || ""} sq ft`}
                                        icon={<PlotAreaIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View>
                                :
                                <></>
                        }

                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Build up area'}
                                value={`${propertyInfo.built_up_area
                                    ? propertyInfo.built_up_area.toLocaleString()
                                    : '0'
                                    } sq ft`}
                                icon={<BuildUpAreaIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Carpet area'}
                                value={`${propertyInfo.carpet_area
                                    ? propertyInfo.carpet_area.toLocaleString()
                                    : '0'
                                    } sq ft`}
                                icon={<CarpetAreaIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Availability'}
                                value={propertyInfo?.availability_type?.availability_type || ""}
                                icon={<AvailabilityIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        {
                            propertyInfo?.parking_slot_four_wheeler_count ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Parking slot'}
                                        value={`${propertyInfo?.parking_slot_four_wheeler_count || ""} Car`}
                                        icon={<ParkingIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View>
                                :
                                <></>
                        }


                        {
                            propertyInfo?.parking_slot_two_wheeler_count ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Parking slot'}
                                        value={`${propertyInfo?.parking_slot_two_wheeler_count || ""} Bike`}
                                        icon={<BikeIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View>
                                : <></>
                        }
                        {
                            propertyInfo?.corner_property ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Corner property'}
                                        value={'Yes'}
                                        icon={<AngleIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View>
                                :
                                <></>
                        }


                        {
                            propertyInfo?.negotiable ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Negotiable'}
                                        value={"Yes"}
                                        icon={<NegotiableIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>

                        }
                        {
                            propertyInfo?.tenant?.tenant ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Tenant'}
                                        value={propertyInfo?.tenant?.tenant || ""}
                                        icon={<TenantIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }
                        {
                            propertyInfo?.gym ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Gym'}
                                        value={"Yes"}
                                        icon={<GymIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }

                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Furnishing status'}
                                value={
                                    propertyInfo.furnishing
                                        ? propertyInfo.furnishing.furnishing
                                        : 'null'
                                }
                                icon={<FurnishingStatusIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Facing'}
                                value={propertyInfo.facing ? propertyInfo.facing.facing : 'null'}
                                icon={<FacingIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Flooring'}
                                value={
                                    propertyInfo.flooring_type
                                        ? propertyInfo.flooring_type.flooring_type
                                        : 'null'
                                }
                                icon={<FlooringIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Property age'}
                                value={`${propertyInfo.property_age ? propertyInfo.property_age : 'null'
                                    } Years`}
                                icon={<PropertyAgeIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Maintenance'}
                                value={`${propertyInfo.maintenance
                                    ? propertyInfo.maintenance.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: 'INR',
                                        minimumFractionDigits: 0
                                    })
                                    : 'null'
                                    }`}
                                icon={<MaintenanceIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Ownership type'}
                                value={
                                    propertyInfo.ownership_type
                                        ? propertyInfo.ownership_type.ownership_type
                                        : 'null'
                                }
                                icon={<FloorIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Power Backup'}
                                value={
                                    propertyInfo.power_backup
                                        ? propertyInfo.power_backup.power_backup
                                        : 'null'
                                }
                                icon={<PowerBackupIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Water Supply'}
                                value={
                                    propertyInfo.water_supply
                                        ? propertyInfo.water_supply.water_supply
                                        : 'null'
                                }
                                icon={<WaterSupplyIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Gated Security'}
                                value={propertyInfo.gated_security ? 'Yes' : 'No'}
                                icon={<GatedSecurityIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Kitchen Type'}
                                value={
                                    propertyInfo.kitchen_type
                                        ? propertyInfo.kitchen_type.kitchen_type
                                        : 'null'
                                }
                                icon={<KitchenTypeIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Cupboards'}
                                value={propertyInfo.cupboard ? propertyInfo.cupboard : '0'}
                                icon={<CupBoardsIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>


                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Days on app'}
                                value={
                                    propertyInfo.createdAt
                                        ? calculateDaysAgo(propertyInfo.createdAt)
                                        : 'null'
                                }
                                icon={<DaysOnAppIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>

                        {
                            propertyInfo?.total_floor ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Total Floor'}
                                        value={propertyInfo?.total_floor || ""}
                                        icon={<BuildingIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }
                        {
                            propertyInfo?.property_floor ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Property Floor'}
                                        value={propertyInfo?.property_floor || ""}
                                        icon={<HousePersonIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }
                        {
                            propertyInfo?.currently_under_loan ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Under Loan'}
                                        value={"Yes"}
                                        icon={<LoanIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }
                        {
                            propertyInfo?.flats_in_building ?
                                <View
                                    style={{
                                        width: '50%',
                                    }}>
                                    <InfoCard
                                        property={'Flats in building'}
                                        value={propertyInfo?.flats_in_building || ""}
                                        icon={<ApartmentIcon />}
                                        style={{
                                            margin: 5,
                                        }}
                                    />
                                </View> : <></>
                        }
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Possession'}
                                value={
                                    propertyInfo.possession
                                        ? propertyInfo.possession.possession
                                        : 'null'
                                }
                                icon={<PossessionIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                            }}>
                            <InfoCard
                                property={'Property type'}
                                value={
                                    propertyInfo.home_type
                                        ? propertyInfo.home_type.home_type
                                        : 'null'
                                }
                                icon={<PropertyTypeIcon />}
                                style={{
                                    margin: 5,
                                }}
                            />
                        </View>


                    </View>

                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                            marginTop: 80,
                        }}>
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.semiBold,
                                fontSize: 18,
                                marginBottom: 25,
                            }}>
                            Amenities
                        </Text>
                        <View
                            style={{
                                gap: 20,
                            }}>
                            {propertyInfo.property_amenities &&
                                propertyInfo.property_amenities.length !== 0 ? (
                                propertyInfo.property_amenities.map((i, index) => {
                                    return (
                                        <IconList
                                            key={index}
                                            icon={i.amenity.amenitie}
                                            text={i.amenity.amenitie}
                                        />
                                    );
                                })
                            ) : (
                                <Text
                                    style={{
                                        color: theme.color.black,
                                        fontSize: 14,
                                        fontFamily: theme.font.medium,
                                    }}>
                                    No Amenities
                                </Text>
                            )}
                        </View>
                        {/* <ButtonComponent
                        title={`show all ${propertyInfo.property_amenities ? propertyInfo.property_amenities.length : "0"} amenities`}
                        titleStyle={{
                            color: theme.color.black,
                            fontSize: 14,
                            fontFamily: theme.font.medium
                        }}
                        style={{
                            backgroundColor: "white",
                            borderColor: theme.color.black,
                            borderWidth: 1,
                            height: 44,
                            marginTop: 25
                        }}
                    /> */}
                    </View>

                    {/*  Near by start*/}
                    {/*<View*/}
                    {/*  style={{*/}
                    {/*    paddingHorizontal: theme.screen.horizontalPadding,*/}
                    {/*    marginTop: 80,*/}
                    {/*  }}>*/}
                    {/*  <Text*/}
                    {/*    style={{*/}
                    {/*      color: theme.color.black,*/}
                    {/*      fontFamily: theme.font.semiBold,*/}
                    {/*      fontSize: 18,*/}
                    {/*      marginBottom: 25,*/}
                    {/*    }}>*/}
                    {/*    Nearby*/}
                    {/*  </Text>*/}
                    {/*  <View>*/}
                    {/*    <View*/}
                    {/*      style={{*/}
                    {/*        borderRadius: 50,*/}
                    {/*        overflow: 'hidden',*/}
                    {/*        marginBottom: 20,*/}
                    {/*      }}>*/}
                    {/*      <ScrollView*/}
                    {/*        horizontal={true}*/}
                    {/*        showsHorizontalScrollIndicator={false}>*/}
                    {/*        <OptionSelect*/}
                    {/*          selectedOption={(i, index) => console.warn(i, index)}*/}
                    {/*          options={[*/}
                    {/*            'school',*/}
                    {/*            'hospital',*/}
                    {/*            'buses',*/}
                    {/*            'railway',*/}
                    {/*            'movie theater',*/}
                    {/*            'shopping mall',*/}
                    {/*            'pharmacy',*/}
                    {/*          ]}*/}
                    {/*          selectedOptionBackground={theme.color.black}*/}
                    {/*          optionContainerStyle={{*/}
                    {/*            gap: 7,*/}
                    {/*          }}*/}
                    {/*          optionStyle={{*/}
                    {/*            borderRadius: 50,*/}
                    {/*            paddingHorizontal: 30,*/}
                    {/*          }}*/}
                    {/*          textStyle={{*/}
                    {/*            fontSize: 14,*/}
                    {/*          }}*/}
                    {/*        />*/}
                    {/*      </ScrollView>*/}
                    {/*    </View>*/}
                    {/*    <View*/}
                    {/*      style={{*/}
                    {/*        borderWidth: 1,*/}
                    {/*        borderRadius: 5,*/}
                    {/*        borderColor: theme.color.gray100,*/}
                    {/*        padding: 15,*/}
                    {/*        gap: 20,*/}
                    {/*      }}>*/}
                    {/*      <View*/}
                    {/*        style={{*/}
                    {/*          flexDirection: 'row',*/}
                    {/*          width: '100%',*/}
                    {/*        }}>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.medium,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 14,*/}
                    {/*            width: '60%',*/}
                    {/*            textAlign: 'left',*/}
                    {/*          }}>*/}
                    {/*          Bhatiya Hospital*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.semiBold,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 12,*/}
                    {/*            width: '40%',*/}
                    {/*            textAlign: 'right',*/}
                    {/*          }}>*/}
                    {/*          2.6 km | 11 mins*/}
                    {/*        </Text>*/}
                    {/*      </View>*/}

                    {/*      <View*/}
                    {/*        style={{*/}
                    {/*          flexDirection: 'row',*/}
                    {/*          width: '100%',*/}
                    {/*        }}>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.medium,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 14,*/}
                    {/*            width: '60%',*/}
                    {/*            textAlign: 'left',*/}
                    {/*          }}>*/}
                    {/*          Jaslok Hospital and Research center*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.semiBold,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 12,*/}
                    {/*            width: '40%',*/}
                    {/*            textAlign: 'right',*/}
                    {/*          }}>*/}
                    {/*          2.6 km | 11 mins*/}
                    {/*        </Text>*/}
                    {/*      </View>*/}

                    {/*      <View*/}
                    {/*        style={{*/}
                    {/*          flexDirection: 'row',*/}
                    {/*          width: '100%',*/}
                    {/*        }}>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.medium,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 14,*/}
                    {/*            width: '60%',*/}
                    {/*            textAlign: 'left',*/}
                    {/*          }}>*/}
                    {/*          Breach Candy Hospital Trust*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*          style={{*/}
                    {/*            fontFamily: theme.font.semiBold,*/}
                    {/*            color: theme.color.black,*/}
                    {/*            fontSize: 12,*/}
                    {/*            width: '40%',*/}
                    {/*            textAlign: 'right',*/}
                    {/*          }}>*/}
                    {/*          2.6 km | 11 mins*/}
                    {/*        </Text>*/}
                    {/*      </View>*/}
                    {/*    </View>*/}
                    {/*  </View>*/}
                    {/*</View>*/}

                    {/*  Near by end*/}


                    {/*  Street view start*/}

                    {/*<View*/}
                    {/*  style={{*/}
                    {/*    paddingHorizontal: theme.screen.horizontalPadding,*/}
                    {/*    marginTop: 80,*/}
                    {/*  }}>*/}
                    {/*  <Text*/}
                    {/*    style={{*/}
                    {/*      color: theme.color.black,*/}
                    {/*      fontFamily: theme.font.semiBold,*/}
                    {/*      fontSize: 18,*/}
                    {/*      marginBottom: 25,*/}
                    {/*    }}>*/}
                    {/*    Street view*/}
                    {/*  </Text>*/}

                    {/*  <Pressable*/}
                    {/*    style={{*/}
                    {/*      backgroundColor: theme.color.gray100,*/}
                    {/*      alignSelf: 'flex-start',*/}
                    {/*      height: 60,*/}
                    {/*      width: 60,*/}
                    {/*      borderRadius: 60,*/}
                    {/*      alignItems: 'center',*/}
                    {/*      justifyContent: 'center',*/}
                    {/*    }}>*/}
                    {/*    <StreetViewIcon*/}
                    {/*      style={{*/}
                    {/*        width: 30,*/}
                    {/*        height: 30,*/}
                    {/*        fill: theme.color.black,*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*  </Pressable>*/}
                    {/*</View>*/}


                    {/*  Street view end*/}

                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                            marginTop: 80,
                            paddingBottom: 20,
                        }}>
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.semiBold,
                                fontSize: 18,
                                marginBottom: 25,
                            }}>
                            Description from owner
                        </Text>
                        <Text
                            style={{
                                color: theme.color.black,
                                marginBottom: 20,
                                fontFamily: theme.font.regular,
                                textTransform: 'capitalize',
                            }}>
                            {propertyInfo.property_description
                                ? propertyInfo.property_description
                                : 'null'}
                        </Text>
                        {/* <Pressable
                        style={{
                            backgroundColor: theme.color.gray100,
                            borderRadius: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                            alignSelf: "flex-start",
                            height: 30,
                            paddingHorizontal: 15
                        }}
                    >
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.semiBold,
                                marginBottom: 2
                            }}
                        >Show more</Text>
                        <RightHalfArrow
                            style={{
                                width: 16,
                                height: 16,
                                fill: theme.color.black
                            }} />
                    </Pressable> */}
                    </View>

                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                            marginTop: 80,
                            paddingBottom: 20,
                        }}>
                        <ButtonComponent
                            onPress={showNumberClick}
                            title={
                                propUser?.phone_number ? propUser.phone_number : 'Get a Number'
                            }
                            titleStyle={{
                                fontFamily: theme.font.semiBold,
                                color: 'white',
                            }}
                            style={{
                                backgroundColor: theme.color.black,
                            }}
                        />
                    </View>
                </View>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertyInfo;
