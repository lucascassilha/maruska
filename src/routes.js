import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
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

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      shifting
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#ad0c00"
      barStyle={{ backgroundColor: '#470000' }}
    >
      <Tab.Screen
        name="Pets"
        component={Home}
        options={{
          titleStyle: {
            fontFamily: 'OpenSans-Bold',
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

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'OpenSans-BoldItalic',
          marginLeft: -25,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackImage: () => {
          return <Icon name="chevron-left" color="#000" size={25} />;
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false, headerMode: 'screen' }}
      />
      <Stack.Screen
        name="Pet"
        component={Profile}
        options={{ headerShown: false, headerMode: 'screen' }}
      />
      <Stack.Screen
        name="Avatar"
        component={Avatar}
        options={() => ({
          title: translate('pictureTitle'),
        })}
      />
      <Stack.Screen
        name="Health"
        component={Health}
        options={() => ({
          title: translate('healthTitle'),
        })}
      />
      <Stack.Screen
        name="DocAdd"
        component={DocAdd}
        options={() => ({
          title: translate('addDoc'),
        })}
      />
      <Stack.Screen
        name="AppointAdd"
        component={AppointAdd}
        options={({ route }) => ({
          title: translate('addApp'),
        })}
      />
      <Stack.Screen
        name="SurgeryAdd"
        component={SurgeryAdd}
        options={() => ({
          title: translate('addSurg'),
        })}
      />
      <Stack.Screen
        name="ProblemAdd"
        component={ProblemAdd}
        options={() => ({
          title: translate('addProblem'),
        })}
      />
      <Stack.Screen
        name="Weight"
        component={Weight}
        options={() => ({
          title: translate('weightTitle'),
        })}
      />
      <Stack.Screen
        name="Vaccines"
        component={Vaccines}
        options={() => ({
          title: translate('vacTitle'),
        })}
      />
      <Stack.Screen
        name="Medications"
        component={Medications}
        options={() => ({
          title: translate('medTitle'),
        })}
      />
      <Stack.Screen
        name="LostPet"
        component={LostPet}
        options={() => ({
          title: translate('contact'),
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => ({
          title: translate('not'),
        })}
      />
    </Stack.Navigator>
  );
}

Tabs.propTypes = {
  color: PropTypes.string,
};

Tabs.defaultProps = {
  color: '#fff',
};
