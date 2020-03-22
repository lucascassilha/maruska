import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';

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
          title: 'Choose a picture!',
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
          title: 'Pet Health',
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
                Alert.alert(
                  'Maruska',
                  'To add doctors and appointments, you need to add a clinic first!'
                );
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
        name="DocAdd"
        component={DocAdd}
        options={() => ({
          title: `New Vet`,
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
        name="AppointAdd"
        component={AppointAdd}
        options={({ route }) => ({
          title: `New Appointment`,
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
          title: `Register Surgery`,
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
          title: `Register Problem`,
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
          title: 'Weight Control',
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
        name="Vaccines"
        component={Vaccines}
        options={() => ({
          title: 'Vaccination Card',
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
        name="Medications"
        component={Medications}
        options={() => ({
          title: 'Medications',
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
      inactiveColor="#c91e33"
      barStyle={{ backgroundColor: '#eb3349' }}
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
        name="Places"
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
        name="Notifications"
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
        name="Settings"
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
