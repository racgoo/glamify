import { setRecoil } from "recoil-nexus";
import { requestSetCalendarItem, requestSetScheduleItem } from "../../recoil/recoil";

const setSelectedScheduleWithInfoList = (scheduleWithInfoList: scheduleWithInfoType[]) => {
    setRecoil(requestSetScheduleItem,{selectedScheduleWithInfoList: scheduleWithInfoList});
}
export default setSelectedScheduleWithInfoList;