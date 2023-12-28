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