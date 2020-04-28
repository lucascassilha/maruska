import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import { ONE_SIGNAL_ID } from 'react-native-dotenv';

import { store, persistor } from '~/store/index';

import Routes from './routes';

function App() {
  OneSignal.init(ONE_SIGNAL_ID, {
    kOSSettingsKeyAutoPrompt: true,
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
