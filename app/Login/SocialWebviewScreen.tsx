import { View } from "react-native"
import { useEffect, useState } from "react";
import dimensions from "../../styles/dimensions";
import WebView, { WebViewNavigation } from "react-native-webview";
import { useRecoilValue } from "recoil";

import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import * as api from "../../controller/api";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import { useLocalSearchParams } from "expo-router";
import { requestSetUserItem, userAtom } from "../../recoil/recoil";
import { setRecoil } from "recoil-nexus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import router from "../../references/router";
import serializeParams from "../../modules/params/serializeParams";
import requestPushMessageScheduleReset from "../../action/pushMessage/requestPushMessageScheduleReset";





const SocialWebviewScreen = () => {
    const userRecoilValue = useRecoilValue(userAtom);
    const { url, platform }: {url: string, platform: string} = serializeParams(useLocalSearchParams());
    const [isCodeLoadingFinish,setIsCodeLoadingFinish] = useState(false);
    
    useEffect(()=>{
        requestLoadingOpen();
    },[]);

    useEffect(()=>{
        if(userRecoilValue.access_token!==""){
            AsyncStorage.setItem("access_token",userRecoilValue.access_token);
            AsyncStorage.setItem("refresh_token",userRecoilValue.refresh_token);
            requestPushMessageScheduleReset();
            router.reset({pathname: "MainTabs", params: {tabPathname:"Home"} as routeType["MainTabs"]});
        }
    },[userRecoilValue])

    const onNavigationStateChange = (state: WebViewNavigation) => {
        if(platform==="kakao"){
            if(state.url.indexOf("callback?code=")!==-1 ){
                setIsCodeLoadingFinish(true);
                let kakaoCode = state.url.split("callback?code=")[1];
                api.API_kakaoLoginVerify({code: kakaoCode})
                .then(async(res) => { 
                    let { data, message, code } = res.data;
                    if(code === 200 && data){
                        setRecoil(requestSetUserItem,data);
                    }
                })
                .catch(()=>{
                    router.goBack();
                });

            }
        }
        
        if(platform==="instagram"){
            if(state.url.indexOf("login?code=")!==-1){
                setIsCodeLoadingFinish(true);
                state.url = state.url.replace("login?","login?type=app&");
                api.customAxios.get((state.url))
                .then(async(res) => {
                    console.log(res);
                });
            }
        }
    }
    
    return <RenderSafeAreaView>
        {
            isCodeLoadingFinish 
            ?
            <View>
            </View>
            :
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={true}
                style={{width: dimensions.width, height: dimensions.height}}  
                source={{uri: url}} 
                // incognito={true} 
                domStorageEnabled
                javaScriptEnabled
                sharedCookiesEnabled
                thirdPartyCookiesEnabled
                onNavigationStateChange={onNavigationStateChange}
                onLoadEnd={requestLoadingClose}
            />
        }
        
    </RenderSafeAreaView>
}
export default SocialWebviewScreen;