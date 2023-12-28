import { DeviceEventEmitter, StyleSheet, View } from "react-native";
import dimensions from "../../../styles/dimensions";
import Spinner from "../../../assets/animation/Spinner";
import { useEffect, useState } from "react";
const OverlayLoadingModule = () => {
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        DeviceEventEmitter.addListener("loading",(event)=>{
            if(event === "open"){
                setIsLoading(true);
            }
            if(event === "close"){
                setIsLoading(false);
            }
        })
    },[])

    return (
        isLoading
        ? 
            <View style={[styles.overlayLoadingWrapper]} >
                <Spinner />
            </View>
        :
            null
    );
}

const styles = StyleSheet.create({
    overlayLoadingWrapper: {
        width: dimensions.width,
        height: dimensions.height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100000000
    }
});

export default OverlayLoadingModule;