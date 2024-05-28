import {View, Text, Pressable, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import theme from '../theme'
import Heart from '../assets/svgs/Heart'
import ActiveHeart from '../assets/svgs/ActiveHeart'
import DeleteIcon from '../assets/svgs/DeleteIcon'
import EditIcon from '../assets/svgs/EditIcon'
import CheckIcon from '../assets/svgs/CheckIcon'

const PropertyCard = ({
                          style, isLikeActive,
                          onPress, showCompare, ShowCloseButton, showEditButton,
                          ShowLikeButton, showInterestedPeopleButton,
                          onInterestedPeoplePress, price, bad, bath, hall, kitchen, sqft, address, listedBy,
                          days, onPressDelete, images, onHeartClick, onComparePress, compareArray, propertyId
                      }) => {
    const [isCompare, setIsCompare] = useState(false)


    useEffect(() => {
        if (compareArray && compareArray.length >= 0) {
            if (propertyId) {
                if (compareArray.includes(propertyId)) {
                    setIsCompare(true)
                } else {
                    setIsCompare(false)
                }
            }

        }
    }, [compareArray, propertyId])

    return (
        <Pressable
            onPress={() => onPress ? onPress() : null}
            style={{
                position: "relative",
                ...style
            }}
        >
            <View
                style={{
                    position: "relative"
                }}
            >
                <Image
                    source={images ? {uri: images} : require("../assets/images/house.jpg")}
                    style={{
                        height: 250,
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: 10,
                        backgroundColor: theme.color.gray200
                    }}
                />
                {
                    showCompare && showCompare === true
                        ?
                        <Pressable
                            onPress={() => {
                                onComparePress ? onComparePress() : null
                            }}
                            style={{
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                                borderRadius: 50,
                                position: "absolute",
                                bottom: 10,
                                right: 10,
                                height: 25,
                                paddingStart: 6,
                                paddingRight: 10
                            }}
                        >
                            <View
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    borderColor: theme.color.black,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isCompare ? theme.color.black : "white"
                                }}
                            >
                                {
                                    isCompare
                                        ?
                                        <CheckIcon
                                            style={{
                                                width: 9,
                                                height: 9,
                                                fill: "white"
                                            }}
                                        />
                                        :
                                        <></>
                                }
                            </View>
                            <Text
                                style={{
                                    color: theme.color.black,
                                    fontFamily: theme.font.medium,
                                    fontSize: 12
                                }}
                            >Compare</Text>

                        </Pressable>
                        :
                        <></>
                }
                {
                    showInterestedPeopleButton && showInterestedPeopleButton === true
                        ?
                        <Pressable
                            onPress={() => onInterestedPeoplePress ? onInterestedPeoplePress() : null}
                            style={{
                                height: 20,
                                paddingHorizontal: 10,
                                borderRadius: 25,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                                right: 10,
                                bottom: 10
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color.black,
                                    fontSize: 12,
                                    fontFamily: theme.font.medium,
                                    marginBottom: 1

                                }}
                            >Interested people</Text>
                        </Pressable>
                        :
                        <></>
                }

            </View>
            <View
                style={{
                    marginVertical: 10,
                    gap: 5
                }}
            >
                <Text
                    style={{
                        color: theme.color.black,
                        fontFamily: theme.font.semiBold,
                        fontSize: 18
                    }}
                >{price ? price.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0
                }) : "Null"}</Text>
                <View style={{
                    flexDirection: "row"
                }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.color.black,
                            fontFamily: theme.font.medium
                        }}>
                        <Text
                            style={{
                                fontFamily: theme.font.bold
                            }}>{bad ? bad : "0"}
                        </Text> bd
                        <Text
                            style={{
                                color: theme.color.gray200
                            }}> | </Text>
                    </Text>
                    {/*  */}
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.color.black,
                            fontFamily: theme.font.medium
                        }}>
                        <Text
                            style={{
                                fontFamily: theme.font.bold
                            }}>{bath ? bath : "0"}
                        </Text> ba
                        <Text
                            style={{
                                color: theme.color.gray200
                            }}> | </Text>
                    </Text>
                    {/*  */}
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.color.black,
                            fontFamily: theme.font.medium
                        }}>
                        <Text
                            style={{
                                fontFamily: theme.font.bold
                            }}>{hall ? hall : "0"}
                        </Text> hall
                        <Text
                            style={{
                                color: theme.color.gray200
                            }}> | </Text>
                    </Text>
                    {/*  */}
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.color.black,
                            fontFamily: theme.font.medium
                        }}>
                        <Text
                            style={{
                                fontFamily: theme.font.bold
                            }}>{kitchen ? kitchen : "0"}
                        </Text> kitchen
                        <Text
                            style={{
                                color: theme.color.gray200
                            }}> | </Text>
                    </Text>
                    {/*  */}
                    <Text
                        style={{
                            fontSize: 14,
                            color: theme.color.black,
                            fontFamily: theme.font.medium
                        }}>
                        <Text
                            style={{
                                fontFamily: theme.font.bold
                            }}>{sqft ? sqft.toLocaleString() : "0"}
                        </Text> sqft

                    </Text>
                    {/*  */}
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        color: theme.color.gray400,
                        fontFamily: theme.font.medium
                    }}
                >{address ? address : "No Address"}</Text>
                <Text
                    style={{
                        fontSize: 12,
                        color: theme.color.gray400,
                        fontFamily: theme.font.semiBold
                    }}
                >Listed by {listedBy ? listedBy : "user"}</Text>
            </View>


            {/* buttons */}
            <Pressable
                style={{
                    height: 20,
                    paddingHorizontal: 10,
                    borderRadius: 25,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    left: 10,
                    top: 10
                }}
            >
                <Text
                    style={{
                        color: theme.color.black,
                        fontSize: 12,
                        fontFamily: theme.font.medium,
                        marginBottom: 1

                    }}
                >{days ? days : "few"} days ago</Text>
            </Pressable>


            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    right: 10,
                    top: 10,
                    alignItems: "center",
                    gap: 10
                }}
            >
                {
                    ShowCloseButton
                        ?
                        <Pressable
                            onPress={() => onPressDelete ? onPressDelete() : null}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 25,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <DeleteIcon
                                style={{
                                    width: 14,
                                    height: 14,
                                    fill: theme.color.black
                                }}/>
                        </Pressable>
                        :
                        <></>
                }
                {
                    showEditButton
                        ?
                        <Pressable
                            style={{
                                height: 28,
                                borderRadius: 25,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                gap: 10
                            }}
                        >
                            <EditIcon
                                style={{
                                    width: 14,
                                    height: 14,
                                    fill: theme.color.black
                                }}/>
                            <Text
                                style={{
                                    color: theme.color.black,
                                    fontSize: 12,
                                    fontFamily: theme.font.medium

                                }}
                            >Edit</Text>

                        </Pressable>
                        :
                        <></>
                }
                {
                    ShowLikeButton
                        ?
                        <Pressable
                            onPress={() => onHeartClick ? onHeartClick() : null}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 25,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {
                                isLikeActive
                                    ? <ActiveHeart
                                        style={{
                                            width: 14,
                                            height: 14,
                                            fill: theme.color.black
                                        }}
                                    />
                                    : <Heart
                                        style={{
                                            width: 14,
                                            height: 14,
                                            fill: theme.color.black
                                        }}/>
                            }

                        </Pressable>
                        :
                        <></>
                }

            </View>

            <></>


        </Pressable>
    )
}

export default PropertyCard
