import moment, { Moment } from "moment";

type dateType = Date | string | Moment;
const printDate = (date: dateType, printType: "long" | "short") => {
    if(printType==="long")return moment(date).format("YYYY년 MM월 DD일 HH시 mm분");
    else return moment(date).format("HH시 mm분");
    
}
export default printDate;