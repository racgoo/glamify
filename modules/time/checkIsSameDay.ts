import moment, { Moment } from "moment";
type dayType =  Moment | string | Date;
const checkIsSameDay = (dayA: dayType,dayB: dayType): boolean => {
    if(moment(dayA).format("YYYY-DD-MM")===moment(dayB).format("YYYY-DD-MM"))return true;
    else return false;
}
export default checkIsSameDay;