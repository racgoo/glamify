import { useEffect, useState } from "react";
import MiddlePopup from "./MiddlePopupModule";
import { View, Text, DeviceEventEmitter } from "react-native";
import BtnLarge from "../../button/BtnLarge";
import requestPopupClose from "../../../action/popup/requestPopupClose";
import dimensions from "../../../styles/dimensions";

const CustomPopup = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [popupData,setPopupData] = useState({});
    useEffect(()=>{
        DeviceEventEmitter.addListener("popup",(event)=>{
            if(event.type==="open"){
                setIsOpen(true);
                setPopupData(event.popupData);
            }
            if(event.type==="close"){
                setIsOpen(false);
                setPopupData(event.popupData);
            }
        });
    },[])
    return <MiddlePopup 
            children={
                <View style={{backgroundColor: "red",display: "flex", justifyContent: "center", alignItems: "center",paddingHorizontal: 20, paddingVertical: 20,borderRadius: 20}} >
                    {
                        popupData?.title!=="" && popupData?.title && <Text style={{marginTop: 10}} >{popupData?.title}</Text>
                    }
                    <Text style={{marginTop: 20,textAlign: "center"}} >{popupData?.description}</Text>
                    <View style={{marginTop: 20,display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",gap: 10}} >
                        {
                            ( popupData?.type === "both" || popupData?.type === "cancel" )
                            &&
                            <BtnLarge 
                                action={requestPopupClose} 
                                width={ popupData?.type === "both" ? "50%" : 200 } 
                                isHigh={false} 
                                text="취소"  
                            />
                        }
                        {
                            ( popupData?.type === "both" || popupData?.type === "confirm" )
                            &&
                            <BtnLarge 
                                action={()=>{
                                    requestPopupClose();
                                    popupData?.action();
                                }} 
                                width={ popupData?.type === "both" ? "50%" : 200 } 
                                isHigh={true} 
                                text="확인" 
                            />
                        }
                    </View>
                </View>
            } 
            visible={isOpen}
        />
}
export default CustomPopup;