import { setRecoil } from "recoil-nexus";
import { requestSetCalendarItem } from "../../recoil/recoil";

const setCurrentCalendar = (newCalendar: null | calendarType) => {
    setRecoil(requestSetCalendarItem,{currentCalendar: newCalendar});
}
export default setCurrentCalendar;