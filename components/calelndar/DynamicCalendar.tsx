import moment from "moment";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  FlatListComponent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Agenda,
  Calendar,
  CalendarList,
  CalendarProps,
  CalendarProvider,
  DateData,
  LocaleConfig,
  NewCalendarList,
} from "react-native-calendars";
import colors from "../../styles/colors";
import CommonText from "../text/CommonText";
import hashStringToRGB from "../../modules/rgb/hashStringToRGB";
import Spinner from "../../assets/animation/Spinner";
import { DayProps } from "react-native-calendars/src/calendar/day";
import Filter from "../../assets/icons/filter/Filter";
import router from "../../references/router";
import { useQuery } from "@tanstack/react-query";
import { API_getSchedule } from "../../controller/api";
import momentToUtcString from "../../modules/time/momentToUtcString";
import transformScheduleToMarkData from "../../modules/transformer/transformScheduleToMarkData";
import { useRecoilValue } from "recoil";
import { calendarAtom, scheduleAtom } from "../../recoil/recoil";
import setSelectedDate from "../../action/calendar/setSelectedDate";
import setSelectedScheduleWithInfoList from "../../action/schedule/setSelectedScheduleWithInfoList";
import utcStringToMoment from "../../modules/time/utcStringToMoment";
import repetitionDayJSON from "../../assets/json/repetitionDayJSON";

