import { DeviceEventEmitter } from "react-native";

/**
 * Popup 모달 띄우기
 * @param {string} title 제목
 * @param {string} description 내용
 * @param {"cancel" | "confirm" | "both"} type 타입
 * @param {VoidFunction} action 확인 액션
*/
interface requestPopupOpenPropsType {
    title: string,
    description: string,
    type?: "cancel" | "confirm" | "both",
    action?: () => void
}

const requestPopupOpen = ({title,description,type="cancel",action = () => {}}: requestPopupOpenPropsType) => {
    DeviceEventEmitter.emit("popup",{
        type: "open",
        popupData: {
            title,
            description,
            type,
            action
        }
    });
}
export default requestPopupOpen;