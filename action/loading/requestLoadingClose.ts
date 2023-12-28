import { DeviceEventEmitter } from "react-native";

/**
 * 스피너 로딩 삭제
*/
const requestLoadingClose = () => {
    DeviceEventEmitter.emit("loading","close");
}
export default requestLoadingClose;