import { DeviceEventEmitter } from "react-native";

const requestPopupClose = () => {
    DeviceEventEmitter.emit("popup",{
        type: "close"
    });
}
export default requestPopupClose;