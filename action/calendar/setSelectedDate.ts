import { setRecoil } from "recoil-nexus";
import { requestSetCalendarItem } from "../../recoil/recoil";

const setSelectedDate = (selectedDate: null | string) => {
    setRecoil(requestSetCalendarItem,{selectedDate: selectedDate});
}
export default setSelectedDate;