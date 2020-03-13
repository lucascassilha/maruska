import { produce } from 'immer';
import { formatDistanceStrict, subYears, subMonths } from 'date-fns';

const INITIAL_STATE = {
  data: [],
};

export default function pets(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pet/ADD': {
        const { pet } = action.payload;
        const { date, years, months } = pet;

        const currentDate = new Date();
        let returnDate = null;
        if (years) {
          const auxDate = subYears(subMonths(currentDate, months), years);
          returnDate = formatDistanceStrict(auxDate, currentDate);
        } else {
          returnDate = formatDistanceStrict(date, currentDate);
        }

        const info = { ...pet, date: returnDate };

        draft.data.push(info);
        break;
      }
      default:
    }
  });
}
