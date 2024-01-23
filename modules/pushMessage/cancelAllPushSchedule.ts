import * as Notifications from 'expo-notifications';

const cancelAllPushSchedule = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
export default cancelAllPushSchedule;