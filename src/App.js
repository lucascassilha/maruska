import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';

import { store, persistor } from '~/store/index';
import Routes from './routes';

function App() {
  OneSignal.init(Config.ONE_SIGNAL_ID);

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
