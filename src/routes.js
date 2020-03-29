import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import translate from '~/locales';

import Home from '~/pages/Home/index';
import Profile from '~/pages/Pet/Profile/index';
import Avatar from '~/pages/Pet/Avatar/index';
import Health from '~/pages/Pet/Health/index';
import DocAdd from '~/pages/Pet/HealthAdd/Doctor/index';
import AppointAdd from '~/pages/Pet/HealthAdd/Appointments/index';
import SurgeryAdd from '~/pages/Pet/HealthAdd/Surgeries/index';
import ProblemAdd from '~/pages/Pet/HealthAdd/Problems/index';
import Weight from '~/pages/Pet/Weight/index';
import Vaccines from '~/pages/Pet/Vaccines/index';
import Medications from '~/pages/Pet/Medications/index';
import Notifications from '~/pages/Notifications/index';
import Places from '~/pages/Places/index';
import Settings from '~/pages/Settings/index';

import LostPet from '~/pages/Pet/LostPet/index';

const Stack = createStackNavigator();

function Pet() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, headerMode: 'screen' }}
      />
      <Stack.Screen
        name="Pet"
        component={Profile}
        options={({ route }) => ({
          title: route.params.pet.name,
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="Avatar"
        component={Avatar}
        options={() => ({
          title: translate('pictureTitle'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="Health"
        component={Health}
        options={() => ({
          title: translate('healthTitle'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="DocAdd"
        component={DocAdd}
        options={() => ({
          title: translate('addDoc'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(translate('infoTitle'), translate('docAddInfo'));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <Icon name="information" color="#fff" size={25} />
            </TouchableOpacity>
          ),
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="AppointAdd"
        component={AppointAdd}
        options={({ route }) => ({
          title: translate('addApp'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="SurgeryAdd"
        component={SurgeryAdd}
        options={() => ({
          title: translate('addSurg'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="ProblemAdd"
        component={ProblemAdd}
        options={() => ({
          title: translate('addProblem'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="Weight"
        component={Weight}
        options={() => ({
          title: translate('weightTitle'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(translate('infoTitle'), translate('weightAddInfo'));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 30,
              }}
            >
              <Icon name="information" color="#fff" size={25} />
            </TouchableOpacity>
          ),
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="Vaccines"
        component={Vaccines}
        options={() => ({
          title: translate('vacTitle'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(translate('infoTitle'), translate('vacAddInfo'));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <Icon name="information" color="#fff" size={25} />
            </TouchableOpacity>
          ),
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="Medications"
        component={Medications}
        options={() => ({
          title: translate('medTitle'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(translate('infoTitle'), translate('medAddInfo'));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <Icon name="information" color="#fff" size={25} />
            </TouchableOpacity>
          ),
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
      <Stack.Screen
        name="LostPet"
        component={LostPet}
        options={() => ({
          title: translate('contact'),
          headerStyle: {
            backgroundColor: '#eb3349',
          },
          headerBackTitleStyle: null,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          resetOnBlur: true,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'OpenSans-Bold',
          },
          headerBackImage: () => {
            return <Icon name="chevron-left" color="#fff" size={25} />;
          },
        })}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      shifting
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#ad0c00"
      barStyle={{ backgroundColor: '#d92316' }}
    >
      <Tab.Screen
        name="Pets"
        component={Pet}
        options={{
          titleStyle: {
            fontFamily: 'OpenSans-Regular',
          },
          tabBarIcon: ({ color }) => (
            <Icon name="paw" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate('places')}
        component={Places}
        options={{
          titleStyle: {
            fontFamily: 'OpenSans-Regular',
          },
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate('not')}
        component={Notifications}
        options={{
          titleStyle: {
            fontFamily: 'OpenSans-Regular',
          },
          tabBarIcon: ({ color }) => (
            <Icon name="bell" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={translate('set')}
        component={Settings}
        options={{
          titleStyle: {
            fontFamily: 'OpenSans-Regular',
          },
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

Routes.propTypes = {
  color: PropTypes.string,
};

Routes.defaultProps = {
  color: '#fff',
};
