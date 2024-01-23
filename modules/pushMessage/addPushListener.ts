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
            const data: pushMessageType = response.notification.request.content.data;
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
        let data: pushMessageType = notification.request.content.data;
        requestPopupOpen({title: data.subtitle as string, description: data.body as string, type: "confirm", action: () => {}});
    })
};
export default addPushListener;