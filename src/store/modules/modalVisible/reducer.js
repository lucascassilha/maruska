export default function modal(state = [false], action) {
  switch (action.type) {
    case '@modal/CHANGE': {
      return [!state[0]];
    }
    default: {
      return state;
    }
  }
}
