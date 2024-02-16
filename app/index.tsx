import { useEffect } from "react";
import router from "../references/router";
import { View, Text, Pressable, LogBox, ImageBackground, YellowBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requestAuthByRefreshToken from "../action/auth/requestAuthByRefreshToken";
import moment from "moment";
import colors from "../styles/colors";
import CommonText from "../components/text/CommonText";
import getExpoToken from "../modules/pushMessage/getExpoToken";
import addPushListener from "../modules/pushMessage/addPushListener";
import requestPushMessageScheduleReset from "../action/pushMessage/requestPushMessageScheduleReset";
import { API_updateExpoPushToken } from "../controller/api";
import requestPopupOpen from "../action/popup/requestPopupOpen";
import {  useRecoilValue } from "recoil";
import { userAtom } from "../recoil/recoil";
import sleep from "../modules/time/sleep";
import { getRecoil } from "recoil-nexus";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["..."]);


const FirstPage = () => {
  const userRecoilValue = useRecoilValue(userAtom);
  const handleStart = (type: "login" | "home") => {
    switch(type){
        case "login":
            router.replace({pathname: "Login/LoginScreen", params: {}});
            break;
        case "home":
            router.replace({pathname: "MainTabs", params: {tabPathname: "Home"} as routeType["MainTabs"]});
            break;
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
     async function autoLogin() {
        let isSuccess=false;
        const refresh_token = await AsyncStorage.getItem("refresh_token");
        if(refresh_token){
            isSuccess = await requestAuthByRefreshToken(refresh_token);
        }
        sleep(2000);
        let user = getRecoil(userAtom);
        let expo_push_token = await getExpoToken();
        if(expo_push_token){
          await API_updateExpoPushToken({expo_push_token: expo_push_token,access_token: user.access_token});
        }
        handleStart(isSuccess===true ? "home" : "login");
    }
    autoLogin();

  }, []);

  return (
    // <ImageBackground
    //     source={require("../assets/images/backgroundPaper.jpg")}
    //     resizeMode="stretch"
    //     style={{ flex: 1, width: "100%" }}
    //   >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CommonText 
          text={`Glamify`}
          color={colors.red.Red300}
          type="Title1B24"
        />
      </View>
    // </ImageBackground>
  );
};
export default FirstPage;
