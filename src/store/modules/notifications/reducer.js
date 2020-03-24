import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function notifications(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pet/CHECK_VACCINE': {
        const { vaccine, petID } = action.payload;
        console.log(vaccine, petID);

        break;
      }
      default:
    }
  });
}
