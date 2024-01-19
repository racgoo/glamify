type routeType = {
    "index": {};
    "modal": {};
    "MainTabs": {tabPathname?: tabRouteType};
    "Login/SocialWebviewScreen": {uri: string};
    "Login/LoginScreen": {};
    "Camera/CameraTest": {};
    "Calendar/CalendarDetailModal": {date: string};
    "Calendar/SelectCalendarModal": {monthDate: string};
    "Calendar/CreateCalendarModal": {};
    "Schedule/CreateScheduleModal": {date: string};
} 

type tabRouteType = 
"Home" |
"Search" |
"Interest" |
"Chat" |
"Setting";
 
type calendarType = {
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    register_date: string;
    update_date: string;
};

type scheduleType = {
    schedule_id: number
    user_id: number
    title: string
    description: string
    register_date: string
    update_date: string
    due_date: string
    calendar_id: number
    is_done: boolean
}

type markType = {
    [key: string]: {
      dots: { key: string; description: string; color: string }[];
      marked: boolean;
    };
}