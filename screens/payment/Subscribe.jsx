import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    useWindowDimensions,
    Alert,
    Pressable, ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme';
import ButtonComponent from '../../components/ButtonComponent';
import SmallInput from '../../components/SmallInput';
import apis from '../../apis/apis';
import razorpayApis from '../../apis/razorpayApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Subscribe = ({refreash}) => {
  const [couponValue, setCouponValue] = useState('');

  const {width, height} = useWindowDimensions();

  const subscribeHandle = async () => {
    try {
      const data = {
        couponCode: couponValue,
        planId: 3,
      };
      const getOrderId = await apis.generateOrderId(data);

      if (getOrderId.data.success && getOrderId.data.data.id !== 'free') {
        const options = {
          amount: getOrderId.data.data.amount,
          orderId: getOrderId.data.data.id,
        };

        const checkOut = await razorpayApis.checkOut(options);

        if (checkOut) {
          const dataSec = {
            planId: data.planId,
            orderId: checkOut.razorpay_order_id,
            segnatureId: checkOut.razorpay_signature,
            paymentId: checkOut.razorpay_payment_id,
            paidAmount: getOrderId.data.data.amount,
            couponId: getOrderId.data.data.couponId,
          };

          const createSubscription = await apis.createSubscription(dataSec);

          if (createSubscription.data.success) {
            Alert.alert(
              createSubscription?.data?.message || 'something went wrong',
            );
            refreash();
          } else {
            Alert.alert(
              createSubscription?.data?.message || 'something went wrong',
            );
          }
        } else {
            ToastAndroid.show("Payment cancel", ToastAndroid.SHORT);
        }
      } else if (
        getOrderId.data.success &&
        getOrderId.data.data.id === 'free'
      ) {
        const dataSec = {
          planId: data.planId,
          orderId: 'free',
          segnatureId: 'free',
          paymentId: 'free',
          paidAmount: 0,
          couponId: getOrderId.data.data.couponId,
        };

        const createSubscription = await apis.createSubscription(dataSec);

        if (createSubscription.data.success) {
          Alert.alert(
            createSubscription?.data?.message || 'something went wrong',
          );
          refreash();
        } else {
          Alert.alert(
            createSubscription?.data?.message || 'something went wrong',
          );
        }
      } else {
        Alert.alert('something went wrong');
      }
    } catch (e) {
        ToastAndroid.show(e?.response?.data?.message || 'Something went wrong', ToastAndroid.SHORT);
    }
  };

  const LogoutHandle = async () => {
    await AsyncStorage.setItem('token', '');
    RNRestart.Restart();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: theme.screen.horizontalPadding,
        justifyContent: 'center',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: height,
          }}>
          <Image
            style={{
              width: '100%',
              objectFit: 'contain',
              height: height / 2,
            }}
            source={require('../../assets/images/subscribe.png')}
          />
          <Text
            style={{
              fontFamily: theme.font.medium,
              color: theme.color.gray400,
              fontSize: 12,
              marginTop: 25,
              alignSelf: 'center',
            }}>
            Access India’s all Residential Property
          </Text>
          <ButtonComponent
            onPress={subscribeHandle}
            title={couponValue.length === 0 ? '₹100 for 15 days' : "Apply Coupon"}
            style={{
              width: '100%',
              marginTop: 7,
                backgroundColor: couponValue.length === 0 ? theme.color.primary : theme.color.black
            }}
            titleStyle={{
              fontFamily: theme.font.semiBold,
            }}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <SmallInput
              onChangeText={i => setCouponValue(i)}
              style={{
                marginTop: 20,
              }}
              placeholder={'Apply coupon'}
            />
          </View>
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
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
    </View>
  );
};

export default Subscribe;
