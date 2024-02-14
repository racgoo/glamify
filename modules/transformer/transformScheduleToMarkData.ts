import moment from "moment";
import hashStringToRGB from "../rgb/hashStringToRGB";

const transformScheduleToMarkData = (scheduleList: scheduleType[]): markType => {
    const result: markType = {};
    // schedule.schedule_infos?.some(info)
    // console.log(JSON.stringify(scheduleList))
    scheduleList.forEach((schedule) => {
        schedule.schedule_infos?.some(info => {
            const dueDate = moment(info.target_date).format("YYYY-MM-DD");
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
    // scheduleList.forEach((schedule) => {
    //     const dueDate = moment(schedule.due_date).format("YYYY-MM-DD");
    //     if (!result[dueDate]) {
    //         result[dueDate] = {
    //             dots: [],
    //             marked: true,
    //         };
    //     }
    //     result[dueDate].dots.push({
    //         key: schedule.title,
    //         description: schedule.description,
    //         color: hashStringToRGB(schedule.title)
    //     });
  });
  return result;
}
export default transformScheduleToMarkData;