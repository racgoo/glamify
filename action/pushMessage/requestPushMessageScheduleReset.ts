import { API_getSchedule } from "../../controller/api";
import addPushSchedule from "../../modules/pushMessage/addPushSchedule";

const requestPushMessageScheduleReset = async() => {
    API_getSchedule({})
    .then(async(res)=>{
        let { code, data } = res.data;
        if(code===200 && data?.scheduleList){
            data.scheduleList.some(async(schedule) => {
                await addPushSchedule(schedule)
            })
        }
    })
}
export default requestPushMessageScheduleReset;