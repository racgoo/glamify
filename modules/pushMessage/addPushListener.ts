import * as Notifications from "expo-notifications";
import { useRootNavigationState } from "expo-router";
import router from "../../references/router";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../recoil/recoil";
import requestPopupOpen from "../../action/popup/requestPopupOpen";
const addPushListener = () => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            let userRecoilValue = getRecoil(userAtom);
            const data: pushMessageDataType = response.notification.request.content.data;
            if(!data.params){
                data.params = {};
            }
            if(userRecoilValue.user_id && data?.pathname){
                if(data?.tabPathname){
                    router.navigate({pathname: data?.pathname, params: { ...data.params,tabPathname: data.tabPathname } as routeType["MainTabs"]});
                }else{
                    router.navigate({pathname: data?.pathname, params: {...data.params}});
                }
            }
        }
      );
  
    Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
        let pushMessage = notification.request.content;
        
        requestPopupOpen({title: pushMessage.subtitle as string, description: pushMessage.body as string, type: "confirm", action: () => {}});
    })
};
export default addPushListener;