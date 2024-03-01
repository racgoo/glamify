import {
  DeviceEventEmitter,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
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
  API_getAllScheduleForSearch,
  API_getCalendarList,
  API_getSchedule,
  API_healthCheck,
  API_searchSchedule,
} from "../../controller/api";
import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import ScheduleItem from "../../components/slider/ScheduleItem";
import requestDeleteSchedule from "../../action/schedule/requestDeleteSchedule";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import requestPopupOpen from "../../action/popup/requestPopupOpen";
function Calendar() {
  
  const [searchText, setSearchText] = useState<string>("");
  const [moveKeyDate, setMoveKeyDate] = useState(moment().format("YYYY-MM-DD"));
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const calendarReocilValue = useRecoilValue(calendarAtom);

  const getCalendarListQuery = useQuery({
    queryKey: ["API_getCalendarList"],
    queryFn: () => API_getCalendarList({}).then((res) => res.data),
  });
  const isCalenderListLoading = getCalendarListQuery.isLoading;
  const calenderListResult = getCalendarListQuery.data;
  const [dynamicCalendarUpdateCount,setDynamicCalendarUpdateCount] = useState(0);

  const getAllScheduleForSearchQuery = useQuery({
    queryKey: ["API_getAllScheduleForSearch"],
    queryFn: () => API_getAllScheduleForSearch({}).then((res) => res.data),
    initialData: { code: 200, message: "", data: { scheduleList: [] } },
    enabled: false
  });
  const isAllScheduleForSearchLoading = getAllScheduleForSearchQuery.isLoading;
  const allScheduleForSearchResult = getAllScheduleForSearchQuery.data;

  useEffect(()=>{
    DeviceEventEmitter.addListener("Calendar",(data) => {
      resetMoveKeyDate();
    })
  },[]);

  // useEffect(() => {
  //   console.log(JSON.stringify(allScheduleForSearchResult));
  // }, [allScheduleForSearchResult]);

  const resetMoveKeyDate = () => {
    requestLoadingOpen();
    setMoveKeyDate(moment().format("YYYY-MM-DD"));
    setTimeout(()=>{
      requestLoadingClose();
    },800);
  }

  useEffect(() => {
    if (
      isCalenderListLoading === false &&
      calenderListResult?.data?.calendarList !== undefined &&
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

  const handleOpenDetailModal = (
    date: string,
    selectedScheduleWithInfoList: scheduleWithInfoType[],
    selectedCalendar?: calendarType | undefined
  ) => {
    setSelectedScheduleWithInfoList(selectedScheduleWithInfoList);
    router.navigate({
      pathname: "Calendar/CalendarDetailModal",
      params: {
        date,
        selectedCalendar,
      } as routeType["Calendar/CalendarDetailModal"],
    });
  };

  const handleNewCalendar = () => {
    router.navigate({ pathname: "Calendar/CreateCalendarModal" });
  };

  if (
    calenderListResult?.data?.calendarList !== undefined &&
    calenderListResult?.data?.calendarList.length === 0
  )
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
                getAllScheduleForSearchQuery.refetch();
              }}
              onBlur={() => {}}
              placeholder="검색어를 입력해주세요."
              hideEraser={true}
            />
          </View>
          {searchText!=="" && (
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

        <ScrollView
          style={{
            width: "100%",
            paddingHorizontal: 20,
            height: isFocusOnInput ? "auto" : 0,
            overflow: "hidden"
          }}
        >
          {searchText !== "" &&
            allScheduleForSearchResult.data?.scheduleList
              ?.filter(
                (schdule) =>
                  schdule.title.includes(searchText) ||
                  schdule.description.includes(searchText)
              )
              .map((schedule) => (
                <View style={{height: 80,marginBottom: 10}} >
                    <ScheduleItem
                      onDelete={async()=>{
                        requestLoadingOpen();
                        requestPopupOpen({
                          title: "정말 삭제하겠습니까?",
                          description: "다시 복구하기 어렵습니다.",
                          type: "both",
                          action: async() => {
                            await requestDeleteSchedule({schedule,refetchQueries: [getAllScheduleForSearchQuery]});
                            setDynamicCalendarUpdateCount((pre) => pre+1);
                          },
                        });
                      }}
                      onPress={(schedule: scheduleType)=>{
                        // handleCheckSchedule(schedule,index);
                      }}
                      schedule={schedule}
                      isChecked={false}
                      isNeedChecked={false}
                      isNeedDetail={true}
                      isInterval={schedule.repeat_type==="ONCE" ? false : true}
                    />
                </View>
              ))}
        </ScrollView>

        <View style={{ height: searchText!=="" ? 0 : "auto" }}>
          {calendarReocilValue.currentCalendar && (
            <DynamicCalendar
              updateCount={dynamicCalendarUpdateCount}
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
