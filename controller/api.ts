import axios, { AxiosResponse, AxiosInterceptorOptions } from "axios";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../recoil/recoil";
import requestPopupOpen from "../action/popup/requestPopupOpen";

import requestLogout from "../action/auth/requestLogout";
import requestAuthByRefreshToken from "../action/auth/requestAuthByRefreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const backendUrl = "http://dating.batro.org:4000/";
export const backendUrl = "http://172.20.10.2:4000/";
// export const backendUrl = "http://192.168.35.7:4000/";
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
    }
  }
  return response;
};

customAxios.interceptors.response.use(
  (response) => {
    // requestLoadingClose();
    return responseMiddleware(response);
  },
  (error) => {
    // requestLoadingClose();
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

export const API_updateExpoPushToken = (
  data: API_updateExpoPushToken_request_type
): Promise<AxiosResponse<API_updateExpoPushToken_response_type>> => {
  return postRequest("user/updateExpoPushToken", data,{},false);
};
export const API_getCalendarList = (
  data: API_getCalendarList_request_type
): Promise<AxiosResponse<API_getCalendarList_response_type>> => {
  return postRequest("calendar/getCalendarList", data,{});
};

export const API_createCalendar = (
  data: API_createCalendar_request_type
): Promise<AxiosResponse<API_createCalendar_response_type>> => {
  return postRequest("calendar/createCalendar", data,{});
};

export const API_deleteCalendar = (
  data: API_deleteCalendar_request_type
): Promise<AxiosResponse<API_deleteCalendar_response_type>> => {
  return postRequest("calendar/deleteCalendar", data,{});
};

export const API_createSchedule = (
  data: API_createSchedule_request_type
): Promise<AxiosResponse<API_createSchedule_response_type>> => {
  return postRequest("schedule/createSchedule", data,{});
};

export const API_getSchedule = (
  data: API_getSchedule_request_type
): Promise<AxiosResponse<API_getSchedule_response_type>> => {
  return postRequest("schedule/getSchedule", data,{});
};

export const API_saveCalendarLabelList = (
  data: API_saveCalendarLabelList_request_type
): Promise<AxiosResponse<API_saveCalendarLabelList_response_type>> => {
  return postRequest("calendar/saveCalendarLabelList", data,{});
};

export const API_deleteCalendarLabel = (
  data: API_deleteCalendarLabel_request_type
): Promise<AxiosResponse<API_deleteCalendarLabel_response_type>> => {
  return postRequest("calendar/deleteCalendarLabel", data,{});
};

export const API_getCalendarLabelList = (
  data: API_getCalendarLabelList_request_type
): Promise<AxiosResponse<API_getCalendarLabelList_response_type>> => {
  return postRequest("calendar/getCalendarLabelList", data,{});
};

export const API_getAllScheduleForSearch = (
  data: API_getAllScheduleForSearch_request_type
): Promise<AxiosResponse<API_getAllScheduleForSearch_response_type>> => {
  return postRequest("schedule/getAllScheduleForSearch", data,{});
};

export const API_deleteSchedule = (
  data: API_deleteSchedule_request_type
): Promise<AxiosResponse<API_deleteSchedule_response_type>> => {
  return postRequest("schedule/deleteSchedule", data,{});
};

export const API_checkSchedule = (
  data: API_checkSchedule_request_type
): Promise<AxiosResponse<API_checkSchedule_response_type>> => {
  return postRequest("schedule/checkSchedule", data,{});
};

export const API_searchSchedule = (
  data: API_searchSchedule_request_type
): Promise<AxiosResponse<API_searchSchedule_response_type>> => {
  return postRequest("schedule/searchSchedule", data,{});
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
