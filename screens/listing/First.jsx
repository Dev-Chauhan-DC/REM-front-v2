import {View, Text, ScrollView, useWindowDimensions, StatusBar, Button, SafeAreaView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectToggle from '../../components/SelectToggle';
import theme from '../../theme';
import OptionSelectWithIcon from '../../components/OptionSelectWithIcon';
import ApartmentIcon from '../../assets/svgs/ApartmentIcon';
import GateIcon from '../../assets/svgs/GateIcon';
import BuildingIcon from '../../assets/svgs/BuildingIcon';
import HouseIcon from '../../assets/svgs/HouseIcon';
import Input from '../../components/Input';
import OptionSelect from '../../components/OptionSelect';
import StepsBottom from '../../components/StepsBottom';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import Video from 'react-native-video';
import {useRecoilState} from 'recoil';
import {
    addressState, balconyCountState,
    bathroomCountState,
    bedroomCountState, builtUpAreaState, carpetAreaState, facingState, flooringTypeState, hallCountState,
    houseTypeState, kitchenCountState, ownershipState, plotAreaState, propertyAgeState, propertyFloorState,
    purposeState, totalFloorState,
} from '../../atoms/listing/first';
import {useSafeAreaInsets} from "react-native-safe-area-context";


const First = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const navigation = useNavigation();

    const screenHeight = useWindowDimensions().height;
    const [stepsBottomHeight, setStepsBottomHeight] = useState(0);
    const [isBottomSheet, setIsBottomSheet] = useState(false);

    const [initPurposeError, setInitPurposeError] = useState('');
    const [houseTypeError, setHouseTypeError] = useState('');
    const [propAddressError, setPropAddressError] = useState('');
    const [initBedError, setInitBedError] = useState('');
    const [initBathError, setInitBathError] = useState('');
    const [initHallError, setInitHallError] = useState('');
    const [initKitchenError, setInitKitchenError] = useState('');
    const [initBalError, setInitBalError] = useState('');
    const [initBuiltUpError, setInitBuiltUpError] = useState('');
    const [initCarpetError, setInitCarpetError] = useState('');
    const [initPlotAreaError, setInitPlotAreaError] = useState('');
    const [initFacingError, setInitFacingError] = useState('');
    const [initPropAgeError, setInitPropAgeError] = useState('');
    const [initTotalFloorError, setInitTotalFloorError] = useState('');
    const [initPropFloorError, setInitPropFloorError] = useState('');
    const [initFlorringTypeError, setInitFlorringTypeError] = useState('');
    const [initOwnershipError, setInitOwnershipError] = useState('');
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


    const purposeHandle = async (i, index) => setPurpose(index + 1);

    const homeTypeHandle = (i, index) => setHouseType(index + 1);

    const addressHandle = i => setAddress(i);

    const bedroomHandle = (i, index) => setBedroomCount(index);

    const bathroomHandle = (i, index) => setBathroomCount(index);

    const hallHandle = (i, index) => setHallCount(index);

    const kitchenHandle = async (i, index) => setKitchenCount(index);

    const balconyHandle = async (i, index) => setBalconyCount(index);

    const builtUpAreaHandle = i => setBuiltUpArea(i);

    const carpetAreaHandle = i => setCarpetArea(i);

    const plotAreaHandle = i => setPlotArea(i);

    const facingHandle = (i, index) => setFacing(index + 1);

    const propertyAgeHandle = i => setPropertyAge(i);

    const totalFloorHandle = i => setTotalFloor(i);

    const propertyFloorHandle = i => setPropertyFloor(i);

    const flooringTypesHandle = (i, index) => setFlooringType(index + 1);

    const ownshipHandle = (i, index) => setOwnership(index + 1);

    const onNextPressHandle = async () => {

        let totalValidation = 17;

        if (!purpose) {
            setInitPurposeError('Please Select Sell or Rent');
        } else {
            setInitPurposeError('');
            totalValidation--
        }

        if (!houseType) {
            setHouseTypeError('Please Select House Type');
        } else {
            setHouseTypeError('');
            totalValidation--
        }

        if (!address || address.length <= 10) {
            setPropAddressError('Please Enter Correct Address');
        } else {
            setPropAddressError('');
            totalValidation--
        }

        if (isNaN(bedroomCount) || bedroomCount < 0 || bedroomCount > 5) {
            setInitBedError('Please Select Bedroom count');
        } else {
            setInitBedError('');
            totalValidation--
        }

        if (isNaN(bathroomCount) || bathroomCount < 0 || bathroomCount > 5) {
            setInitBathError('Please Select Bathroom count');
        } else {
            setInitBathError('');
            totalValidation--
        }

        if (isNaN(hallCount) || hallCount < 0 || hallCount > 5) {
            setInitHallError('Please Select Hall count');
        } else {
            setInitHallError('');
            totalValidation--
        }

        if (isNaN(kitchenCount) || kitchenCount < 0 || kitchenCount > 5) {
            setInitKitchenError('Please Select Kitchen count');
        } else {
            setInitKitchenError('');
            totalValidation--
        }

        if (isNaN(balconyCount) || balconyCount < 0 || balconyCount > 5) {
            setInitBalError('Please Select Balcony count');
        } else {
            setInitBalError('');
            totalValidation--
        }

        if (!builtUpArea || isNaN(builtUpArea) || Number(builtUpArea) < 100) {
            setInitBuiltUpError('Invalid Built Up Area');
        } else {
            setInitBuiltUpError('');
            totalValidation--
        }

        if (!carpetArea || isNaN(carpetArea) || Number(carpetArea) < 100) {
            setInitCarpetError('Invalid Carper Up Area');
        } else {
            setInitCarpetError('');
            totalValidation--
        }
        if ((houseType === 2) || houseType === 4) {
            if (!plotArea || isNaN(plotArea) || Number(plotArea) < 100) {
                setInitPlotAreaError('Invalid Plot Up Area');
            } else {
                setInitPlotAreaError('');
                totalValidation--
            }
        } else {
            setInitPlotAreaError('');
            totalValidation--
        }


        if (!facing) {
            setInitFacingError('Please Select Facing');
        } else {
            setInitFacingError('');
            totalValidation--
        }

        if (!propertyAge || isNaN(propertyAge) || parseInt(propertyAge) < 0) {
            setInitPropAgeError('Invalid Property Age');
        } else {
            setInitPropAgeError('');
            totalValidation--
        }

        if (!totalFloor || isNaN(totalFloor) || parseInt(totalFloor) < 0) {
            setInitTotalFloorError('Invalid Total Floor');
        } else {
            setInitTotalFloorError('');
            totalValidation--
        }

        if (houseType === 1 || houseType === 3) {
            if (!propertyFloor || isNaN(propertyFloor) || parseInt(propertyFloor) < 0) {
                setInitPropFloorError('Invalid Property Floor');
            } else {
                setInitPropFloorError('');
                totalValidation--
            }
        }else{
            setInitPropFloorError('');
            totalValidation--
        }

        if (!flooringType) {
            setInitFlorringTypeError('Please Select Flooring Type');
        } else {
            setInitFlorringTypeError('');
            totalValidation--
        }

        if (!ownership) {
            setInitOwnershipError('Please Ownership Type');
        } else {
            setInitOwnershipError('');
            totalValidation--
        }

        if (totalValidation === 0) {
            navigation.navigate("second")
        }

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
                }}
            >
                <View
                    style={{
                        height: screenHeight - theme.screen.paddingTop - stepsBottomHeight - safeRemovedTotalHeightIos,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                gap: 45,
                                paddingBottom: 45,
                            }}
                        >
                            <SelectToggle
                                error={initPurposeError}
                                initiallySelected={purpose - 1}
                                style={{
                                    marginBottom: 25,
                                    marginTop: 20,
                                }}
                                twoOption={['sell', 'rent']}
                                selectedOption={purposeHandle}

                            />
                            <OptionSelectWithIcon
                                error={houseTypeError}
                                initiallySelected={houseType - 1}
                                showPlayButton={false}
                                onPlayClick={() => setIsBottomSheet(true)}
                                title={'House Type'}
                                iconList={[<ApartmentIcon/>, <GateIcon/>, <BuildingIcon/>, <HouseIcon/>]}
                                optionsList={['apartment', 'gated community Villa', 'standalone building', 'independent house / villa']}
                                selectedOption={homeTypeHandle}
                            />
                            <Input
                                error={propAddressError}
                                value={address}
                                onChangeText={addressHandle}
                                showPlayButton={false}
                                placeholder={'Address'}
                            />
                            <OptionSelect
                                error={initBedError}
                                initiallySelected={bedroomCount}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={bedroomHandle}
                                title={'Bedrooms'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={initBathError}
                                initiallySelected={bathroomCount}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={bathroomHandle}
                                title={'Bathrooms'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={initHallError}
                                initiallySelected={hallCount}

                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={hallHandle}
                                title={'Hall'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={initKitchenError}
                                initiallySelected={kitchenCount}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={kitchenHandle}
                                title={'Kitchen'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={initBalError}
                                initiallySelected={balconyCount}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={balconyHandle}
                                title={'Balcony'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <Input
                                error={initBuiltUpError}
                                value={builtUpArea}
                                showPlayButton={false}
                                placeholder={'Built Up Area (sqft)'}
                                onChangeText={builtUpAreaHandle}
                                keyboardType={'numeric'}
                            />
                            <Input
                                error={initCarpetError}
                                value={carpetArea}
                                showPlayButton={false}
                                placeholder={'Carpet Area (sqft)'}
                                onChangeText={carpetAreaHandle}
                                keyboardType={'numeric'}
                            />
                            <Input
                                style={{
                                    display: houseType === 1 || houseType == 3 ? "none" : ""
                                }}
                                error={initPlotAreaError}
                                value={plotArea}
                                showPlayButton={false}
                                placeholder={'Plot Area'}
                                onChangeText={plotAreaHandle}
                                keyboardType={'numeric'}
                            />
                            <OptionSelect
                                error={initFacingError}
                                initiallySelected={facing - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={facingHandle}
                                title={'Facing'}
                                options={['North', 'South', 'East', 'West', 'North - West', 'North - East', 'South - West', 'South - East']}

                            />
                            {/* <ProgressBar title={"Property age"} showPlayButton={false} onPlayClick={() => console.warn("click")} /> */}
                            <Input
                                error={initPropAgeError}
                                value={propertyAge}
                                onChangeText={propertyAgeHandle}
                                showPlayButton={false}
                                placeholder={'Property age ( Year )'}
                                keyboardType={'numeric'}
                            />
                            {/* <ProgressBar title={"Total floors"} showPlayButton={false} onPlayClick={() => console.warn("click")} /> */}
                            <Input
                                error={initTotalFloorError}
                                value={totalFloor}
                                onChangeText={totalFloorHandle}
                                showPlayButton={false}
                                placeholder={'Total floors'}
                                keyboardType={'numeric'}
                            />
                            {/* <ProgressBar title={"Property floors"} showPlayButton={false} onPlayClick={() => console.warn("click")} /> */}
                            <Input
                                style={{
                                    display: houseType === 2 || houseType == 4 ? "none" : ""
                                }}
                                error={initPropFloorError}
                                value={propertyFloor}
                                onChangeText={propertyFloorHandle}
                                showPlayButton={false}
                                placeholder={'Property floors'}
                                keyboardType={'numeric'}
                            />
                            <OptionSelect
                                error={initFlorringTypeError}
                                initiallySelected={flooringType - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={flooringTypesHandle}
                                title={'Flooring type'}
                                options={['Cement', 'Mosaic', 'Marble / Granite', 'Wooden', 'Vitrified Tiles']}

                            />
                            <OptionSelect
                                style={{
                                    display: purpose === 2 ? "none" : ""
                                }}
                                error={initOwnershipError}
                                initiallySelected={ownership - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={ownshipHandle}
                                title={'Ownership'}
                                options={['Self Owned', 'On Lease']}

                            />
                            {/* <TwoCursorProgressBar title={"Lease Year"} showPlayButton={false} onPlayClick={() => console.warn("click")} /> */}

                        </View>
                    </ScrollView>
                </View>
                <StepsBottom
                    onNextPress={() => onNextPressHandle()}
                    onLayout={(i) => setStepsBottomHeight(i.layout.height)}
                    stepCount={5}
                    currentStep={1}/>

                <BottomSheet
                    isShow={isBottomSheet}
                    showBackgroundBlur={true}
                    outsideClick={() => setIsBottomSheet(false)}
                >
                    <View
                        style={{
                            paddingHorizontal: theme.screen.horizontalPadding,
                            marginVertical: 30,
                        }}
                    >

                        <View
                            style={{
                                height: 220,
                                overflow: 'hidden',
                            }}
                        >
                            <Video
                                controls={true}
                                paused={false}
                                resizeMode="cover"
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onError={this.videoError}
                                source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                                style={{
                                    height: '100%',
                                }}

                            >


                            </Video>
                        </View>
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.regular,
                                marginTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: theme.font.semiBold,
                                }}
                            >Home Type: </Text>
                            Like are you living in apartments or you have the personal park and you want to sell this
                            property to your valuable customer using this application.
                        </Text>
                    </View>

                </BottomSheet>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>

            </View>
        </SafeAreaView>
    );
};

export default First;
