import { UseQueryResult } from "@tanstack/react-query";
import { API_deleteSchedule } from "../../controller/api";
import router from "../../references/router";
import requestLoadingClose from "../loading/requestLoadingClose";
import requestPopupOpen from "../popup/requestPopupOpen";
interface requestDeleteScheduleProps {
    schedule: scheduleType;
    refetchQueries: UseQueryResult<any>[];
}
const requestDeleteSchedule = async({schedule,refetchQueries}: requestDeleteScheduleProps) => {
    await API_deleteSchedule({schedule_id: schedule.schedule_id})
    .then(async(res)=>{
        refetchQueries.some(refetchQuery => refetchQuery.refetch());
        let {code,data,message} = res.data;
        if(code !== 200){
          router.goBack();
          requestPopupOpen({type: "cancel", title: "", description: "오류가 발생했습니다."})
        }
    })
    .finally(()=>{
        requestLoadingClose();
    })
}
export default requestDeleteSchedule;

