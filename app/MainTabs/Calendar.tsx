import {
  DeviceEventEmitter,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import router from "../../references/router";
import { View } from "react-native";
import {
  API_getCalendarList,
  API_getSchedule,
  API_healthCheck,
  API_searchSchedule,
} from "../../controller/api";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import CommonTextInput from "../../components/text/CommonTextInput";
import colors from "../../styles/colors";
import moment from "moment";
import DynamicCalendar from "../../components/calelndar/DynamicCalendar";
import AgendaScreen from "../../components/calelndar/AgendaScreen";
import BtnXLarge from "../../components/button/BtnXLarge";
import hashStringToRGB from "../../modules/rgb/hashStringToRGB";
import CommonText from "../../components/text/CommonText";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import { useRecoilValue } from "recoil";
import { calendarAtom } from "../../recoil/recoil";
import setCurrentCalendar from "../../action/calendar/setCurrentCalendar";
import Spinner from "../../assets/animation/Spinner";
import setSelectedScheduleWithInfoList from "../../action/schedule/setSelectedScheduleWithInfoList";
function Calendar() {
  const [searchText, setSearchText] = useState<string>("");
  const [moveKeyDate, setMoveKeyDate] = useState(moment().format("YYYY-MM-DD"));
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const calendarReocilValue = useRecoilValue(calendarAtom);

  const getCalendarListQuery = useQuery({
    queryKey: ["API_getCalendarList"],
    queryFn: () => API_getCalendarList({}).then(res=>res.data),
  });
  const isCalenderListLoading = getCalendarListQuery.isLoading;
  const calenderListResult = getCalendarListQuery.data;

  const searchScheduleQuery = useQuery({
    queryKey: ["API_searchSchedule",calendarReocilValue.currentCalendar?.calendar_id],
    queryFn: () => API_searchSchedule({title: searchText, calendar_id: calendarReocilValue.currentCalendar?.calendar_id}).then(res=>res.data),
    enabled: false
  });

  const isSearchScheduleLoading = searchScheduleQuery.isLoading;
  const searchScheduleResult = searchScheduleQuery.data;
  
  useFocusEffect(
    useCallback(() => {
      if(calendarReocilValue.currentCalendar?.calendar_id)searchScheduleQuery.refetch();
    }, [searchText,calendarReocilValue.currentCalendar?.calendar_id])
  );
  
  useEffect(() => {
    if (
      isCalenderListLoading === false &&
      calenderListResult?.data?.calendarList !==undefined &&
      calenderListResult?.data?.calendarList.length !== 0 &&
      calendarReocilValue.currentCalendar === null
    ) {
      setCurrentCalendar(
        calenderListResult?.data?.calendarList[0] as calendarType
      );
    }
  }, [calenderListResult?.data?.calendarList]);

  useEffect(() => {
    if (isCalenderListLoading) {
      requestLoadingOpen();
    }
  }, [isCalenderListLoading]);

  useFocusEffect(
    useCallback(() => {
      getCalendarListQuery.refetch();
    }, [JSON.stringify({ ...{ dummy: 1 } })])
  );

  const handleFilter = (monthDate: string) => {
    router.navigate({
      pathname: "Calendar/SelectCalendarModal",
      params: { monthDate } as routeType["Calendar/SelectCalendarModal"],
    });
  };

  const handleOpenDetailModal = (date: string,selectedScheduleWithInfoList: scheduleWithInfoType[]) => {
    setSelectedScheduleWithInfoList(selectedScheduleWithInfoList);
    router.navigate({
      pathname: "Calendar/CalendarDetailModal",
      params: {
        date
      } as routeType["Calendar/CalendarDetailModal"],
    });
  };

  const handleNewCalendar = () => {
    router.navigate({ pathname: "Calendar/CreateCalendarModal" });
  };

  if ( calenderListResult?.data?.calendarList!==undefined && calenderListResult?.data?.calendarList.length === 0)
    return (
      <RenderSafeAreaView isNeedTouchableWithoutFeedback>
        <View
          style={[
            styles.container,
            { paddingHorizontal: 20, justifyContent: "center" },
          ]}
        >
          <BtnXLarge
            active={true}
            type="SolidHigh"
            action={handleNewCalendar}
            text={"새로운 캘린더 만들러 가기"}
          />
        </View>
      </RenderSafeAreaView>
    );

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <CommonTextInput
              text={searchText}
              setText={setSearchText}
              color={colors.gray.GR900}
              placeholderTextColor={colors.gray.White}
              onFocus={() => {
                setIsFocusOnInput(true);
              }}
              onBlur={() => {}}
              placeholder="검색어를 입력해주세요."
            />
          </View>
          {isFocusOnInput && (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
              }}
              onPress={() => {
                Keyboard.dismiss();
                setIsFocusOnInput(false);
                setSearchText("");
              }}
            >
              <CommonText
                text={"취소"}
                type="Body1S16"
                color={colors.gray.GR800}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            height: isFocusOnInput ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          {
            isSearchScheduleLoading 
            ?
              <Spinner />
            : searchText === ""
            ?
              <View />
            :
            searchScheduleResult?.data?.scheduleList.map(schedule => (
              <TouchableOpacity
              key={schedule.calendar_id}
               onPress={()=>{
                handleOpenDetailModal(moment(schedule.due_date).format("YYYY-MM-DD"));
              }}
                style={{borderWidth: 1}}
               >
                <View style={{width: "100%", height: 1, backgroundColor: colors.gray.GR900}} />
                <CommonText 
                  text={moment(schedule.due_date).format("YYYY년 MM월 DD일 HH시 mm분")}
                  type="Body1S16"
                  color={colors.gray.GR800}
                />
                <CommonText 
                  text={schedule.title}
                  type="Body1S16"
                  color={colors.gray.GR750}
                />
                <CommonText 
                  text={schedule.description}
                  type="Body1S16"
                  color={colors.gray.GR750}
                />
                <CommonText 
                  text={schedule.is_done ? "완료" : "미완료"}
                  type="Body1S16"
                  color={colors.gray.GR750}
                />
              </TouchableOpacity>
            ))
          }
        </View> */}

        <View style={{ height: isFocusOnInput ? 0 : "auto" }}>
          {calendarReocilValue.currentCalendar && (
            <DynamicCalendar
              moveKeyDate={moveKeyDate}
              setMoveKeyDate={setMoveKeyDate}
              handleClick={handleOpenDetailModal}
              currentCalendar={calendarReocilValue.currentCalendar}
              handleFilter={handleFilter}
            />
          )}
        </View>
      </View>
    </RenderSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  searchBox: {
    flexGrow: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.GR300,
  },
  searchBoxContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.White,
  },
});

export default React.memo(Calendar);
