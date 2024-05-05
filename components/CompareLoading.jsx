import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme'

const CompareLoading = () => {
    const [smallCardArray, setSmallCardCountArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    return (
        <View
            style={{
                width: 180,
            }}
        >
            <View
                style={{
                    backgroundColor: theme.color.gray100,
                    height: 100,
                    width: "100%",
                    borderRadius: 10,
                    marginBottom: 20
                }}
            ></View>
            <View

                style={{
                    gap: 10
                }}>
                {
                    smallCardArray.map((i, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: theme.color.gray100,
                                    height: 61,
                                    width: "100%",
                                    borderRadius: 5,
                                }}
                            ></View>
                        )
                    })
                }


            </View>
        </View>
    )
}

export default CompareLoading
