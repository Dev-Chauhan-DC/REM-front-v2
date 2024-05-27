import {View, Text, ScrollView, useWindowDimensions, StatusBar, SafeAreaView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import Input from '../../components/Input';
import OptionSelect from '../../components/OptionSelect';
import StepsBottom from '../../components/StepsBottom';
import CheckBoxWithTitle from '../../components/CheckBoxWithTitle';
import TextArea from '../../components/TextArea';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {
    availabilityState, cornerPropertyState, cupboardState,
    expectedPriceState, furnishingState,
    isUnderLoanState, kitchenTypeState,
    maintenanceState, parkingFourWheelerState, parkingTwoWheelerState, possessionStatusState, preferredTenantsState,
    priceNagotiableState, propertyDescriptionState, totalFlatsInBuildingState,
} from '../../atoms/listing/third';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {houseTypeState, purposeState} from "../../atoms/listing/first";

const Third = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const navigation = useNavigation();
    const screenHeight = useWindowDimensions().height;

    const [stepsBottomHeight, setStepsBottomHeight] = useState(0);
    const [priceError, setPriceError] = useState('');
    const [maintenanceError, setMaintenanceError] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [furnishingError, setFurnishingError] = useState('');
    const [twoWheelerError, setTwoWheelerError] = useState('');
    const [fourWheelerError, setFourWheelerError] = useState('');
    const [cupboardError, setCupboardError] = useState('');
    const [kitchenTypeError, setKitchenTypeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [possessionStatusError, setPossessionStatusError] = useState('');
    const [totalFlatError, setTotalFlatError] = useState('');
    const [tenantError, setTenantError] = useState('');

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
    //dependency
    const [purpose, setPurpose] = useRecoilState(purposeState);
    const [houseType, setHouseType] = useRecoilState(houseTypeState);


    const priceHandle = i => setExpectedPrice(i);

    const maintenanceHandle = i => setMaintenance(i);

    const nagotiableHandle = i => setPriceNagotiable(i ? 1 : 0);

    const currentlyUnderLoanHandle = i => setIsUnderLoan(i ? 1 : 0);

    const availabilityHandle = (i, index) => setAvailability(index + 1);

    const furnishingHandle = (i, index) => setFurnishing(index + 1);

    const parkingSlotHandle = (i, index) => setParkingTwoWheeler(index);

    const parkingSlotFourHandle = (i, index) => setParkingFourWheeler(index);

    const cupboardHandle = (i, index) => setCupboard(index);

    const kitchenTypeHandle = (i, index) => setKitchenType(index + 1);

    const propertyDescriptionHandle = i => setPropertyDescription(i);

    const cornerPropertyHandle = i => setCornerProperty(i ? 1 : 0);

    const possessionStatusHandle = (i, index) => setPossessionStatus(index + 1);

    const flatsInBuildingsHandle = i => setTotalFlatsInBuilding(i);

    const preferredTenantsHandle = (i, index) => setPreferredTenants(index + 1);

    const nextPressHandle = async () => {

        let totalValidation = 12;

        if (!expectedPrice || isNaN(expectedPrice) || Number(expectedPrice) <= 0) {
            setPriceError('Invalid Price');
        } else {
            setPriceError('');
            totalValidation--
        }

        if (!maintenance || isNaN(maintenance) || Number(maintenance) <= 0) {
            setMaintenanceError('Invalid maintenance');
        } else {
            setMaintenanceError('');
            totalValidation--
        }

        if (!availability) {
            setAvailabilityError('Please select availability');
        } else {
            setAvailabilityError('');
            totalValidation--
        }

        if (!furnishing) {
            setFurnishingError('Please select furnishing');
        } else {
            setFurnishingError('');
            totalValidation--
        }

        if (isNaN(parkingTwoWheeler) || parkingTwoWheeler < 0 || parkingTwoWheeler > 5) {
            setTwoWheelerError('Please Select parking slot');
        } else {
            setTwoWheelerError('');
            totalValidation--
        }

        if (isNaN(parkingFourWheeler) || parkingFourWheeler < 0 || parkingFourWheeler > 5) {
            setFourWheelerError('Please Select parking slot');
        } else {
            setFourWheelerError('');
            totalValidation--
        }

        if (isNaN(cupboard) || cupboard < 0 || cupboard > 5) {
            setCupboardError('Please Select cupboard count');
        } else {
            setCupboardError('');
            totalValidation--
        }

        if (!kitchenType) {
            setKitchenTypeError('Please select kitchen type');
        } else {
            setKitchenTypeError('');
            totalValidation--
        }

        if (propertyDescription.length <= 10) {
            setDescriptionError('Minimum length 10 character');
        } else {
            setDescriptionError('');
            totalValidation--
        }


        if (!possessionStatus) {
            setPossessionStatusError('Please select possession status');
        } else {
            setPossessionStatusError('');
            totalValidation--
        }

        if (houseType === 1 || houseType === 3) {
            if (isNaN(totalFlatsInBuilding) || Number(totalFlatsInBuilding) < 1) {
                setTotalFlatError('Please enter total flats in building');
            } else {
                setTotalFlatError('');
                totalValidation--
            }
        } else {
            setTotalFlatError('');
            totalValidation--
        }


        if (!preferredTenants) {
            setTenantError('Please select preferred tenant');
        } else {
            setTenantError('');
            totalValidation--
        }

        if (totalValidation === 0) {
            navigation.navigate("fourth")
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
                                paddingBottom: 200,
                            }}
                        >

                            <Input
                                error={priceError}
                                value={expectedPrice}
                                showPlayButton={false}
                                placeholder={`Expected ${purpose === 1 ? "Price" : "Rent"}*`}
                                keyboardType={'numeric'}
                                onChangeText={priceHandle}
                            />
                            <CheckBoxWithTitle
                                initCheck={priceNagotiable}
                                checkStatus={nagotiableHandle}
                                title={'Nagotiable'}
                                showPlayButton={false}
                            />
                            <Input
                                error={maintenanceError}
                                value={maintenance}
                                showPlayButton={false}
                                placeholder={'Monthly maintenance cost*'}
                                onChangeText={maintenanceHandle}
                                keyboardType={'numeric'}
                            />
                            <CheckBoxWithTitle
                                style={{
                                    display: purpose === 2 ? "none" : "",
                                }}
                                initCheck={isUnderLoan}
                                checkStatus={currentlyUnderLoanHandle}
                                title={'Currently under loan'}
                                showPlayButton={false}
                            />
                            <OptionSelect
                                error={availabilityError}
                                initiallySelected={availability - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={availabilityHandle}
                                title={'Availabilty'}
                                options={['Immediate', 'Within 15 days', 'Within 30 days', 'After 30 days']}

                            />
                            <OptionSelect
                                error={furnishingError}
                                initiallySelected={furnishing - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={furnishingHandle}
                                title={'Furnishing'}
                                options={['Full', 'Semi', 'None']}

                            />
                            <OptionSelect
                                error={twoWheelerError}
                                initiallySelected={parkingTwoWheeler}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={parkingSlotHandle}
                                title={'Parking slot for two wheeler'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={fourWheelerError}
                                initiallySelected={parkingFourWheeler}

                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={parkingSlotFourHandle}
                                title={'Parking slot for four wheeler'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={cupboardError}
                                initiallySelected={cupboard}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={cupboardHandle}
                                title={'Cupboards'}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40,
                                }}
                                options={['0', '1', '2', '3', '4', '5']}

                            />
                            <OptionSelect
                                error={kitchenTypeError}
                                initiallySelected={kitchenType - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={kitchenTypeHandle}
                                title={'Kitchen type'}
                                options={['Modular', 'Coverd shelves', 'Open shelves']}

                            />
                            <TextArea
                                error={descriptionError}
                                value={propertyDescription}
                                numberOfLines={6}
                                showPlayButton={false}
                                placeholder={'Property Description*'}
                                onChangeText={propertyDescriptionHandle}
                            />
                            <CheckBoxWithTitle
                                initCheck={cornerProperty}
                                title={'Corner property'}
                                checkStatus={cornerPropertyHandle}
                                showPlayButton={false}
                            />


                            <OptionSelect
                                style={{
                                    display: purpose === 2 ? "none" : ""
                                }}
                                error={possessionStatusError}
                                initiallySelected={possessionStatus - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={possessionStatusHandle}
                                title={'Possession status'}
                                options={['Under construction', 'Ready to move']}

                            />
                            <Input
                                style={{
                                    display: houseType === 2 || houseType === 4 ? "none" : ""
                                }}
                                error={totalFlatError}
                                value={totalFlatsInBuilding}
                                showPlayButton={false}
                                placeholder={'Flats in building*'}
                                onChangeText={flatsInBuildingsHandle}
                                keyboardType={'numeric'}
                            />
                            <OptionSelect
                                style={{
                                    display: purpose === 1 ? "none" : "",
                                }}
                                error={tenantError}
                                initiallySelected={preferredTenants - 1}
                                showPlayButton={false}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                selectedOption={preferredTenantsHandle}
                                title={'Preferred Tenants'}
                                options={['Anyone', 'Family', 'Bachelor Male', 'bachelor female', 'company']}

                            />
                        </View>
                    </ScrollView>
                </View>

                <StepsBottom
                    onNextPress={() => nextPressHandle()}
                    onLayout={(i) => setStepsBottomHeight(i.layout.height)}
                    stepCount={5}
                    currentStep={3}/>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>

            </View>
        </SafeAreaView>
    );
};

export default Third;
