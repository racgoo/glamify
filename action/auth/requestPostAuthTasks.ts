import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../recoil/recoil";
import getExpoToken from "../../modules/pushMessage/getExpoToken";
import { API_updateExpoPushToken } from "../../controller/api";

const requestPostAuthTasks = async() => {
    let userRecoilValue = getRecoil(userAtom);
    let expo_push_token = await getExpoToken();
    if(expo_push_token && userRecoilValue.access_token!==""){
        await API_updateExpoPushToken({expo_push_token: expo_push_token,access_token: userRecoilValue.access_token});
    }
}
export default requestPostAuthTasks;