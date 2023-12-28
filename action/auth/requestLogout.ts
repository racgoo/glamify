import AsyncStorage from "@react-native-async-storage/async-storage";
import requestRestart from "./requestRestart";
import requestLoadingOpen from "../loading/requestLoadingOpen";

const requestLogout = async () => {
    requestLoadingOpen();
    await AsyncStorage.clear();
    requestRestart();
};
export default requestLogout;