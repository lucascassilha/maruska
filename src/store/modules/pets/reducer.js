import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function pets(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pet/ADD': {
        const { pet } = action.payload;
        return draft.data.push(pet);
      }
      default:
    }
  });
}
