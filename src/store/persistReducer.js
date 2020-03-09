import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default reducers => {
  const presistedReducer = persistReducer(
    {
      key: 'maruska',
      storage: AsyncStorage,
      whitelist: ['pets', 'notifications', 'places'],
    },
    reducers
  );
  return presistedReducer;
};
