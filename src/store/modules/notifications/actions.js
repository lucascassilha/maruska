export function notificationAdd(notification) {
  return {
    type: '@notification/ADD',
    payload: { notification },
  };
}

export function notificationCancel(notificationID) {
  return {
    type: '@notification/CANCEL',
    payload: { notificationID },
  };
}

export function clearPastNotifications() {
  return {
    type: '@notification/UPDATE',
  };
}
