import { API_saveCalendarLabelList } from "../../controller/api";
import requestLoadingClose from "../loading/requestLoadingClose";
import requestLoadingOpen from "../loading/requestLoadingOpen";
import requestPopupOpen from "../popup/requestPopupOpen";

const saveCalendarLabelList = async ({labelList}: {labelList: labelType[]}) => {
    requestLoadingOpen();
    await API_saveCalendarLabelList({
        labelList: labelList
    })
    .finally(()=>{
        requestLoadingClose();
    });
};
export default saveCalendarLabelList;