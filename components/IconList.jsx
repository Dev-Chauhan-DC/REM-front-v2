import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LiftIcon from '../assets/svgs/LiftIcon'
import theme from '../theme'
import ACIcon from '../assets/svgs/ACIcon'
import ClubIcon from '../assets/svgs/ClubIcon'
import PlaygroundIcon from '../assets/svgs/PlaygroundIcon'
import GasLineIcon from '../assets/svgs/GasLineIcon'
import WifiIcon from '../assets/svgs/WifiIcon'
import SewageIcon from '../assets/svgs/SewageIcon'
import FireAlarmIcon from '../assets/svgs/FireAlarmIcon'
import HouseKeeperIcon from '../assets/svgs/HouseKeeper'
import ShoppingCenterIcon from '../assets/svgs/ShoppingCenterIcon'
import SwimmingpoolIcon from '../assets/svgs/SwimmingPoolIcon'
import IntercomIcon from '../assets/svgs/IntercomIcon'
import RainWaterHarvestingIcon from '../assets/svgs/RainWaterHarvestingIcon'
import ParkIcon from '../assets/svgs/ParkIcon'
import ParkingIcon from '../assets/svgs/ParkingIcon'

const IconList = ({ icon, text }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }}>
            {icon === "lift" ? <LiftIcon style={styles.iconStyle} /> : <></>}
            {icon === "air conditioner" ? <ACIcon style={styles.iconStyle} /> : <></>}
            {icon === "club" ? <ClubIcon style={styles.iconStyle} /> : <></>}
            {icon === "playground" ? <PlaygroundIcon style={styles.iconStyle} /> : <></>}
            {icon === "gas" ? <GasLineIcon style={styles.iconStyle} /> : <></>}
            {icon === "internet" ? <WifiIcon style={styles.iconStyle} /> : <></>}
            {icon === "sewage" ? <SewageIcon style={styles.iconStyle} /> : <></>}
            {icon === "fire alarm" ? <FireAlarmIcon style={styles.iconStyle} /> : <></>}
            {icon === "house keeper" ? <HouseKeeperIcon style={styles.iconStyle} /> : <></>}
            {icon === "shopping center" ? <ShoppingCenterIcon style={styles.iconStyle} /> : <></>}
            {icon === "swimming pool" ? <SwimmingpoolIcon style={styles.iconStyle} /> : <></>}
            {icon === "intercom" ? <IntercomIcon style={styles.iconStyle} /> : <></>}
            {icon === "rain water harvesting " ? <RainWaterHarvestingIcon style={styles.iconStyle} /> : <></>}
            {icon === "park" ? <ParkIcon style={styles.iconStyle} /> : <></>}
            {icon === "visitor parking" ? <ParkingIcon style={styles.iconStyle} /> : <></>}
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 20,
        height: 20,
        fill: theme.color.black
    },
    textStyle: {
        color: theme.color.black,
        fontFamily: theme.font.medium,
        fontSize: 14,
        textTransform: "capitalize"
    }

})
export default IconList

