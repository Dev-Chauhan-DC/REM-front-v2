import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import OptionSelect from '../../components/OptionSelect';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import apis from '../../apis/apis';
import RNRestart from 'react-native-restart';

const Role = () => {
  const [roleResponse, setRoleResponse] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(1);

  const getRolesApi = async () => {
    try {
      const response = await apis.getRoles();

      const data = response?.data?.data || [];

      setRoleResponse(data);

      const roleArry = [];

      for (let i = 0; i < data.length; i++) {
        roleArry.push(data[i].role);
      }

      setRolesList(roleArry);
    } catch (e) {
      console.warn(e?.response?.data?.message || 'Something went wrong');
    }
  };

  const selectedOption = (str, index) => {
    setSelectedRole(roleResponse[index].id);
  };

  const formSubmitHandle = async () => {
    try {
      const response = await apis.updateRoles(selectedRole);

      RNRestart.Restart();
    } catch (e) {
      console.warn(e?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getRolesApi();
  }, []);

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
        <OptionSelect
          selectedOption={selectedOption}
          style={{
            marginBottom: 30,
          }}
          title={'Role'}
          options={rolesList}
        />
        <ButtonComponent onPress={formSubmitHandle} title={"Let's start"} />
      </View>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'}/>

    </SafeAreaView>
  );
};
export default Role;
