import {View, ScrollView, useWindowDimensions, StatusBar, SafeAreaView, Platform} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import OptionSelect from '../../components/OptionSelect';
import StepsBottom from '../../components/StepsBottom';
import AmenitiesListing from '../../components/AmenitiesListing';
import ACIcon from '../../assets/svgs/ACIcon';
import ClubIcon from '../../assets/svgs/ClubIcon';
import PlaygroundIcon from '../../assets/svgs/PlaygroundIcon';
import GasLineIcon from '../../assets/svgs/GasLineIcon';
import WifiIcon from '../../assets/svgs/WifiIcon';
import SewageIcon from '../../assets/svgs/SewageIcon';
import LiftIcon from '../../assets/svgs/LiftIcon';
import FireAlarmIcon from '../../assets/svgs/FireAlarmIcon';
import HouseKeeperIcon from '../../assets/svgs/HouseKeeper';
import ParkIcon from '../../assets/svgs/ParkIcon';
import ShoppingCenterIcon from '../../assets/svgs/ShoppingCenterIcon';
import SwimmingpoolIcon from '../../assets/svgs/SwimmingPoolIcon';
import IntercomIcon from '../../assets/svgs/IntercomIcon';
import ParkingIcon from '../../assets/svgs/ParkingIcon';
import RainWaterHarvestingIcon from '../../assets/svgs/RainWaterHarvestingIcon';
import {useRecoilState} from 'recoil';
import {
    amenityArrayState,
    gatedSecurityState,
    gymState,
    powerBackupState,
    waterSupplyState,
} from '../../atoms/listing/fourth';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Forth = () => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const navigation = useNavigation();
    const screenHeight = useWindowDimensions().height;
    const [stepsBottomHeight, setStepsBottomHeight] = useState(0);

    const [gatedSecurity, setGatedSecurity] = useRecoilState(gatedSecurityState);
    const [gym, setGym] = useRecoilState(gymState);
    const [waterSupply, setWaterSupply] = useRecoilState(waterSupplyState);
    const [powerBackup, setPowerBackup] = useRecoilState(powerBackupState);
    const [amenities, setAmenities] = useRecoilState(amenityArrayState);

    const gatedSecurityHandle = (i, index) => setGatedSecurity(!index ? 1 : 0);

    const gymHandle = (i, index) => setGym(!index ? 1 : 0);

    const waterSupplyHandle = (i, index) => setWaterSupply(index + 1);

    const powerBackupHandle = (i, index) => setPowerBackup(index + 1);

    const amenityHandle = i => setAmenities(i);


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

                            <OptionSelect
                                error={''}
                                initiallySelected={gatedSecurity ? 0 : 1}
                                title={'Gated Security *'}
                                options={['Yes', 'No']}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                showPlayButton={false}
                                selectedOption={gatedSecurityHandle}
                            />
                            <OptionSelect
                                error={''}
                                initiallySelected={gym ? 0 : 1}
                                title={'Gym *'}
                                options={['Yes', 'No']}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                showPlayButton={false}
                                selectedOption={gymHandle}
                            />
                            <OptionSelect
                                error={''}
                                initiallySelected={waterSupply - 1}
                                title={'Water Supply'}
                                options={['Corporation', 'Borewell', 'Both']}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                showPlayButton={false}
                                selectedOption={waterSupplyHandle}
                            />
                            <OptionSelect
                                error={''}
                                initiallySelected={powerBackup - 1}
                                title={'Power Backup'}
                                options={['Full', 'Partial', 'None']}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                }}
                                showPlayButton={false}
                                selectedOption={powerBackupHandle}
                            />
                            <AmenitiesListing
                                initArray={amenities}
                                onChangeArray={amenityHandle}
                                showPlayButton={false}
                                iconList={[<ACIcon/>, <ClubIcon/>, <PlaygroundIcon/>, <GasLineIcon/>, <WifiIcon/>,
                                    <SewageIcon/>, <LiftIcon/>, <FireAlarmIcon/>, <HouseKeeperIcon/>, <ParkIcon/>,
                                    <ShoppingCenterIcon/>, <SwimmingpoolIcon/>, <IntercomIcon/>, <ParkingIcon/>,
                                    <RainWaterHarvestingIcon/>]}
                                titleList={['Air Conditioner', 'Club', 'Playground', 'Gas', 'Internet', 'Sewage', 'Lift', 'Fire Alarm', 'House Keeper', 'Park', 'Shopping Center', 'Swimming pool', 'Intercom', 'Visitor parking', 'Rain water harvesting']}
                            />
                        </View>
                    </ScrollView>
                </View>


                <StepsBottom
                    onNextPress={() => navigation.navigate('fifth')}
                    onLayout={(i) => setStepsBottomHeight(i.layout.height)}
                    stepCount={5}
                    currentStep={4}/>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>

            </View>
        </SafeAreaView>
    );
};

export default Forth;
