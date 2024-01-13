import axios, { AxiosResponse, AxiosInterceptorOptions } from "axios";
// import forceLogout from "../modules/auth/forceLogout";
// import requestPopupOpen from "../actions/popup/requestPopupOpen";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../recoil/recoil";
import requestPopupOpen from "../action/popup/requestPopupOpen";
import {
  API_authByRefreshToken_request_type,
  API_authByRefreshToken_response_type,
  API_healthCheck_request_type,
  API_healthCheck_response_type,
  API_kakaoLoginVerify_request_type,
  API_kakaoLoginVerify_response_type,
  networkStatusType,
} from "../types/api";
import requestLoadingClose from "../action/loading/requestLoadingClose";
import requestLogout from "../action/auth/requestLogout";
import requestAuthByRefreshToken from "../action/auth/requestAuthByRefreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requestLoadingOpen from "../action/loading/requestLoadingOpen";
// export const backendUrl = "http://dating.batro.org:4000/";
export const backendUrl = "http://172.20.10.2:4000/";

// export const backendUrl = "http://192.168.35.7:4000/";

export const backendWss = "wss://dating.batro.org/";

//kakao loginr
export const kakaoLoginUrl = backendUrl + "auth/kakao/login";
export const kakaoLogoutUrl = backendUrl + "auth/kakao/logout";

//instagram login
export const instagramLoginUrl = backendUrl + "auth/instagram/login";

export const customAxios = axios.create();
let cancelTokenSource = axios.CancelToken.source();

// 이전 요청 취소 함수
export const cancelPreviousRequests = () => {
  cancelTokenSource.cancel("Page navigation occurred");
  cancelTokenSource = axios.CancelToken.source();
};

const responseMiddleware = async (response: AxiosResponse) => {
  let statusType: networkStatusType = response.data.type;
  let statusMessage: string = response.data.message;
  

  if (response.data.code <= 300) {
    // 성공한 요청중에 300 보다 작은 요청 핸들링
    // 원하는 작업을 수행
  } else {
    switch (statusType) {
      case "ACCESS_DENIED":
        requestPopupOpen({
          title: "",
          description: `장시간 사용하지 않아\n로그아웃 되었습니다.`,
          type: "confirm",
          action: requestLogout,
        });
        break;
      case "ACCESS_EXPIRED":
        let isRefreshSuccess = await requestAuthByRefreshToken(
          (await AsyncStorage.getItem("refresh_token")) as string
        );
        if (isRefreshSuccess) {
          return await (response.config.method === "post" ? postRequest : getRequest)(
            (response.config.url as string).split(backendUrl)[1],
            JSON.parse(response.config.data), 
            {
              cancelToken: cancelTokenSource.token,
              headers: response.config.headers,
            }
          );
        } else {
          return Promise.reject();
        }
        break;
      default:
        requestPopupOpen({
          title: "",
          description: statusMessage,
          type: "confirm",
        });
      // default:
      //   requestPopupOpen("",response.data.message,"cancel",()=>{});
      //   break;
    }
  }
  return response;
};

customAxios.interceptors.response.use(
  (response) => {
    requestLoadingClose();
    return responseMiddleware(response);
  },
  (error) => {
    requestLoadingClose();
    requestPopupOpen({
      title: "오류가 발생했습니다.\n다시 시도해 주세요.",
      description: "",
      type: "confirm",
    });
    return Promise.reject(error);
  }
);

const postRequest = (path: string, body: any, headers?: any,isNeedToken: boolean = true) => {
  let payload = {
    ...body,
  };
  if(isNeedToken){
    let { access_token } = getRecoil(userAtom);
    payload.access_token=access_token;
  }
  return customAxios.post(backendUrl + path, payload, {
    cancelToken: cancelTokenSource.token,
    headers: {...headers}
  });
};

const getRequest = (path: string, body: any, headers?: any) => {
  return customAxios.get(backendUrl + path, {
    cancelToken: cancelTokenSource.token,
    headers: {...headers}
  });
};

export const API_healthCheck = (data: API_healthCheck_request_type): Promise<AxiosResponse<API_healthCheck_response_type>> => {
  return postRequest("health/healthCheck", data);
};


export const API_kakaoLoginVerify = (
  data: API_kakaoLoginVerify_request_type
): Promise<AxiosResponse<API_kakaoLoginVerify_response_type>> => {
  return postRequest("auth/kakao/loginVerify", data);
};

export const API_authByRefreshToken = (
  data: API_authByRefreshToken_request_type
): Promise<AxiosResponse<API_authByRefreshToken_response_type>> => {
  return postRequest("auth/authByRefreshToken", data,{},false);
};

// export const API_tokenLogin = (data) => {
//   return postRequest("auth/token/login",data);
// }

// export const API_registerChatRoom = (data) => {
//   return postRequest("chat/register_chat_room",data);
// }

// export const API_getChatRoom = (data) => {
//   return postRequest("chat/get_chat_room",data);
// }

// export const API_getChat = (data) => {
//   return postRequest("chat/get_chat",data);
// }

// export const API_registerChat = (data) => {
//   return postRequest("chat/register_chat",data);
// }
