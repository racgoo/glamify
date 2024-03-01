type routeType = {
  index: {};
  modal: {};
  MainTabs: { tabPathname?: tabRouteType };
  "Login/SocialWebviewScreen": { uri: string };
  "Login/LoginScreen": {};
  "Camera/CameraTest": {};
  "Calendar/CalendarDetailModal": { date: string, selectedCalendar?: calendarType | undefined };
  "Calendar/SelectCalendarModal": { monthDate: string };
  "Calendar/CreateCalendarModal": {};
  "Schedule/CreateScheduleModal": { date: string };
};

type tabRouteType = "Home" | "Calendar" | "Community" | "Setting";

type EntriesType<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type calendarType = {
  user_id: number;
  calendar_id: number;
  title: string;
  description: string;
  register_date: string;
  update_date: string;
};

type scheduleWithInfoType = {
  schedule: scheduleType;
  info: scheduleInfoType;
}


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
  repeat_type: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${
    | '0'
    | '1'}${'0' | '1'}${'0' | '1'}`;
  interval_due_date: string | null
  interval_num: number
  schedule_infos?: scheduleInfoType[]
};

type scheduleInfoType = {
  schedule_info_id: number
  schedule_id: number
  register_date: string
  update_date: string
  done_Yn: "Y" | "N"
  target_date: string
  user_id: number
}


type dotType = { key: string; description: string; color: string,schedule: scheduleType,currentDateScheduleInfo: scheduleInfoType }

type markType = {
  [key: string]: {
    dots: dotType[];
    marked: boolean;
  };
};

type pushMessageDataType = {
  pathname?: keyof routeType;
  tabPathname?: tabRouteType;
  params?: object;
};
