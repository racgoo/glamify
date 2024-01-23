import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import getExpoToken from "../../../modules/pushMessage/getExpoToken";
import addPushListener from "../../../modules/pushMessage/addPushListener";
const PushMessageDeepLinking = () => {
    
    useEffect(()=>{
        const initialPushSetting = async() => {
            const expo_token = await getExpoToken();
            addPushListener();
        }
        initialPushSetting();
    },[]);
    return null;
    // url = response?.notification.request.content.data.url;

}
export default PushMessageDeepLinking;