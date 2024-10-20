import { View, Text, ScrollView, Pressable, StatusBar, ToastAndroid, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import Input from '../../components/Input';
import ButtonComponent from '../../components/ButtonComponent';
import BackBar from '../../components/BackBar';
import apis from '../../apis/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/profile/user';
import { useNavigation } from '@react-navigation/native';

const ProfileInfo = () => {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [phoneNumber, setPhoneNumber] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [secondaryNumber, setSecondaryNumber] = useState(' ');
    const [agencyName, setAgencyName] = useState(' ');
    const [aadhaar, setAadhaar] = useState(' ');
    const [companyName, setCompanyName] = useState(' ');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const navigation = useNavigation();


    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await apis.getUser();

            if (response && response.data && response.data.data) {
                const userData = response?.data?.data || {};
                setUser(userData);
                setLoading(false);
            }
        } catch (e) {
            ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
        }
    };

    const LogoutHandle = async () => {
        await AsyncStorage.setItem('token', '');
        setUser(null);
        navigation.navigate('home')
    };

    const updateHandle = async () => {
        try {
            setLoading(true);
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                secondaryNumber: secondaryNumber,
                agencyName: agencyName,
                aadhaarNumber: aadhaar,
                companyName: companyName,
                avatar: 'https://picsum.photos/id/237/200/300',
            };

            await apis.updateProfileInfo(data);
            fetchUser();
            setLoading(false);
            ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);

        } catch (e) {
            ToastAndroid.show(e?.response?.data?.data?.[0]?.msg || 'Something went wrong', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        setFirstName(user?.first_name || '');
        setLastName(user?.last_name || '');
        setEmail(user?.email || '');
        setPhoneNumber(user?.phone_number || '');
        setSecondaryNumber(user?.secondary_number || '');
        setAgencyName(user?.agency_name || '');
        setAadhaar(user?.aadhaar_number || '');
        setCompanyName(user?.company_name || '');
    }, []);
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
                }}>
                <ScrollView>
                    <BackBar />

                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: theme.font.semiBold,
                            color: theme.color.black,
                            marginBottom: 30,
                        }}>
                        Profile information
                    </Text>
                    <View
                        style={{
                            gap: 16,
                            marginBottom: 16,
                        }}>
                        <Input
                            value={firstName}
                            onChangeText={i => {
                                setFirstName(i);
                            }}
                            placeholder={'First name'}
                        />
                        <Input
                            value={lastName}
                            onChangeText={i => {
                                setLastName(i);
                            }}
                            placeholder={'Last name'}
                        />
                        <Input value={phoneNumber} placeholder={'Phone'} />
                        <Input
                            keyboardType={'email-address'}
                            value={email}
                            onChangeText={i => {
                                setEmail(i);
                            }}
                            placeholder={'Email'}
                        />
                        <Input
                            keyboardType={'numeric'}
                            value={secondaryNumber}
                            onChangeText={i => {
                                setSecondaryNumber(i);
                            }}
                            placeholder={'Secondary number'}
                        />
                        <Input
                            keyboardType={'numeric'}
                            value={aadhaar}
                            onChangeText={i => {
                                setAadhaar(i);
                            }}
                            placeholder={'Aadhaar card number'}
                        />
                        <Input
                            value={agencyName}
                            onChangeText={i => {
                                setAgencyName(i);
                            }}
                            placeholder={'Your agency name'}
                        />
                        <Input
                            value={companyName}
                            onChangeText={i => {
                                setCompanyName(i);
                            }}
                            placeholder={'Your company name'}
                        />
                        <ButtonComponent
                            isLoading={loading}
                            onPress={updateHandle}
                            style={{
                                backgroundColor: theme.color.black,
                            }}
                            title={'Update Information'}
                        />
                        <Pressable onPress={LogoutHandle}>
                            <Text
                                style={{
                                    color: theme.color.locationRed,
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontFamily: theme.font.medium,
                                    padding: 10,
                                }}>
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            </View>
        </SafeAreaView>
    );
};

export default ProfileInfo;
