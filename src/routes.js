import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { useColorScheme } from 'react-native';

import { darkMode } from '~/store/modules/account/actions';

import Home from '~/pages/Home';
import Profile from '~/pages/Pet/Profile';
import Avatar from '~/pages/Pet/Avatar';
import Health from '~/pages/Pet/Health';
import DocAdd from '~/pages/Pet/HealthAdd/Doctor';
import AppointAdd from '~/pages/Pet/HealthAdd/Appointments';
import SurgeryAdd from '~/pages/Pet/HealthAdd/Surgeries';
import ProblemAdd from '~/pages/Pet/HealthAdd/Problems';
import Weight from '~/pages/Pet/Weight';
import Vaccines from '~/pages/Pet/Vaccines';
import Medications from '~/pages/Pet/Medications';
import Notifications from '~/pages/Notifications';
import Places from '~/pages/Places/index';
import Settings from '~/pages/Settings';
import LostPet from '~/pages/Pet/LostPet';

import themes from '~/themes';
import translate from '~/locales';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const theme = !useSelector(state => state.account.darkMode);
  const proAccount = useSelector(state => state.account.darkMode);

  let themeBoolean = theme;
  if (!proAccount) {
    themeBoolean = true;
  }

  return (
    <Tab.Navigator
      shifting
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor={`${themeBoolean ? '#ad0c00' : '#544F4F'}`}
      barStyle={{
        backgroundColor: `${themeBoolean ? '#470000' : '#1D1C1C'}`,
      }}
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
  const themeBoolean = !useSelector(state => state.account.darkMode);
  const proAccount = useSelector(state => state.account.pro);
  const nativeTheme = useColorScheme() === 'light';

  const [theme, setTheme] = useState(themes.light);

  const dispatch = useDispatch();

  useEffect(() => {
    if (proAccount) {
      if (nativeTheme && !themeBoolean) {
        dispatch(darkMode());
      } else if (!nativeTheme && themeBoolean) {
        dispatch(darkMode());
      }
    }
  }, []);

  useEffect(() => {
    if (themeBoolean) {
      setTheme(themes.light);
    } else {
      setTheme(themes.dark);
    }
  }, [themeBoolean]);

  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'OpenSans-BoldItalic',
            marginLeft: -25,
            color: themeBoolean ? '#000' : '#fff',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: themeBoolean ? '#fff' : '#222327',
          },
          headerBackImage: () => {
            return (
              <Icon
                name="chevron-left"
                color={themeBoolean ? '#000' : '#fff'}
                size={25}
              />
            );
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
          options={{
            title: translate('pictureTitle'),
          }}
        />
        <Stack.Screen
          name="Health"
          component={Health}
          options={{ headerShown: false, headerMode: 'screen' }}
        />
        <Stack.Screen
          name="DocAdd"
          component={DocAdd}
          options={{
            title: translate('addDoc'),
          }}
        />
        <Stack.Screen
          name="AppointAdd"
          component={AppointAdd}
          options={{
            title: translate('addApp'),
          }}
        />
        <Stack.Screen
          name="SurgeryAdd"
          component={SurgeryAdd}
          options={{
            title: translate('addSurg'),
          }}
        />
        <Stack.Screen
          name="ProblemAdd"
          component={ProblemAdd}
          options={{
            title: translate('addProblem'),
          }}
        />
        <Stack.Screen
          name="Weight"
          component={Weight}
          options={{ headerShown: false, headerMode: 'screen' }}
        />
        <Stack.Screen
          name="Vaccines"
          component={Vaccines}
          options={{ headerShown: false, headerMode: 'screen' }}
        />
        <Stack.Screen
          name="Medications"
          component={Medications}
          options={{ headerShown: false, headerMode: 'screen' }}
        />
        <Stack.Screen
          name="LostPet"
          component={LostPet}
          options={{
            title: translate('contact'),
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: translate('not'),
          }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}

Tabs.propTypes = {
  color: PropTypes.string,
};

Tabs.defaultProps = {
  color: '#fff',
};