interface DynamicCalendarProps {
  handleClick: (date: string, selectedScheduleWithInfoList: scheduleWithInfoType[]) => void;
  moveKeyDate: string;
  setMoveKeyDate: (newKey: string) => void;
  // markedDates: {[key: string]: {dots: {key: string; color: string; description: string; time: string;}[], marked: boolean}}
  currentCalendar: calendarType;
  calendarList?: string[]
  handleFilter?: (monthDate: string)=>void;
  updateCount?: number;
}
const DynamicCalendar = ({
  handleClick,
  moveKeyDate,
  setMoveKeyDate,
  currentCalendar,
  updateCount = 0,
  handleFilter = () => {}
}: DynamicCalendarProps) => {

  const { selectedDate } = useRecoilValue(calendarAtom);;
  const flatListRef = useRef<FlatList>(null);
  const calendarListRef = useRef<typeof CalendarList>(null);
  const [isReady, setIsReady] = useState(false);
  const [monthDate, setmonthDate] = useState(moment().format("YYYY-MM-DD"));
  const [markedDates,setMarkedDates] = useState<markType>({});

  const getScheduleQuery = useQuery({
    queryKey: ["API_getSchedule",currentCalendar.calendar_id],
    queryFn: () => API_getSchedule({
      calendar_id: currentCalendar.calendar_id,
      target_date: momentToUtcString(moment(monthDate))
    }).then(res=>res.data),
  });
  
  useEffect(()=>{
    getScheduleQuery.refetch();
  },[monthDate,currentCalendar,updateCount]);

  const isScheduleLoading = getScheduleQuery.isLoading;
  const scheduleResult =  getScheduleQuery.data;

  useEffect(()=>{
    // console.log(JSON.stringify(scheduleResult?.data?.scheduleList))
  },[scheduleResult]);

  useEffect(()=>{
    if(scheduleResult?.data?.scheduleList){
      let newMarkedDates = transformScheduleToMarkData(scheduleResult?.data?.scheduleList);
      if(selectedDate && newMarkedDates[selectedDate]){
        setSelectedScheduleWithInfoList(dotsToScheduleWithInfoList(newMarkedDates[selectedDate].dots));
      }
      setMarkedDates(newMarkedDates);
    }
  },[scheduleResult?.data?.scheduleList]);

  // useEffect(()=>{
  //   console.log(JSON.stringify(scheduleResult))
  // },[scheduleResult]);
  LocaleConfig.locales["kr"] = {
    monthNames: new Array(12).fill(null).map((_, index) => `${index + 1}월`),
    dayNamesShort: repetitionDayJSON,
    dayNames: repetitionDayJSON.map(
      (d) => d + "요일"
    ),
    today: "오늘",
  };
  LocaleConfig.defaultLocale = "kr";

  useEffect(() => {
    setMoveKeyDate("");
  }, [moveKeyDate]);

  const dotsToScheduleWithInfoList = (dots: dotType[]) => {
    if(dots && dots.length!==0){
      return dots.map(dot => ({
        schedule: dot.schedule,
        info: dot.currentDateScheduleInfo
      }));
    }else{
      return [];
    }
  }

  const renderDay:
    | React.ComponentType<
        DayProps & {
          date?: DateData | undefined;
          today?: string;
        }
      >
    | undefined = ({ date,today, state, marking }) => {
    let isToday = (today===date?.dateString);
    let dots: dotType[] = marking?.dots as dotType[];
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ width: "100%", height: 80,borderRadius: 8, borderWidth: 2, borderColor:  isToday ? colors.orange.OR500 : "#FFFFFF", paddingHorizontal: 1}}
        onPress={() => {
          let currentShortDate = date?.dateString as string;
          setSelectedDate(currentShortDate);
          handleClick(currentShortDate,dotsToScheduleWithInfoList((marking?.dots as dotType[])));
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CommonText
            text={date?.day.toString()}
            color={state === "disabled" ? colors.gray.GR300 : colors.gray.GR700}
            type="Body5S14"
          />
          {marking &&
            dots?.filter(dot => dot.currentDateScheduleInfo.done_Yn==="N")?.slice(0,4).map((dot, index) => (
              <View
                key={index}
                style={{
                  width: "100%",
                  backgroundColor: dot.color,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  borderRadius: 20,
                  marginBottom: 1,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                <CommonText
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  text={dot.key}
                  type="Caption1M10"
                  color={colors.gray.White}
                  margin={0}
                />
              </View>
            ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      {!isReady && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colors.gray.White,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner />
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={[
          <View style={{ alignItems: "center", justifyContent: "center"}}>
            <View style={{ flexDirection: "row",alignItems: "center",justifyContent: "space-between",width: "100%", paddingHorizontal: 20 }}>
              <CommonText
                text={moment(monthDate).format("YYYY년 MM월")}
                color={colors.gray.GR800}
                type="Title1B24"
                marginBottom={20}
                marginTop={20}
              />
              <TouchableOpacity 
                style={{flexDirection: "row", alignItems: "center"}} 
                onPress={()=>{handleFilter(monthDate)}}
              >
                <Filter />
                <CommonText 
                  text={currentCalendar.title ?? ""}
                  color={colors.gray.GR900}
                  type="Body1S16"
                  marginLeft={4}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingHorizontal: 15,
              }}
            >
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <View
                  key={day}
                  style={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CommonText
                    text={day}
                    color={
                      day === "토"
                        ? colors.blue.Blue400
                        : day === "일"
                        ? colors.red.Red400
                        : colors.gray.GR800
                    }
                    type="Body3S15"
                  />
                </View>
              ))}
            </View>
          </View>,
          <CalendarList
            ref={calendarListRef}
            onMonthChange={(event) => {
              setmonthDate(`${event.year}-${event.month}-01`);
              flatListRef.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }}
            markingType={"multi-dot"}
            key={""}
            initialDate={moveKeyDate}
            current={moveKeyDate}
            hideExtraDays={false}
            customHeader={() => <Fragment />}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              minHeight: 620
            }}
            scrollToOverflowEnabled
            markedDates={{
              ...markedDates,
            }}
            pagingEnabled={true}
            dayComponent={(date)=>renderDay({...date,today: moment().format("YYYY-MM-DD")})}
            theme={{
              selectedDayBackgroundColor: colors.red.Red300,
              arrowColor: colors.gray.GR400,
              todayTextColor: colors.red.Red300,
            }}
            hideArrows={false}
            onVisibleMonthsChange={(months) => {
              // 여기에서 로딩이 완료되었음을 확인할 수 있음
              setIsReady(true);
            }}
            horizontal
          />,
        ]}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
};
export default DynamicCalendar;
