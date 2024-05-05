import {View, ScrollView, Image, useWindowDimensions, StatusBar, SafeAreaView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react'
import theme from '../../theme'
import BackBar from '../../components/BackBar'
import InfoCard from '../../components/InfoCard'
import BuildUpAreaIcon from '../../assets/svgs/BuildUpAreaIcon'
import CarpetAreaIcon from '../../assets/svgs/CarpetAreaIcon'
import FacingIcon from '../../assets/svgs/FacingIcon'
import FlooringIcon from '../../assets/svgs/FlooringIcon'
import PropertyAgeIcon from '../../assets/svgs/PropertyAgeIcon'
import FurnishingStatusIcon from '../../assets/svgs/FurnishingStatusIcon'
import MaintenanceIcon from '../../assets/svgs/MaintenanceIcon'
import FloorIcon from '../../assets/svgs/FloorIcon'
import PowerBackupIcon from '../../assets/svgs/PowerBackupIcon'
import WaterSupplyIcon from '../../assets/svgs/WaterSupplyIcon'
import GatedSecurityIcon from '../../assets/svgs/GatedSecurityIcon'
import KitchenTypeIcon from '../../assets/svgs/KitchenTypeIcon'
import CupBoardsIcon from '../../assets/svgs/CupBoardsIcon'
import PossessionIcon from '../../assets/svgs/PossessionIcon'
import PropertyTypeIcon from '../../assets/svgs/PropertyTypeIcon'
import DaysOnAppIcon from '../../assets/svgs/DaysOnAppIcon'
import calculateDaysAgo from '../../utilities/calculateDaysAgo'
import CompareLoading from '../../components/CompareLoading'
import {useSafeAreaInsets} from "react-native-safe-area-context";


const Compare = ({route}) => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;

    const [backBarHeight, setBackBarHeight] = useState(0);
    const [properties, setProperties] = useState([])
    const [loadingArray, setLoadingArray] = useState([0, 0, 0, 0])

    const screenHeight = useWindowDimensions().height

    useEffect(() => {
        setProperties(route.params.data)
    }, [])
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
                    backgroundColor: "white",
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}
            >
                <BackBar onLayout={(i) => setBackBarHeight(i.layout.height)}/>
                <View
                    style={{
                        height: screenHeight - backBarHeight - theme.screen.paddingTop - safeRemovedTotalHeightIos,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 15,
                                    marginBottom: 15
                                }}
                            >

                                {
                                    properties.length === 0 ?
                                        loadingArray.map((i, index) => {
                                            return (
                                                <CompareLoading key={index}/>

                                            )
                                        })
                                        :
                                        <></>
                                }
                                {
                                    properties && properties.length >= 0 ?
                                        properties.map((i, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={{
                                                        width: 180,
                                                    }}
                                                >
                                                    <Image
                                                        source={i.property_photos.length > 0 ? {uri: i.property_photos[0].photos} : require('../../assets/images/house.jpg')}
                                                        style={{
                                                            height: 100,
                                                            width: "100%",
                                                            borderRadius: 10,
                                                            marginBottom: 20
                                                        }}
                                                    />
                                                    <View
                                                        style={{
                                                            gap: 10
                                                        }}
                                                    >
                                                        <InfoCard property={"Price"}
                                                                  value={i.price ? "₹" + i.price.toLocaleString() : "null"}/>
                                                        <InfoCard property={"Bedroom"}
                                                                  value={i.bedroom_count ? i.bedroom_count : "0"}/>
                                                        <InfoCard property={"Hall"}
                                                                  value={i.hall_count ? i.hall_count : "0"}/>
                                                        <InfoCard property={"Bathroom"}
                                                                  value={i.bathroom_count ? i.bathroom_count : "0"}/>
                                                        <InfoCard property={"Kitchen"}
                                                                  value={i.kitchen_count ? i.kitchen_count : "0"}/>
                                                        <InfoCard property={"Balcony"}
                                                                  value={i.balcony_count ? i.balcony_count : "0"}/>
                                                        <InfoCard
                                                            property={"Build up area"}
                                                            value={`${i.built_up_area ? i.built_up_area.toLocaleString() : "0"} sq ft`}
                                                            icon={<BuildUpAreaIcon/>}
                                                        />
                                                        <InfoCard
                                                            property={"Carpet area"}
                                                            value={`${i.carpet_area ? i.carpet_area.toLocaleString() : "0"} sq ft`}
                                                            icon={<CarpetAreaIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Furnishing status"}
                                                            value={i.furnishing && i.furnishing.furnishing ? i.furnishing.furnishing : "null"}
                                                            icon={<FurnishingStatusIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Facing"}
                                                            value={i.facing && i.facing.facing ? i.facing.facing : "null"}
                                                            icon={<FacingIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Flooring"}
                                                            value={i.flooring_type && i.flooring_type.flooring_type ? i.flooring_type.flooring_type : "null"}
                                                            icon={<FlooringIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Property age"}
                                                            value={`${i.property_age ? i.property_age : "0"} Years`}
                                                            icon={<PropertyAgeIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Maintenance"}
                                                            value={`₹${i.maintenance ? i.maintenance.toLocaleString() : "0"} / Month`}
                                                            icon={<MaintenanceIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Ownership type"}
                                                            value={i.ownership_type && i.ownership_type.ownership_type ? i.ownership_type.ownership_type : "null"}
                                                            icon={<FloorIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Power Backup"}
                                                            value={i.power_backup && i.power_backup.power_backup ? i.power_backup.power_backup : "null"}
                                                            icon={<PowerBackupIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Water Supply"}
                                                            value={i.water_supply && i.water_supply.water_supply ? i.water_supply.water_supply : "null"}
                                                            icon={<WaterSupplyIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Gated Security"}
                                                            value={i.gated_security ? "yes" : "No"}
                                                            icon={<GatedSecurityIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Kitchen Type"}
                                                            value={i.kitchen_type && i.kitchen_type.kitchen_type ? i.kitchen_type.kitchen_type : "null"}
                                                            icon={<KitchenTypeIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Cupboards"}
                                                            value={i.cupboard ? i.cupboard : "0"}
                                                            icon={<CupBoardsIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Possession"}
                                                            value={i.possession && i.possession.possession ? i.possession.possession : "null"}
                                                            icon={<PossessionIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Propery type"}
                                                            value={i.home_type && i.home_type.home_type ? i.home_type.home_type : "null"}
                                                            icon={<PropertyTypeIcon/>}

                                                        />
                                                        <InfoCard
                                                            property={"Days on app"}
                                                            value={`${i.createdAt ? calculateDaysAgo(i.createdAt) : "0"} Days`}
                                                            icon={<DaysOnAppIcon/>}

                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })
                                        :
                                        <></>
                                }


                            </View>
                        </ScrollView>
                    </ScrollView>
                </View>
                <StatusBar backgroundColor={"white"} barStyle={'dark-content'}/>

            </View>
        </SafeAreaView>
    )
}

export default Compare
