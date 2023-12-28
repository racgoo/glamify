import { setRecoil } from "recoil-nexus";
import { API_authByRefreshToken } from "../../controller/api";
import { requestSetUserItem } from "../../recoil/recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

const requestAuthByRefreshToken = async (refresh_token: string) => {
    let isSuccess = await API_authByRefreshToken({refresh_token})
    .then(async(res) => {
        let { data, code, message } = res.data;
        if(code===200 && data){
            await setRecoil(requestSetUserItem,data);
            await AsyncStorage.setItem("refresh_token", data.refresh_token);
            return true;
        }else{
            return false;
        };
    });
    return isSuccess;
}
export default requestAuthByRefreshToken;