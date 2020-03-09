import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import Home from '~/pages/Home/index';
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
          tabBarIcon: ({ color }) => (
            <Icon name="paw" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Places"
        component={Places}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bell" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
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
