/* eslint-disable no-return-assign */
import { locale } from '~/locales';

const INITIAL_STATE = locale === 'en_US' ? 'lbs' : 'kg';
export default function weight(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@weight/CHANGE': {
      if (state === 'lbs') {
        return 'kg';
      }
      if (state === 'kg') {
        return 'lbs';
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
