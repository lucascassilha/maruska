import { produce } from 'immer';
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

        break;
      }
      case '@notification/CANCEL': {
        const { notificationID } = action.payload;

        const findIndex = draft.data.findIndex(
          item => item.id === notificationID
        );

        if (findIndex >= 0) {
          draft.data.splice(findIndex, 1);
          Notification.cancelNotification(notificationID);
        }

        break;
      }
      default:
    }
  });
}
