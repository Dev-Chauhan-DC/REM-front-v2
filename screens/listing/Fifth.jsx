import {
    View,
    Text,
    ScrollView,
    useWindowDimensions,
    ImageBackground,
    Pressable,
    ActivityIndicator, Alert, StatusBar, Image, SafeAreaView, Platform,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme';
import StepsBottom from '../../components/StepsBottom';
import {useNavigation} from '@react-navigation/native';
import apis from '../../apis/apis';
import DeleteIcon from '../../assets/svgs/DeleteIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import s3Utilities from '../../utilities/s3Utilities';
import {
    addressState, balconyCountState,
    bathroomCountState,
    bedroomCountState, builtUpAreaState, carpetAreaState, facingState, flooringTypeState, hallCountState,
    houseTypeState, kitchenCountState, ownershipState, plotAreaState, propertyAgeState, propertyFloorState,
    purposeState, totalFloorState,
} from '../../atoms/listing/first';
import {useRecoilState} from 'recoil';
import {regionState} from '../../atoms/listing/second';
import {
    availabilityState, cornerPropertyState, cupboardState,
    expectedPriceState, furnishingState,
    isUnderLoanState, kitchenTypeState,
    maintenanceState, parkingFourWheelerState, parkingTwoWheelerState, possessionStatusState, preferredTenantsState,
    priceNagotiableState, propertyDescriptionState, totalFlatsInBuildingState,
} from '../../atoms/listing/third';
import {
    amenityArrayState,
    gatedSecurityState,
    gymState,
    powerBackupState,
    waterSupplyState,
} from '../../atoms/listing/fourth';
import {imageCompress} from '../../utilities/imageCompress';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Fifth = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;


    const navigation = useNavigation();
    const screenHeight = useWindowDimensions().height;

    const [stepsBottomHeight, setStepsBottomHeight] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesFileId, setImagesFileId] = useState([]);
    const gap = 10;
    const [uploadLoading, setUploadLoading] = useState(false);
    const [error, setError] = useState('');
    const [compressedImageUri, setCompressedImageUri] = useState("")

    //first
    const [purpose, setPurpose] = useRecoilState(purposeState);
    const [houseType, setHouseType] = useRecoilState(houseTypeState);
    const [address, setAddress] = useRecoilState(addressState);
    const [bedroomCount, setBedroomCount] = useRecoilState(bedroomCountState);
    const [bathroomCount, setBathroomCount] = useRecoilState(bathroomCountState);
    const [hallCount, setHallCount] = useRecoilState(hallCountState);
    const [kitchenCount, setKitchenCount] = useRecoilState(kitchenCountState);
    const [balconyCount, setBalconyCount] = useRecoilState(balconyCountState);
    const [builtUpArea, setBuiltUpArea] = useRecoilState(builtUpAreaState);
    const [carpetArea, setCarpetArea] = useRecoilState(carpetAreaState);
    const [plotArea, setPlotArea] = useRecoilState(plotAreaState);
    const [facing, setFacing] = useRecoilState(facingState);
    const [propertyAge, setPropertyAge] = useRecoilState(propertyAgeState);
    const [totalFloor, setTotalFloor] = useRecoilState(totalFloorState);
    const [propertyFloor, setPropertyFloor] = useRecoilState(propertyFloorState);
    const [flooringType, setFlooringType] = useRecoilState(flooringTypeState);
    const [ownership, setOwnership] = useRecoilState(ownershipState);

    //second
    const [region, setRegion] = useRecoilState(regionState);

    //third
    const [expectedPrice, setExpectedPrice] = useRecoilState(expectedPriceState);
    const [priceNagotiable, setPriceNagotiable] = useRecoilState(priceNagotiableState);
    const [maintenance, setMaintenance] = useRecoilState(maintenanceState);
    const [isUnderLoan, setIsUnderLoan] = useRecoilState(isUnderLoanState);
    const [availability, setAvailability] = useRecoilState(availabilityState);
    const [furnishing, setFurnishing] = useRecoilState(furnishingState);
    const [parkingTwoWheeler, setParkingTwoWheeler] = useRecoilState(parkingTwoWheelerState);
    const [parkingFourWheeler, setParkingFourWheeler] = useRecoilState(parkingFourWheelerState);
    const [cupboard, setCupboard] = useRecoilState(cupboardState);
    const [kitchenType, setKitchenType] = useRecoilState(kitchenTypeState);
    const [propertyDescription, setPropertyDescription] = useRecoilState(propertyDescriptionState);
    const [cornerProperty, setCornerProperty] = useRecoilState(cornerPropertyState);
    const [possessionStatus, setPossessionStatus] = useRecoilState(possessionStatusState);
    const [totalFlatsInBuilding, setTotalFlatsInBuilding] = useRecoilState(totalFlatsInBuildingState);
    const [preferredTenants, setPreferredTenants] = useRecoilState(preferredTenantsState);

    //fourth
    const [gatedSecurity, setGatedSecurity] = useRecoilState(gatedSecurityState);
    const [gym, setGym] = useRecoilState(gymState);
    const [waterSupply, setWaterSupply] = useRecoilState(waterSupplyState);
    const [powerBackup, setPowerBackup] = useRecoilState(powerBackupState);
    const [amenities, setAmenities] = useRecoilState(amenityArrayState)


    const onSubmitHandle = async () => {


        if (imagesFileId < 2) {
            setError('Please select at least two photos');
            return;
        }

        setError('');

        const newData = {
            purposeId: purpose,
            homeTypeId: houseType,
            address: address,
            landmark: '',
            area: '',
            pincode: '',
            city: '',
            state: '',
            bedroomCount: bedroomCount,
            bathroomCount: bathroomCount,
            hallCount: hallCount,
            kitchenCount: kitchenCount,
            balconyCount: balconyCount,
            builtUpArea: builtUpArea,
            carpetArea: carpetArea,
            plotArea: plotArea,
            facingId: facing,
            propertyAge: propertyAge,
            totalFloor: totalFloor,
            propertyFloor: propertyFloor,
            flooringTypeId: flooringType,
            ownershipTypeId: ownership,
            latitude: region.latitude,
            longitude: region.longitude,
            price: expectedPrice,
            negotiable: priceNagotiable,
            maintenance: maintenance,
            currentlyUnderLoan: isUnderLoan,
            availabilityTypeId: availability,
            furnishingsId: furnishing,
            parkingSlotTwoWheelerCount: parkingTwoWheeler,
            parkingSlotFourWheelerCount: parkingFourWheeler,
            cupboard: cupboard,
            kitchenTypesId: kitchenType,
            propertyDescription: propertyDescription,
            flatsInBuilding: totalFlatsInBuilding,
            possessionsId: possessionStatus,
            tenantsId: preferredTenants,
            gatedSecurity: gatedSecurity,
            gym: gym,
            waterSuppliesId: waterSupply,
            powerBackupsId: powerBackup,
            cornerProperty: cornerProperty,
            // verifiedProperty,
            // agentCertification,
            deposit: '500',

        };


        try {
            const response = await apis.createProperty(newData);

            if (
                response &&
                response.data &&
                response.data.data &&
                response.data.data.id
            ) {
                const propertyId = response.data.data.id;

                const srtingAmenities = JSON.stringify(amenities);

                const amenityData = {
                    propertyId: propertyId,
                    amenitiesArray: srtingAmenities,
                };

                await apis.createPropertyAmenities(amenityData);

                const propertyPhotosFile = {
                    propertyId: propertyId,
                    imageFileIds: imagesFileId,
                };
                await apis.createPropertyPhotoFiles(propertyPhotosFile);

                navigation.navigate('profile');
            }
        } catch (e) {


            Alert.alert(
                'Error',
                e?.response?.data?.message || 'Something went wrong',
                [
                    {
                        text: 'OK',
                    },
                ],
                {cancelable: false},
            );


        }
    };

    const imageSelectHandle = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: true,
            });
            setUploadLoading(true);

            const file = result.assets[0];

            const compressedImage = await imageCompress(file.uri);

            const data = {
                fileName: file.fileName,
                ContentType: file.type,
            };

            const getUrl = await apis.getPresignedUrl(data);
            const presignedUrl = getUrl.data.data;

            const fileData = {
                url: presignedUrl,
                fileType: file.type,
                fileBase64: compressedImage,
            };

            const sendDataResponse = await apis.sendDataToS3(fileData);

            if (sendDataResponse) {
                const imageUrl = presignedUrl.split('?')[0];

                const storageKey = s3Utilities.extractKeyFromUrl(presignedUrl);
                const fileData = {
                    name: file.fileName,
                    storage_key: storageKey,
                    type: file.type,
                    size: file.fileSize,
                };
                const createFileRes = await apis.createFile(fileData);

                if (createFileRes && createFileRes.data && createFileRes.data.data && createFileRes.data.data.id) {
                    setImagesFileId([createFileRes.data.data.id, ...imagesFileId]);
                }

                setImages([imageUrl, ...images]);

            }

            setUploadLoading(false);
        } catch (e) {
            setUploadLoading(false);

            Alert.alert(
                e?.response?.data?.message || '',
                e?.response?.data?.message || 'Please Select Images',
                [
                    {
                        text: 'OK',
                    },
                ],
                {cancelable: false},
            );
        }
    };

    const deleteImageHandle = async index => {
        let array = [...images];
        array.splice(index, 1);
        setImages(array);
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
                    backgroundColor: 'white',
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}>
                <View
                    style={{
                        height: screenHeight - theme.screen.paddingTop - stepsBottomHeight - safeRemovedTotalHeightIos,
                    }}>
                    <ScrollView
                        style={{
                            flex: 1,
                        }}
                        showsVerticalScrollIndicator={false}>
                        {
                            error
                                ?
                                <Text
                                    style={{
                                        color: theme.color.locationRed,
                                        fontFamily: theme.font.medium,
                                        fontSize: 16,
                                        marginBottom: 16,
                                    }}
                                >{error}</Text>
                                :
                                <></>
                        }

                        <View
                            style={{
                                height:
                                    screenHeight - theme.screen.paddingTop - stepsBottomHeight,
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                            }}>
                            {images && images.length !== 0 ? (
                                images.map((i, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                width: '50%',
                                                height: 120,
                                                paddingRight: index % 2 === 0 ? gap / 2 : 0,
                                                paddingLeft: index % 2 !== 0 ? gap / 2 : 0,
                                                paddingBottom: gap,
                                            }}>
                                            <ImageBackground
                                                source={{
                                                    uri: `${i}`,
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'relative',
                                                    borderRadius: 10,
                                                    overflow: 'hidden',
                                                }}>
                                                <View
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                        backgroundColor: '#ffffff7d',
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 0,
                                                        margin: 10,
                                                        borderRadius: 30 / 2,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <DeleteIcon
                                                        onPress={() => deleteImageHandle(index)}
                                                        style={{
                                                            width: 12,
                                                            height: 12,
                                                        }}
                                                    />
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                            <Pressable
                                onPress={imageSelectHandle}
                                style={{
                                    width: '50%',
                                    borderWidth: 1,
                                    borderColor: theme.color.gray400,
                                    borderStyle: 'dashed',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    height: 120,
                                }}>
                                {uploadLoading ? (
                                    <ActivityIndicator color={theme.color.primary}/>
                                ) : (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            gap: 0,
                                        }}>
                                        <Text
                                            style={{
                                                color: theme.color.gray400,
                                                fontFamily: theme.font.regular,
                                                fontSize: 30,
                                                marginBottom: -5,
                                                marginTop: -10,
                                            }}>
                                            +
                                        </Text>
                                        <Text
                                            style={{
                                                color: theme.color.gray400,
                                                fontFamily: theme.font.medium,
                                                fontSize: 12,
                                            }}>
                                            Add Photo
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>

                <Image
                    width={1000}
                    height={1000}
                    source={{uri: "file:///data/user/0/com.realestatemarket/cache/62bf4a72-3078-476d-a2a7-631dee80a987.jpg"}}/>


                <StepsBottom
                    primaryBtnText={'Post Property'}
                    onNextPress={onSubmitHandle}
                    onLayout={i => setStepsBottomHeight(i.layout.height)}
                    stepCount={5}
                    currentStep={5}
                />
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>

            </View>
        </SafeAreaView>
    );
};

export default Fifth;
