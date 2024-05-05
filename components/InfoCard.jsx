import { View, Text } from 'react-native'
import React from 'react'
import theme from '../theme'
import BuildUpAreaIcon from '../assets/svgs/BuildUpAreaIcon'

const InfoCard = ({ style, icon, property, value }) => {


   
    return (
        <View
            style={{
                backgroundColor: theme.color.gray100,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 10,
                ...style
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                }}
            >

                {icon ?
                
                    React.cloneElement(icon, {
                        style: {
                            width: 20,
                            height: 20,
                            fill: theme.color.gray400,
                        },
                    })
                    :
                    <></>
                }

                <View
                    style={{
                        gap: 5,
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: theme.font.semiBold,
                            color: theme.color.black,
                            textTransform: "capitalize"
                        }}
                    >{value}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: theme.font.medium,
                            color: theme.color.gray400
                        }}
                    >{property}</Text>
                </View>
            </View>
        </View>
    )
}

export default InfoCard