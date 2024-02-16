type networkStatusType =
  | "SUCCESS"
  | "ENTITY_NOT_FOUND"
  | "ACCESS_DENIED"
  | "ACCESS_EXPIRED"
  | "INTERNAL_SERVER_ERROR"
  | "BAD_REQUEST";

interface defaultApiRequestType {
  access_token?: string;
  refresh_token?: string;
}

type defaultApiResponseType<T> =
  | {
      code: 200;
      message: string;
      data: T;
    }
  | {
      code: Exclude<number, 200>;
      message: string;
      data: null;
    };

interface API_healthCheck_request_type extends defaultApiRequestType {
  dummy: string;
}

type API_healthCheck_response_type = defaultApiResponseType<{
  dummy: string;
}>;

interface API_kakaoLoginVerify_request_type extends defaultApiRequestType {
  code: string;
}

type API_kakaoLoginVerify_response_type = defaultApiResponseType<{
  user_id: number | null;
  e_mail: string;
  image: string;
  nickname: string;
  phone_number: string;
  platform: string;
  update_date: string;
  register_date: string;
  access_token: string;
  refresh_token: string;
}>;

interface API_authByRefreshToken_request_type extends defaultApiRequestType {}

type API_authByRefreshToken_response_type = defaultApiResponseType<{
  user_id: number | null;
  e_mail: string;
  image: string;
  nickname: string;
  phone_number: string;
  platform: string;
  update_date: string;
  register_date: string;
  access_token: string;
  refresh_token: string;
}>;

interface API_updateExpoPushToken_request_type extends defaultApiRequestType {
  expo_push_token: string;
}

type API_updateExpoPushToken_response_type = defaultApiResponseType<{}>;

interface API_getCalendarList_request_type extends defaultApiRequestType {}

type API_getCalendarList_response_type = defaultApiResponseType<{
  calendarList: calendarType[];
}>;

interface API_createCalendar_request_type extends defaultApiRequestType {
  calendarName: string;
}

type API_createCalendar_response_type = defaultApiResponseType<{}>;

interface API_deleteCalendar_request_type extends defaultApiRequestType {
  calendar_id: number;
}

type API_deleteCalendar_response_type = defaultApiResponseType<{}>;

interface API_createSchedule_request_type extends defaultApiRequestType {
  calendar_id: number
  description: string
  due_date: string
  interval_num: number
  interval_due_date: string
  place: string
  repeat_type: string
  title: string
  weekly_days_mask: string
  interval_due_date: string
}

type API_createSchedule_response_type = defaultApiResponseType<{
  newSchedule: scheduleType;
}>;

interface API_getSchedule_request_type extends defaultApiRequestType {
  calendar_id?: number;
  target_date?: string;
}

type API_getSchedule_response_type = defaultApiResponseType<{
  scheduleList: scheduleType[];
}>;

interface API_deleteSchedule_request_type extends defaultApiRequestType {
  schedule_id: number;
}

type API_deleteSchedule_response_type = defaultApiResponseType<{}>;

interface API_checkSchedule_request_type extends defaultApiRequestType {
  schedule_id: number;
  target_date: string;
}

type API_checkSchedule_response_type = defaultApiResponseType<{}>;

interface API_searchSchedule_request_type extends defaultApiRequestType {
  calendar_id?: number;
  title?: string;
}

type API_searchSchedule_response_type = defaultApiResponseType<{
  scheduleList: scheduleType[];
}>;
