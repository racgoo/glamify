import AsyncStorage from "@react-native-async-storage/async-storage";
import requestRestart from "./requestRestart";
import requestLoadingOpen from "../loading/requestLoadingOpen";
import cancelAllPushSchedule from "../../modules/pushMessage/cancelAllPushSchedule";

const requestLogout = async () => {
    requestLoadingOpen();
    await AsyncStorage.clear();
    await cancelAllPushSchedule();
    requestRestart();
};
export default requestLogout;