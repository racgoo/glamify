import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import moment, { Moment } from 'moment';
import Constants from 'expo-constants';
 

const addPushSchedule = async (schedule: scheduleType, repeatInterval: false | number = false) => {
    const NOTIFICATION_ID = schedule.schedule_id.toString();
    console.log(schedule,moment(schedule.due_date),moment(schedule.due_date).diff(moment(), 'seconds'))
  // Expo Background Fetch 설정
  if (Constants.manifest && repeatInterval) {
    await BackgroundFetch.registerTaskAsync(NOTIFICATION_ID, {
      minimumInterval: repeatInterval,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  }

  // 예약된 푸시 알림 설정
  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: "캘린더",
      subtitle: schedule.title,
      body: schedule.description,
    },
    trigger: {
      repeats: repeatInterval ? true : false,
      seconds: moment(schedule.due_date).diff(moment(), 'seconds'),
    },
  });
};
export default addPushSchedule;
// 사용자가 선택한 날짜 및 주기
// const userInputDate = moment('2024-01-24T18:00:00'); // 사용자가 선택한 날짜와 시간
// const repeatInterval = 60 * 60 * 24; // 24시간마다

// 주기적 알림 예약

