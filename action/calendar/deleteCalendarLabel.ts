import { API_deleteCalendarLabel, API_saveCalendarLabelList } from "../../controller/api";
import requestLoadingClose from "../loading/requestLoadingClose";
import requestLoadingOpen from "../loading/requestLoadingOpen";

const deleteCalendarLabel = async ({label}: {label: labelType}) => {
    requestLoadingOpen();
    await API_deleteCalendarLabel({
        label: label
    })
    .finally(()=>{
        requestLoadingClose();
    });
};
export default deleteCalendarLabel;