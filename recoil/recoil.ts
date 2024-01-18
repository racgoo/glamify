import {atom,selector} from "recoil";
import * as api from "../controller/api";

interface userAtomProps {
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
}

interface systemAtomProps {
    isReady: boolean;
    isSocketConnected: boolean;
    appState: string;
    isTokenRegisterdToSocketExist: boolean;
    location: locationProps
}

interface calendarAtomProps {
    currentCalendar: null | calendarType 
}

interface locationProps {
    latitude: null | number;
    longitude: null | number;
}

interface serverDataAtomProps {
    near_user_data: {
        image: string;
        nickname: string;
        user_id: number;
        coords: locationProps;
    }[]
}


export const userAtom = atom<userAtomProps>({
    key: 'userAtom',
    default: {
        user_id: null,
        e_mail: "",
        image: "",
        nickname: "",
        phone_number: "",
        platform: "",
        update_date: "",
        register_date: "",
        access_token: "",
        refresh_token: "",
    }
});

interface chatAtomProps {
    rooms: any[],   
}

export const systemAtom = atom<systemAtomProps>({
    key: 'systemAtom',
    default: {
        isReady: false,
        isSocketConnected: false,
        appState: "forground",
        isTokenRegisterdToSocketExist: false,
        location: {
            latitude: null,
            longitude: null
        }
    }
});

export const calendarAtom = atom<calendarAtomProps>({
    key: 'calendarAtom',
    default: {
        currentCalendar: null 
    }
});

export const serverDataAtom = atom<serverDataAtomProps>({
    key: 'serverDataAtom',
    default: {
        near_user_data: []
    }
});

export const chatAtom = atom<chatAtomProps>({
    key: 'chatAtom',
    default: {
        rooms: [],
    }
})

export const requestSetChatItem = selector({
    key: "requestSetChatItem",
    get: ({ get })=> get(chatAtom),
    set: ({ set,get },chatItemObect) => {
        let chat = get(chatAtom);
        set(chatAtom,{...chat,...chatItemObect});
    }
});

export const requestSetSystemItem = selector({
    key: "requestSetSystemItem",
    get: ({ get })=> get(systemAtom),
    set: ({ set,get },systemItemObect) => {
        let system = get(systemAtom);
        set(systemAtom,{...system,...systemItemObect});
    }
});

export const requestSetUserItem = selector({
    key: "requestSetUserItem",
    get: ({ get })=> get(userAtom),
    set: ({ set },userItemObect) => {
        set(userAtom, (prevState) => ({ ...prevState, ...userItemObect }));
    }
});

export const requestSetCalendarItem = selector({
    key: "requestSetCalendarItem",
    get: ({ get })=> get(calendarAtom),
    set: ({ set,get },calendarItemObject) => {
        set(calendarAtom,(prevState) => ({...prevState,...calendarItemObject}));
    }
});

export const requestSetServerDataItem = selector({
    key: "requestSetServerDataItem",
    get: ({ get })=> get(serverDataAtom),
    set: ({ set },serverDataItemObject) => {
        set(serverDataAtom, (prevState) => ({ ...prevState, ...serverDataItemObject }));
    }
});




