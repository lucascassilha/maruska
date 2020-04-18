import PushNotification from 'react-native-push-notification';
import { Alert, Share } from 'react-native';
import translate from '~/locales';

class NotificationService {
  constructor(onNotification) {
    this.configure(onNotification);
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification,

      popInitialNotification: true,
    });
  }

  async localNotification() {
    const id = `${Math.floor(
      Math.random() * 10000
    )}${new Date().getMilliseconds()}`;

    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: false,
      soundName: 'default',
      actions: '["Yes", "No"]',
      id,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      color: 'red',
    });
    return id;
  }

  scheduleNotification(date, title, message) {
    const id = `${Math.floor(
      Math.random() * 10000
    )}${new Date().getMilliseconds()}`;

    PushNotification.localNotificationSchedule({
      id,
      date,
      title,
      message,
      playSound: true,
      soundName: 'default',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      color: 'red',
    });
    return id;
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
  Alert.alert(notification.title, notification.message, [
    {
      text: translate('shareButton'),
      onPress: () =>
        Share.share({
          title: notification.title,
          message: notification.message,
        }),
    },
    {
      text: translate('close'),
    },
  ]);
};

const Notification = new NotificationService(onNotification);

export default Notification;
