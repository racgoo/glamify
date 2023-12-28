import {
  ImageBackground,
  View,
} from "react-native";
import { kakaoLoginUrl, instagramLoginUrl } from "../../controller/api";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import IconLogo from "../../assets/icons/IconLogo";
import IconSlug from "../../assets/icons/IconSlug";
import BtnXLarge from "../../components/button/BtnXLarge";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import KakaoLogo from "../../assets/icons/KakaoLogo";

import router from "../../references/router";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  const handleKakaoLogin = () => {
    router.navigate({
      pathname: "Login/SocialWebviewScreen",
      params: {
        url: kakaoLoginUrl,
        platform: "kakao",
      },
    });
  };

  const handleInstagramLogin = () => {
    router.navigate({
      pathname: "Login/SocialWebviewScreen",
      params: {
        url: instagramLoginUrl,
        platform: "instagram",
      },
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundPaper.jpg")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
      >
        <IconLogo />

        <View style={{ height: 20 }} />

        <IconSlug />

        <BtnXLarge
          active={true}
          action={handleKakaoLogin}
          style={{
            backgroundColor: "#FFEA30",
            position: "absolute",
            bottom: 50
          }}
          component={<View style={{flex: 1,flexDirection: "row", alignItems: "center"}} >
            <KakaoLogo />
            <CommonText
              text={"카카오로 시작하기"}
              type="Body1S16"
              color={colors.gray.GR700}
              marginLeft={10}
            />
          </View>}
          type="SolidHigh"
        />

        {/* <BtnLarge
          action={handleInstagramLogin}
          isHigh={true}
          active={true}
          text="인스타그램으로 시작하기"
          width={"200px"}
          style={{ marginBottom: 20 }}
        /> */}

        {/* <BtnLarge
          action={handleKakaoLogin}
          isHigh={true}
          active={true}
          text="카카오로 시작하기"
          width={"200px"}
        /> */}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default LoginScreen;
