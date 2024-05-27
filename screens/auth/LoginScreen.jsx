import {StatusBar, Text, View, SafeAreaView, Pressable, Alert, Platform, Linking} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input';
import ButtonComponent from '../../components/ButtonComponent';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import apis from '../../apis/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import LeftArrow from '../../assets/svgs/LeftArrow';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpShow, setIsOtpShow] = useState(false);
    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [submitOtpLoading, setSubmitOtpLoading] = useState(false);

    const navigation = useNavigation();

    const otpAndVerify = async () => {
        try {
            setSubmitOtpLoading(true)
            const response = await apis.otpAndVerify(phone, otp);

            const authType = await AsyncStorage.getItem('authType');
            if (authType === 'signup') {
                navigation.navigate('role');
            } else {
                RNRestart.Restart();
            }

            setSubmitOtpLoading(false)
        } catch (e) {
            Alert.alert('', `${e?.response?.data?.message || 'Something went wrong'}`, [
                {text: 'OK', onPress: () => null},
            ]);
            setSubmitOtpLoading(false)
        }
    };

    const sendOtpHandle = async () => {
        try {
            setSendOtpLoading(true);
            const response = await apis.sendOtp(phone);
            setSendOtpLoading(false);
            setIsOtpShow(true);

        } catch (e) {
            Alert.alert('', `${e?.response?.data?.message || 'Something went wrong'}`, [
                {text: 'OK', onPress: () => null},
            ]);
            setSendOtpLoading(false);
        }
    };


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    paddingHorizontal: theme.screen.horizontalPadding,
                    paddingTop: theme.screen.paddingTop,
                }}>
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
                            title={'Send OTP'}/>
                        <Text
                            style={{
                                color: theme.color.black,
                                fontFamily: theme.font.regular,
                                marginTop: 20
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
                            title={'Confirm'}/>
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


                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
