import { useEffect, useState } from "react";
import MiddlePopup from "./MiddlePopupModule";
import { View, Text, DeviceEventEmitter, StyleSheet } from "react-native";
import BtnLarge from "../../button/BtnLarge";
import requestPopupClose from "../../../action/popup/requestPopupClose";
import BtnXlarge from "../../../components/button/BtnXLarge";
import CommonText from "../../../components/text/CommonText";
import colors from "../../../styles/colors";

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
                <View style={[styles.container]} >
                    {
                        (popupData?.title!=="" && popupData?.title ) &&
                        <CommonText
                            text={popupData?.title}
                            type="Title3B18"
                            color={colors.gray.GR800}
                        />
                    }
                    <CommonText
                        style={{marginTop: 12,textAlign: "center"}} 
                        text={popupData?.description}
                        type="Body1S16"
                        color={colors.gray.GR800}
                    />
                    <View style={{marginTop: 20,display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",gap: 10, maxWidth: "100%"}} >
                        {
                            ( popupData?.type === "both" || popupData?.type === "cancel" )
                            &&
                            <BtnXlarge 
                                action={requestPopupClose} 
                                style={{flex: 1, flexGrow: 1}}
                                isHigh={false} 
                                text="취소"
                                type="OutlineHigh"
                            />
                        }
                        {
                            ( popupData?.type === "both" || popupData?.type === "confirm" )
                            &&
                            <BtnXlarge 
                                action={()=>{
                                    requestPopupClose();
                                    popupData?.action();
                                }} 
                                style={{flex: 1, flexGrow: 1}}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20, 
        paddingVertical: 20,
        borderRadius: 20
    }
})

export default CustomPopup;