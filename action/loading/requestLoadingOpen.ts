import { DeviceEventEmitter } from "react-native";

/**
 * 스피너 로딩 띄우기
*/
const requestLoadingOpen = () => {
    DeviceEventEmitter.emit("loading","open");
}
export default requestLoadingOpen;