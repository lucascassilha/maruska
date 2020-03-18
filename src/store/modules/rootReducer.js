import { combineReducers } from 'redux';

import pets from './pets/reducer';
import places from './places/reducer';
import notifications from './notifications/reducer';
import modal from './modalVisible/reducer';

export default combineReducers({
  pets,
  places,
  notifications,
  modal,
});
