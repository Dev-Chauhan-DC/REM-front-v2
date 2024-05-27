import {View, useWindowDimensions, ScrollView, SafeAreaView, Platform} from 'react-native'
import React, {useEffect, useState} from 'react'
import theme from '../../theme'
import SelectToggle from '../../components/SelectToggle'
import ApartmentIcon from '../../assets/svgs/ApartmentIcon'
import GateIcon from '../../assets/svgs/GateIcon'
import BuildingIcon from '../../assets/svgs/BuildingIcon'
import HouseIcon from '../../assets/svgs/HouseIcon'
import CheckBoxWithTitle from '../../components/CheckBoxWithTitle'
import MultipleOptionSelectWithIcon from '../../components/MultipleOptionSelectWithIcon'
import MultipleOptionSelect from '../../components/MultipleOptionSelect'
import TwoInputs from '../../components/TwoInputs'
import objectToQueryString from '../../utilities/objectToQueryString'
import ButtonComponent from '../../components/ButtonComponent'
import {useNavigation} from '@react-navigation/native'
import {useSafeAreaInsets} from "react-native-safe-area-context";


const Filter = ({route, onCancelPress, onFilterApply}) => {
    const insets = useSafeAreaInsets();
    const safeRemovedTotalHeightIos = Platform.OS === "ios" ? insets.top + insets.bottom : 0;
    const safeRemovedBottomHeightIos = Platform.OS === "ios" ? insets.bottom : 0;

    const navigation = useNavigation()
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0)
    // filters
    const [purposeId, setPurposeId] = useState(1)
    const [homeTypeId, setHomeTypeId] = useState(null)
    const [userRoleId, setuserRoleId] = useState(null)
    const [priceRangeFirst, setPriceRangeFirst] = useState(null)
    const [priceRangeSecond, setPriceRangeSecond] = useState(null)
    const [bedroomCount, setBedroomCount] = useState(null)
    const [bathroomCount, setBathroomCount] = useState(null)
    const [hallCount, setHallCount] = useState(null)
    const [kitchenCount, setKitchenCount] = useState(null)
    const [balconyCount, setBalconyCount] = useState(null)

    const [builtUpAreaF, setBuiltUpAreaF] = useState(null)
    const [builtUpAreaS, setBuiltUpAreaS] = useState(null)

    const [maintenanceF, setMaintenanceF] = useState(null)
    const [maintenanceS, setMaintenanceS] = useState(null)

    const [propertyAgeF, setPropertyAgeF] = useState(null)
    const [propertyAgeS, setPropertyAgeS] = useState(null)

    const [daysOnAppF, setDaysOnAppF] = useState(null)
    const [daysOnAppS, setDaysOnAppS] = useState(null)


    const [parkingSlotTwoWheelerCount, setParkingSlotTwoWheelerCount] = useState(null)
    const [parkingSlotFourWheelerCount, setParkingSlotFourWheelerCount] = useState(null)

    const [totalFloorF, setTotalFloorF] = useState(null)
    const [totalFloorS, setTotalFloorS] = useState(null)

    const [propertyFloorF, setPropertyFloorF] = useState(null)
    const [propertyFloorS, setPropertyFloorS] = useState(null)

    const [availabilityTypeId, setAvailabilityTypeId] = useState(null)
    const [furnishingsId, setFurnishingsId] = useState(null)
    const [facingId, setFacingId] = useState(null)


    const [cornerProperty, setCornerProperty] = useState(null)
    const [verifiedProperty, setVerifiedProperty] = useState(null)
    const [agentCertification, setAgentCertification] = useState(null)
    const [possessionsId, setPossessionsId] = useState(null)
    const [tenantsId, setTenantsId] = useState(null)

    const screenHeight = useWindowDimensions().height

    let filters = {
        purposeId: purposeId.toString(),
        homeTypeId,
        userRoleId,
        priceRange: `${priceRangeFirst}-${priceRangeSecond}`,
        bedroomCount,
        bathroomCount,
        hallCount,
        kitchenCount,
        balconyCount,
        builtUpArea: `${builtUpAreaF}-${builtUpAreaS}`,
        maintenance: `${maintenanceF}-${maintenanceS}`,
        propertyAge: `${propertyAgeF}-${propertyAgeS}`,
        daysOnApp: `${daysOnAppF}-${daysOnAppS}`,
        parkingSlotTwoWheelerCount,
        parkingSlotFourWheelerCount,
        totalFloor: `${totalFloorF}-${totalFloorS}`,
        propertyFloor: `${propertyFloorF}-${propertyFloorS}`,
        availabilityTypeId,
        furnishingsId,
        facingId,
        cornerProperty,
        verifiedProperty,
        agentCertification,
        possessionsId,
        tenantsId
    }





    const filtersHandle = () => {
        const queryStr = objectToQueryString(filters)
        onFilterApply ? onFilterApply(queryStr) : null
    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white"
            }}
        >
            {/* <Button title='data' onPress={getData} /> */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}
            >
                <View
                    style={{
                        height: screenHeight - theme.screen.paddingTop - safeRemovedTotalHeightIos - bottomSheetHeight,
                        backgroundColor: "white"

                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                gap: 45,
                                paddingBottom: 45 + bottomSheetHeight
                            }}
                        >
                            {/* single value */}
                            <SelectToggle
                                style={{
                                    marginBottom: 25,
                                    marginTop: 20
                                }}
                                twoOption={["buy", "rent"]}
                                selectedOption={(i, index) => {
                                    setPurposeId(index + 1)
                                }}

                            />
                            {/* array */}
                            <MultipleOptionSelectWithIcon
                                title={"House Type"}
                                iconList={[<ApartmentIcon/>, <GateIcon/>, <BuildingIcon/>, <HouseIcon/>]}
                                optionsList={["apartment", "gated community Villa", "standalone building", "independent house / villa"]}
                                selectedOption={(array) => setHomeTypeId(array)}
                            />
                            {/* array */}
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(array) => setuserRoleId(array)}
                                title={"Listed by"}
                                options={["Owner", "Builder", "Agent"]}

                            />
                            {/* <TwoCursorProgressBar title={"Price"} /> */}
                            {/* done */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 1000000"}
                                secondPlaceholder={"Ex. 2000000"}
                                firstValue={(i) => setPriceRangeFirst(i)}
                                secondValue={(i) => setPriceRangeSecond(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Price Range"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />

                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setBedroomCount(i)}
                                title={"Bedrooms"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setBathroomCount(i)}
                                title={"Bathrooms"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setHallCount(i)}
                                title={"Hall"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setKitchenCount(i)}
                                title={"Kitchen"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setBalconyCount(i)}
                                title={"Balcony"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />


                            {/* <TwoCursorProgressBar title={"Square foot"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 1000"}
                                secondPlaceholder={"Ex. 2000"}
                                firstValue={(i) => setBuiltUpAreaF(i)}
                                secondValue={(i) => setBuiltUpAreaS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Square foot"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />
                            {/* <TwoCursorProgressBar title={"Total maintenance (Monthly)"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 500"}
                                secondPlaceholder={"Ex. 600"}
                                firstValue={(i) => setMaintenanceF(i)}
                                secondValue={(i) => setMaintenanceS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Total maintenance (Monthly)"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />
                            {/* <TwoCursorProgressBar title={"Property age"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 1"}
                                secondPlaceholder={"Ex. 7"}
                                firstValue={(i) => setPropertyAgeF(i)}
                                secondValue={(i) => setPropertyAgeS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Property age"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />
                            {/* <TwoCursorProgressBar title={"Days on app"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 5"}
                                secondPlaceholder={"Ex. 10"}
                                firstValue={(i) => setDaysOnAppF(i)}
                                secondValue={(i) => setDaysOnAppS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Days on app"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setParkingSlotFourWheelerCount(i)}
                                title={"Parking slot for 4 wheeler"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setParkingSlotTwoWheelerCount(i)}
                                title={"Parking slot for 2 wheeler"}
                                optionStyle={{
                                    paddingHorizontal: 0,
                                    width: 40
                                }}
                                options={["1", "2", "3", "4", "5", "6"]}

                            />
                            {/* <TwoCursorProgressBar title={"Total floors"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 0"}
                                secondPlaceholder={"Ex. 5"}
                                firstValue={(i) => setTotalFloorF(i)}
                                secondValue={(i) => setTotalFloorS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Total floors"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />

                            {/* <TwoCursorProgressBar title={"Property floor"} /> */}
                            <TwoInputs
                                firstPlaceholder={"Ex. 0"}
                                secondPlaceholder={"Ex. 5"}
                                firstValue={(i) => setPropertyFloorF(i)}
                                secondValue={(i) => setPropertyFloorS(i)}
                                firstInputKeyboardType={"numeric"}
                                secondInputKeyboardType={"numeric"}
                                betweenText={"To"}
                                title={"Property floor"}
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                            />

                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setAvailabilityTypeId(i)}
                                title={"Availability"}
                                options={["Immediate", "Within 15 days", "Within 30 days", "After 30 days"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setFurnishingsId(i)}
                                title={"Furnishing"}
                                options={["Full", "Semi", "None"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setFacingId(i)}
                                title={"Facing"}
                                options={["North", "South", "East", "West", "North - West", "North - East", "South - West", "South - East"]}

                            />
                            <CheckBoxWithTitle
                                title={"Corner property"}
                                checkStatus={(i) => setCornerProperty(i ? "1" : null)}
                            />
                            {/*<CheckBoxWithTitle*/}
                            {/*    title={"Show only verified property"}*/}
                            {/*    checkStatus={(i) => setVerifiedProperty(i ? "1" : null)}*/}
                            {/*/>*/}
                            {/*<CheckBoxWithTitle*/}
                            {/*    title={"Posted property by certified agent "}*/}
                            {/*    checkStatus={(i) => setAgentCertification(i ? "1" : null)}*/}
                            {/*/>*/}

                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setPossessionsId(i)}
                                title={"Possession status"}
                                options={["Under construction", "Ready to move"]}

                            />
                            <MultipleOptionSelect
                                titleStyle={{
                                    fontSize: 16,
                                    fontFamily: theme.font.medium
                                }}
                                selectedOption={(i) => setTenantsId(i)}
                                title={"Preferred Tenants"}
                                options={["Anyone", "Family", "Bachelor Male", "bachelor female", "company"]}

                            />


                        </View>
                    </ScrollView>
                </View>

            </View>


            <View
                onLayout={(event) => setBottomSheetHeight(event.nativeEvent.layout.height)}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingBottom: 10,
                    paddingTop: 10,
                    alignItems: "center",
                    backgroundColor: "white",
                    marginBottom: safeRemovedTotalHeightIos


                }}
            >

                <ButtonComponent
                    onPress={() => onCancelPress ? onCancelPress() : null}
                    title={"Cancel"}
                    style={{
                        height: 40,
                        paddingHorizontal: 20,
                        backgroundColor: "white"
                    }}
                    titleStyle={{
                        fontFamily: theme.font.medium,
                        color: theme.color.black
                    }}

                />
                <ButtonComponent
                    onPress={filtersHandle}
                    title={"Apply Filters"}
                    style={{
                        height: 40,
                        paddingHorizontal: 20
                    }}
                    titleStyle={{
                        fontFamily: theme.font.medium
                    }}

                />

            </View>
        </View>
    )
}

export default Filter
