import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function places(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@location/ADD': {
        const { location } = action.payload;
        draft.data.push(location);
        break;
      }
      case '@location/DELETE': {
        const { location } = action.payload;

        const findIndex = draft.data.findIndex(item => item.name === location);

        if (findIndex >= 0) {
          draft.data.splice(findIndex, 1);
        }
        break;
      }
      default:
    }
  });
}
