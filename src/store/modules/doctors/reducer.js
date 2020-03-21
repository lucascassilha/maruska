import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function doctors(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@doctor/ADD': {
        const { doctor } = action.payload;
        draft.data.push(doctor);
      }
      default:
    }
  });
}
