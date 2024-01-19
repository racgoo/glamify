export type networkStatusType = 
"SUCCESS" |
"ENTITY_NOT_FOUND" |
"ACCESS_DENIED" |
"ACCESS_EXPIRED" |
"INTERNAL_SERVER_ERROR" |
"BAD_REQUEST";

interface defaultApiRequestType {
    access_token?: string;
    refresh_token?: string;
}

type defaultApiResponseType<T> = { 
    code: 200;
    message: string;
    data: T;
} | {
    code: Exclude<number, 200>
    message: string
    data: null
};

export interface API_healthCheck_request_type extends defaultApiRequestType {
    dummy: string
}

export type API_healthCheck_response_type = defaultApiResponseType<{
    dummy: string
}>


  
export interface API_kakaoLoginVerify_request_type extends defaultApiRequestType {
    code: string;   
}

export type API_kakaoLoginVerify_response_type = defaultApiResponseType<{
    user_id: number | null
    e_mail: string
    image: string
    nickname: string
    phone_number: string
    platform: string
    update_date: string
    register_date: string
    access_token: string
    refresh_token: string
}>



export interface API_authByRefreshToken_request_type extends defaultApiRequestType {}

export type API_authByRefreshToken_response_type = defaultApiResponseType<{
    user_id: number | null
    e_mail: string
    image: string
    nickname: string
    phone_number: string
    platform: string
    update_date: string
    register_date: string
    access_token: string
    refresh_token: string
}>



export interface API_getCalendarList_request_type extends defaultApiRequestType {}

export type API_getCalendarList_response_type = defaultApiResponseType<{
    calendarList: calendarType[]
}>



export interface API_createCalendar_request_type extends defaultApiRequestType {
    calendarName: string
}

export type API_createCalendar_response_type = defaultApiResponseType<{}>



export interface API_deleteCalendar_request_type extends defaultApiRequestType {
    calendar_id: number
}

export type API_deleteCalendar_response_type = defaultApiResponseType<{}>


export interface API_createSchedule_request_type extends defaultApiRequestType {
    calendar_id: number
    title: string,
    description: string,
    due_date: string,
}

export type API_createSchedule_response_type = defaultApiResponseType<{}>



export interface API_getSchedule_request_type extends defaultApiRequestType {
    calendar_id: number
    target_date: string
}

export type API_getSchedule_response_type = defaultApiResponseType<{
    scheduleList: scheduleType[]
}>



export interface API_deleteSchedule_request_type extends defaultApiRequestType {
    schedule_id: number
}

export type API_deleteSchedule_response_type = defaultApiResponseType<{}>



export interface API_checkSchedule_request_type extends defaultApiRequestType {
    schedule_id: number
}

export type API_checkSchedule_response_type = defaultApiResponseType<{}>
