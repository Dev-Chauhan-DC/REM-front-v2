import { View, Text, Pressable, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import { useRecoilState } from 'recoil'
import { loginShowState } from '../../atoms/login'
import theme from '../../theme'
import LogoSvg from '../../assets/svgs/LogoSvg'
import Input from '../Input'
import ButtonComponent from '../ButtonComponent'
import LeftArrow from '../../assets/svgs/LeftArrow'
import apis from '../../apis/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userState } from '../../atoms/profile/user'



const LoginModal = () => {
    const [show, setShow] = useRecoilState(loginShowState);
    const [user, setUser] = useRecoilState(userState);
    const [isOtpShow, setIsOtpShow] = useState(false);
    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [submitOtpLoading, setSubmitOtpLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');



    const defaultStateHandle = () => {
        setIsOtpShow(false)
        setSendOtpLoading(false)
        setSubmitOtpLoading(false)
        setPhone('')
        setOtp('')
    }


    const otpAndVerify = async () => {
        try {
            setSubmitOtpLoading(true)
            const response = await apis.otpAndVerify(phone, otp);
            const result = await apis.getUser();
            setUser(result.data.data);
            setSubmitOtpLoading(false);
            setShow(false);
            defaultStateHandle()
        } catch (e) {
            setSubmitOtpLoading(false)
        }
    };

    const sendOtpHandle = async () => {
        try {
            setSendOtpLoading(true);
            await apis.sendOtp(phone);
            setSendOtpLoading(false);
            setIsOtpShow(true);

        } catch (e) {
            setSendOtpLoading(false);
        }
    };


    return (
        <Modal
            onOutsidePress={() => setShow(false)}
            visible={show}
            style={{
                borderRadius: 10
            }}
        >
            <View
                style={{
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}>
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <LogoSvg
                        width={100}
                    />
                </View>
                <View
                    style={{
                        gap: 8,
                        marginBottom: 20,
                    }}>
                    <View
                        style={{
                            gap: 8,
                            marginBottom: 20,
                            display: isOtpShow ? 'none' : '',
                        }}
                    >

                        <Input
                            onChangeText={i => {
                                setPhone(i);
                            }}
                            keyboardType={'phone-pad'}
                            placeholder={'Phone'}

                        />
                        <ButtonComponent
                            isLoading={sendOtpLoading}
                            onPress={sendOtpHandle}
                            title={'Send OTP'} />
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.regular,
                                marginTop: 20,
                                textAlign: 'center'
                            }}
                        >By continuing, you agree to the
                            <Text
                                onPress={() => Linking.openURL('https://real-estate-properties.s3.us-east-2.amazonaws.com/REM/TermsofService_REM_.html')}
                                style={{
                                    color: theme.color.primary,
                                    fontFamily: theme.font.semiBold
                                }}
                            > Terms of Services</Text> and
                            <Text
                                onPress={() => Linking.openURL('https://real-estate-properties.s3.us-east-2.amazonaws.com/REM/Privacypolicy_REM_.html')}
                                style={{
                                    color: theme.color.primary,
                                    fontFamily: theme.font.semiBold
                                }}
                            > Privacy Policy</Text>.
                        </Text>
                    </View>
                    <View
                        style={{
                            gap: 8,
                            marginBottom: 20,
                            display: isOtpShow ? '' : 'none',
                        }}
                    >
                        <Input
                            onChangeText={(i) => setOtp(i)}
                            keyboardType={'numeric'}
                            placeholder={'Otp'}
                            textInputStyle={{
                                marginHorizontal: Platform.OS === "ios" ? 0 : 20,
                            }}
                        />
                        <ButtonComponent
                            isLoading={submitOtpLoading}
                            onPress={otpAndVerify}
                            title={'Confirm'} />
                        <Pressable
                            onPress={() => setIsOtpShow(false)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                                justifyContent: 'flex-end',
                                marginTop: 20,
                            }}
                        >
                            <LeftArrow
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                            <Text
                                style={{
                                    color: theme.color.black,
                                    fontFamily: theme.font.semiBold,
                                }}
                            >Re-enter Phone number</Text>
                        </Pressable>
                    </View>
                </View>


            </View>
            <StatusBar backgroundColor={'rgba(255, 255, 255, 0.3)'} />

        </Modal>
    )
}

export default LoginModal