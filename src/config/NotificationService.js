import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';

class NotificationService {
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification,

      popInitialNotification: true,
    });
  }

  localNotification() {
    this.lastId += 1;
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: false,
      soundName: 'default',
      actions: '["Yes", "No"]',
    });
    return this.lastId;
  }

  scheduleNotification(date, title, message) {
    this.lastId += 1;
    PushNotification.localNotificationSchedule({
      date,
      title,
      message,
      playSound: true,
      soundName: 'default',
    });
    return this.lastId;
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotification(id) {
    PushNotification.cancelLocalNotifications({ id });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

const onNotification = notification => {
  Alert.alert(notification.title, notification.message);
};

const Notification = new NotificationService(onNotification);

export default Notification;
