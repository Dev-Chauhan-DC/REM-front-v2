import {View, Text, ToastAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/auth/LoginScreen';
import Role from './screens/auth/Role';
import ListView from './screens/search/ListView';
import Search from './screens/search/Search';
import Like from './screens/like/Like';
import Profile from './screens/profile/Profile';
import ProfileInfo from './screens/profile/ProfileInfo';
import PropertyInfo from './screens/search/PropertyInfo';
import Compare from './screens/like/Compare';
import MapViewScreen from './screens/search/MapView';
import Images from './screens/search/Images';
import First from './screens/listing/First';
import Second from './screens/listing/Second';
import Third from './screens/listing/Third';
import Fourth from './screens/listing/Fourth';
import Fifth from './screens/listing/Fifth';
import Filter from './screens/search/Filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apis from './apis/apis';
import Home from './screens/search/Home';
import LogoScreen from './screens/auth/LogoScreen';
import Subscribe from './screens/payment/Subscribe';
import ListPropertyPlan from './screens/payment/ListPropertyPlan';
import {RecoilRoot} from 'recoil';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isResponse, setIsResponse] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isUserSubscription, setIsUserSubscription] = useState(false);

  const getUser = async () => {
    try {
      const response = await apis.getUser();

      setIsUser(true);
      setIsResponse(true);
      subscriptionHandle();
    } catch (e) {
      Alert.alert('', `${e?.response?.data?.message || 'Something went wrong'}`, [
        {text: 'OK', onPress: () => null},
      ]);
      setIsUser(false);
      setIsResponse(true);
    }
  };

  const subscriptionHandle = async () => {
    try {
      setIsResponse(false);
      const isSubscription = await apis.isUserSubscriptionActive();

      if (isSubscription.data.success) {
        setIsUserSubscription(true);
      } else {
        setIsUserSubscription(false);
      }
      setIsResponse(true);
    } catch (e) {
      setIsUserSubscription(false);
      console.warn(e);
      setIsResponse(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!isResponse) {
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="logoScreen" component={LogoScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  } else {
    if (isUser) {
      if (isUserSubscription) {
        return (
            <RecoilRoot>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen
                      name="home"
                      options={{animation: 'none'}}
                      component={Home}
                  />
                  <Stack.Screen name="search" component={Search}/>
                  <Stack.Screen
                      name="like"
                      options={{animation: 'none'}}
                      component={Like}
                  />
                  <Stack.Screen
                      name="profile"
                      options={{animation: 'none'}}
                      component={Profile}
                  />
                  <Stack.Screen name="profileInfo" component={ProfileInfo}/>
                  <Stack.Screen name="propertyInfo" component={PropertyInfo}/>
                  <Stack.Screen name="compare" component={Compare}/>
                  <Stack.Screen name="images" component={Images}/>
                  <Stack.Screen name="first" component={First}/>
                  <Stack.Screen
                      name="second"
                      options={{animation: 'none'}}
                      component={Second}
                  />
                  <Stack.Screen
                      name="third"
                      options={{animation: 'none'}}
                      component={Third}
                  />
                  <Stack.Screen
                      name="fourth"
                      options={{animation: 'none'}}
                      component={Fourth}
                  />
                  <Stack.Screen
                      name="fifth"
                      options={{animation: 'none'}}
                      component={Fifth}
                  />
                  <Stack.Screen name="filter" component={Filter}/>
                </Stack.Navigator>
              </NavigationContainer>
            </RecoilRoot>
        );
      } else {
        return (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {/* <Stack.Screen name="subscribe" component={<Subscribe />} /> */}
                <Stack.Screen name="subscribe">
                  {props => (
                      <Subscribe refreash={() => subscriptionHandle()} {...props} />
                  )}
                </Stack.Screen>
                <Stack.Screen
                    name="listpropertyplan"
                    component={ListPropertyPlan}
                />
              </Stack.Navigator>
            </NavigationContainer>
        );
      }
    } else {
      return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="login" component={LoginScreen}/>
              <Stack.Screen name="role" component={Role}/>
            </Stack.Navigator>
          </NavigationContainer>
      );
    }
  }
};

export default App;
