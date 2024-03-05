import moment from "moment";
import hashStringToRGB from "../rgb/hashStringToRGB";
import utcStringToMoment from "../time/utcStringToMoment";
import makeDummySchedule from "../data/makeDummySchedule";
import makeDummyScheduleInfo from "../data/makeDummyScheduleInfo";

const transformScheduleToMarkData = (
  scheduleList: scheduleType[],
  specialDayList?: specialDayType[]
): markType => {
  const result: markType = {};
  scheduleList.some((schedule) => {
    schedule.schedule_infos?.some((info, i) => {
      const dueDate = utcStringToMoment(info.target_date).format("YYYY-MM-DD");
      if (!result[dueDate]) {
        result[dueDate] = {
          dots: [],
          marked: true,
          isHoliday: false
        };
      }
      result[dueDate].dots.push({
        key: schedule.title,
        description: schedule.description,
        color: hashStringToRGB(schedule.title),
        schedule: schedule,
        currentDateScheduleInfo: info,
        isSpecialDay: false
      });
    });
  });

  specialDayList?.some((specialDay) => {
    let stringLocalDateNumber = String(specialDay.local_date_number);
    
      let dueDate = [
        stringLocalDateNumber.substr(0, 4),
        stringLocalDateNumber.substr(4, 2),
        stringLocalDateNumber.substr(6, 2),
      ].join("-");


      if (!result[dueDate]) {
        result[dueDate] = {
          dots: [],
          marked: true,
          isHoliday: false
        };
      }
      result[dueDate].dots.unshift({
        key: specialDay.name,
        description: "",
        color: "red",
        schedule: makeDummySchedule(),
        currentDateScheduleInfo: makeDummyScheduleInfo(),
        isSpecialDay: true
      });
      if(specialDay.holiday_Yn==="Y"){
        result[dueDate].isHoliday=true;
      }
  });
  return result;
};
export default transformScheduleToMarkData;
