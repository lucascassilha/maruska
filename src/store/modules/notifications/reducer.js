import { produce } from 'immer';
import { parseISO, isAfter, isValid } from 'date-fns';

const INITIAL_STATE = {
  data: [],
  lastID: 0,
};

export default function notifications(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@notification/ADD': {
        const { notification } = action.payload;

        draft.data.push(notification);

        draft.data.sort(function(a, b) {
          const parsedA = parseISO(a.date) || a.date;
          const parsedB = parseISO(b.date) || b.date;
          console.log(!isAfter(parsedA, parsedB));
          return isAfter(parsedA, parsedB);
        });

        break;
      }
      case '@notification/CANCEL': {
        const { notificationID } = action.payload;

        const findIndex = draft.data.findIndex(
          item => item.id === notificationID
        );

        if (findIndex >= 0) {
          draft.data.splice(findIndex, 1);
        }

        break;
      }
      case 'persist/REHYDRATE': {
        const notificationPayload = action.payload
          ? action.payload.notifications || null
          : null;
        if (notificationPayload && notificationPayload[0]) {
          const notList = notificationPayload.data;

          const currentDate = new Date();
          draft.data = notList.filter(item => {
            const validDate = isValid(item.date);
            if (validDate) {
              return isAfter(item.date, currentDate);
            }
            const parsedDate = parseISO(item.date);
            return isAfter(parsedDate, currentDate);
          });
          break;
        }
      }
      default:
    }
  });
}
