import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import moment, { Moment } from 'moment';
import Constants from 'expo-constants';
const cancelPushSchedule = async(schedule: scheduleType) => {
    const NOTIFICATION_ID = schedule.schedule_id.toString();
    const NOTIFICATION_ID_PREVIEW = schedule.schedule_id.toString()+"[preview]";
    // 예약된 푸시 알림 취소
    await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID);
    await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID_PREVIEW);

    // Expo Background Fetch 태스크 중지
    if (Constants.manifest) {
      await BackgroundFetch.unregisterTaskAsync(NOTIFICATION_ID);
      await BackgroundFetch.unregisterTaskAsync(NOTIFICATION_ID_PREVIEW);
    }
};
export default cancelPushSchedule;