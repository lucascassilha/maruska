export default function modal(state = [false, false, false], action) {
  switch (action.type) {
    case '@modal/CHANGE': {
      const { id } = action.payload;
      if (id === 0) {
        return [!state[id], false, false];
      }
      if (id === 1) {
        return [false, !state[id], false];
      }
      if (id === 2) {
        return [false, false, !state[id]];
      }
    }
    default: {
      return state;
    }
  }
}
