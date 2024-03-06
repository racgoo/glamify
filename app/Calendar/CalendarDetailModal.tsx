import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import router from "../../references/router";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import { useRoute } from "@react-navigation/native";
import serializeParams from "../../modules/params/serializeParams";
import BtnXLarge from "../../components/button/BtnXLarge";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  API_checkSchedule,
  API_deleteSchedule,
  API_getCalendarLabelList,
  API_getSchedule,
} from "../../controller/api";
import momentToUtcString from "../../modules/time/momentToUtcString";
import { useRecoilValue } from "recoil";
import { calendarAtom, scheduleAtom } from "../../recoil/recoil";
import checkIsSameDay from "../../modules/time/checkIsSameDay";
import ScheduleItem from "../../components/slider/ScheduleItem";
import requestPopupOpen from "../../action/popup/requestPopupOpen";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import { useEffect, useState } from "react";
import momentResetTime from "../../modules/time/momentResetTime";
import setSelectedScheduleWithInfoList from "../../action/schedule/setSelectedScheduleWithInfoList";
import copy from "../../modules/data/copy";
import requestDeleteSchedule from "../../action/schedule/requestDeleteSchedule";

const CalendarDetailModal = () => {
  const calendarRecoilValue = useRecoilValue(calendarAtom);
  const { selectedScheduleWithInfoList } = useRecoilValue(scheduleAtom);
  const { date, selectedCalendar } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Calendar/CalendarDetailModal"];

  const currentCalendar: calendarType = (selectedCalendar ??
    calendarRecoilValue.currentCalendar) as calendarType;

  const handlePress = async () => {
    router.navigate({
      pathname: "Schedule/CreateScheduleModal",
      params: { date } as routeType["Schedule/CreateScheduleModal"],
    });
  };

  const getScheduleQuery = useQuery({
    queryKey: ["API_getSchedule", currentCalendar?.calendar_id],
    queryFn: () =>
      API_getSchedule({
        calendar_id: currentCalendar?.calendar_id as number,
        target_date: momentToUtcString(momentResetTime(moment(date))),
      }).then((res) => res.data),
    enabled: false,
  });

  const scheduleResult = getScheduleQuery.data;

  const getCalendarLabelListQuery = useQuery({
    queryKey: [
      "API_getCalendarLabelList",
      calendarRecoilValue.currentCalendar?.calendar_id,
    ],
    queryFn: () =>
      API_getCalendarLabelList({
        calendar_id: calendarRecoilValue.currentCalendar?.calendar_id as number,
      }).then((res) => res.data),
    initialData: { code: 200, message: "", data: { labelList: [] } },
    enabled: false
  });

  useEffect(()=>{
    if(calendarRecoilValue.currentCalendar?.calendar_id !==0){
      getCalendarLabelListQuery.refetch();
    }
  },[]);

  // const scheduleList =  scheduleResult?.data?.scheduleList.filter(schedule => checkIsSameDay(schedule.due_date,moment.utc(date)));

  const handleDeleteModalOpen = (schedule: scheduleType, index: number) => {
    requestPopupOpen({
      title: "정말 삭제하겠습니까?",
      description: "다시 복구하기 어렵습니다.",
      type: "both",
      action: () => {
        handleDeleteSchedule(schedule, index);
      },
    });
  };

  const handleDeleteSchedule = async (
    schedule: scheduleType,
    index: number
  ) => {
    requestLoadingOpen();
    handleChangeCacheData(index, "delete");
    requestDeleteSchedule({
      schedule,
      refetchQueries: [getScheduleQuery],
    });
  };

  const handleChangeCacheData = (index: number, type: "delete" | "check") => {
    let newData = copy(selectedScheduleWithInfoList);
    switch (type) {
      case "check":
        newData[index].info.done_Yn =
          newData[index].info.done_Yn === "Y" ? "N" : "Y";

        break;
      case "delete":
        newData.splice(index, 1);
        break;
    }
    setSelectedScheduleWithInfoList(newData);
  };

const deleteSpecialDate = (selectedScheduleWithInfoList: scheduleWithInfoType[]) => {
  return selectedScheduleWithInfoList.filter(selectedScheduleWithInfo => selectedScheduleWithInfo.schedule.due_date!=="");
}

  const handleCheckSchedule = (
    scheduleWithInfo: scheduleWithInfoType,
    index: number
  ) => {
    handleChangeCacheData(index, "check");
    API_checkSchedule({
      schedule_id: scheduleWithInfo.schedule.schedule_id,
      target_date: scheduleWithInfo.info.target_date,
    }).then(async (res) => {
      let { code } = res.data;
      if (code !== 200) {
        handleChangeCacheData(index, "check");
      } else {
        getScheduleQuery.refetch();
      }
    });
  };

  const renderListItem = (
    scheduleWithInfo: scheduleWithInfoType,
    index: number
  ) => {
    return (
      <ScheduleItem
        onDelete={() => {
          handleDeleteModalOpen(scheduleWithInfo.schedule, index);
        }}
        onPress={(schedule: scheduleType) => {
          handleCheckSchedule(scheduleWithInfo, index);
        }}
        schedule={scheduleWithInfo.schedule}
        isChecked={scheduleWithInfo.info.done_Yn === "Y"}
        isInterval={
          scheduleWithInfo.schedule.repeat_type === "ONCE" ? false : true
        }
      />
    );
  };

  return (
    <RenderSafeAreaView>
      <View style={styles.container}>
        <CommonText
          text={currentCalendar.title}
          type="Title2B20"
          color={colors.blue.Blue400}
        />

        <CommonText
          text={moment(date).format("YY년 MM월 DD일 일정")}
          type="Title1B24"
          color={colors.red.Red300}
          marginBottom={4}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={{ width: "100%" }}
          data={deleteSpecialDate(selectedScheduleWithInfoList)}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item, index }) => renderListItem(item, index)}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CommonText
                text={"일정이 없습니다."}
                type="Body4B14"
                color={colors.gray.GR750}
              />
            </View>
          }
        />

        <BtnXLarge
          active={true}
          type="SolidHigh"
          text={"일정 추가하기"}
          action={handlePress}
          style={{ marginTop: 10 }}
        />
      </View>
    </RenderSafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleContainer: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
});
export default CalendarDetailModal;
