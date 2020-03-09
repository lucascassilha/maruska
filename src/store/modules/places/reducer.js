import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function places(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      default:
    }
  });
}
