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
import { API_getCalendarList, API_getSchedule, API_healthCheck } from "../../controller/api";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
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
function Calendar() {
  const [searchText, setSearchText] = useState<string>("");
  const [moveKeyDate, setMoveKeyDate] = useState(moment().format("YYYY-MM-DD"));
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const calendarReocilValue = useRecoilValue(calendarAtom);

  const getCalendarListQuery = useQuery({
    queryKey: ["API_getCalendarList"],
    queryFn: () => API_getCalendarList({}),
  });
  const isCalenderListLoading = getCalendarListQuery.isLoading;
  const calenderListResult =  getCalendarListQuery.data?.data;

  useEffect(()=>{
    if(
      isCalenderListLoading === false &&
      calenderListResult?.data?.calendarList.length!==0 &&
      calendarReocilValue.currentCalendar===null
    ){
      setCurrentCalendar(calenderListResult?.data?.calendarList[0] as calendarType);
    }
  },[calenderListResult?.data?.calendarList])
  
  useEffect(()=>{
    if(isCalenderListLoading){
      requestLoadingOpen();
    }
  },[isCalenderListLoading]);

  useFocusEffect(
    useCallback(() => {
      getCalendarListQuery.refetch();
    }, [JSON.stringify({...{"dummy": 1}})])
  );

  const filterMarkedDates = (text: string) => {
    const searchResults= {};
    // const searchResults: {
    //   [key: string]: {
    //     dots: { key: string; color: string }[];
    //     marked: boolean;
    //   };
    // } = {};

    // for (const date in markedDates) {
    //   if (markedDates[date]) {
    //     const dots: any = markedDates[date]?.dots;
    //     const filteredDots = dots.filter((dot: any) => dot.key.includes(text));

    //     if (filteredDots.length > 0) {
    //       // 검색 결과가 있는 경우 해당 날짜의 데이터를 searchResults에 추가
    //       searchResults[date] = { dots: filteredDots, marked: true };
    //     }
    //   }
    // }

    return searchResults;
  };

  const handleFilter = (monthDate: string) => {
    router.navigate({pathname: "Calendar/SelectCalendarModal", params: { monthDate } as routeType["Calendar/SelectCalendarModal"] })
  }

  const handleOpeDetailModal = (date: string) => {
    router.navigate({
      pathname: "Calendar/CalendarDetailModal",
      params: {
        date
      } as routeType["Calendar/CalendarDetailModal"],
    });
  };

  const handleNewCalendar = () => {
    router.navigate({pathname: "Calendar/CreateCalendarModal"});
  }

  if(calenderListResult?.data?.calendarList.length===0)return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback >
      <View style={[styles.container,{ paddingHorizontal: 20, justifyContent: "center" }]}>
        <BtnXLarge 
          active={true}
          type="SolidHigh"
          action={handleNewCalendar}
          text={"새로운 캘린더 만들러 가기"}
        />
      </View> 
    </RenderSafeAreaView>
  )

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback  >
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
              onBlur={() => {
                setIsFocusOnInput(false);
              }}
              placeholder="검색어를 입력해주세요."
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            height: isFocusOnInput ? "auto" : 0,
            overflow: "hidden"
          }}
        >
          {Object.entries(filterMarkedDates(searchText)).map(([key, value]) => (
            <View key={key} >
              <Text>{key}</Text>
              {/* <View style={{ alignItems: "flex-end" }}>
                {value.dots.map((item,index) => (
                  <TouchableOpacity
                    key={index}
                    style={{borderWidth: 2}}
                    onPress={() => {
                      handleOpeDetailModal(key);
                    }}
                  >
                    <Text>{item.key}</Text>
                  </TouchableOpacity>
                ))}
              </View> */}
            </View>
          ))}
        </View>
        <View style={{ height: isFocusOnInput ? 0 : "auto" }}>
          {
            calendarReocilValue.currentCalendar &&
            <DynamicCalendar
              moveKeyDate={moveKeyDate}
              setMoveKeyDate={setMoveKeyDate}
              handleClick={handleOpeDetailModal}
              currentCalendar={calendarReocilValue.currentCalendar}
              handleFilter={handleFilter}
            />
          }
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
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.GR300,
  },
  searchBoxContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.White,
  },
});

export default React.memo(Calendar);
