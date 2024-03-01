import moment from "moment";
import hashStringToRGB from "../rgb/hashStringToRGB";
import utcStringToMoment from "../time/utcStringToMoment";

const transformScheduleToMarkData = (scheduleList: scheduleType[]): markType => {
    const result: markType = {};
    scheduleList.forEach((schedule) => {
        schedule.schedule_infos?.some((info,i) => {
            const dueDate = utcStringToMoment(info.target_date).format("YYYY-MM-DD");
            if (!result[dueDate]) {
                result[dueDate] = {
                    dots: [],
                    marked: true,
                };
            }
            result[dueDate].dots.push({
                key: schedule.title,
                description: schedule.description,
                color: hashStringToRGB(schedule.title),
                schedule: schedule,
                currentDateScheduleInfo: info
            });
        })
  });
  
//   console.log(Object.keys(result))
  return result;
}
export default transformScheduleToMarkData;