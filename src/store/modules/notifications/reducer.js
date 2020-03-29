import { produce } from 'immer';
import { parseISO, isAfter, isValid } from 'date-fns';
import Notification from '~/config/NotificationService';

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
          const aValid = isValid(a.date);
          const bValid = isValid(b.date);
          const parsedA = !aValid ? parseISO(a.date) : a.date;
          const parsedB = !bValid ? parseISO(b.date) : b.date;
          return parsedA - parsedB;
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
        }
        break;
      }
      case '@pet/DELETE': {
        const { pet } = action.payload;
        draft.data.map(item => {
          if (item.petID === pet) {
            Notification.cancelNotification(item.id);
          }
        });

        let findIndex = draft.data.findIndex(item => item.petID === pet);

        while (findIndex >= 0) {
          draft.data.splice(findIndex, 1);
          findIndex = draft.data.findIndex(item => item.petID === pet);
        }

        break;
      }
      default:
    }
  });
}
