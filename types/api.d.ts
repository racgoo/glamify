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
    calendarList: {
        user_id: number
        calendar_id: number
        title: string
        description: string
        register_date: string
        update_date: string
    }[]
}>

export interface API_createCalendar_request_type extends defaultApiRequestType {
    calendarName: string
}

export type API_createCalendar_response_type = defaultApiResponseType<{}>

export interface API_deleteCalendar_request_type extends defaultApiRequestType {
    calendar_id: number
}

export type API_deleteCalendar_response_type = defaultApiResponseType<{}>