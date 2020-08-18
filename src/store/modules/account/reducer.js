/* eslint-disable no-return-assign */
import { produce } from 'immer';

const INITIAL_STATE = {
  pro: true,
  darkMode: false,
};

export default function doctors(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@account/PRO': {
        draft.pro = true;
        break;
      }
      case '@account/DARK_MODE': {
        if (draft.pro) {
          draft.darkMode = !draft.darkMode;
        }
        break;
      }
      default:
    }
  });
}
