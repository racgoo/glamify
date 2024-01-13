type routeType = {
    "index": {};
    "modal": {};
    "MainTabs": {tabPathname?: tabRouteType};
    "Login/SocialWebviewScreen": {uri: string};
    "Login/LoginScreen": {};
    "Camera/CameraTest": {};
    "Calendar/CalendarDetailModal": {date: string, scheduleList: {key: string,description: string,color: string,time: string}[]};
    "Calendar/MutateShedule": {date: string};
    "Calendar/SelectCalendarModal": {}
} 

type tabRouteType = 
"Home" |
"Search" |
"Interest" |
"Chat" |
"Setting";
 
