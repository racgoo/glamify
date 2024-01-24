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
import { API_checkSchedule, API_deleteSchedule, API_getSchedule } from "../../controller/api";
import momentToUtcString from "../../modules/time/momentToUtcString";
import { useRecoilValue } from "recoil";
import { calendarAtom } from "../../recoil/recoil";
import checkIsSameDay from "../../modules/time/checkIsSameDay";
import ScheduleItem from "../../components/slider/ScheduleItem";
import requestPopupOpen from "../../action/popup/requestPopupOpen";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import { useEffect, useState } from "react";
import cancelPushSchedule from "../../modules/pushMessage/cancelPushSchedule";
import addPushSchedule from "../../modules/pushMessage/addPushSchedule";

const CalendarDetailModal = () => {
  const queryClient = useQueryClient();
  const calendarRecoilValue = useRecoilValue(calendarAtom);
  const { date } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Calendar/CalendarDetailModal"];

  const handlePress = async () => {
    router.navigate({
      pathname: "Schedule/CreateScheduleModal",
      params: { date } as routeType["Schedule/CreateScheduleModal"],
    });
  };

  const getScheduleQuery = useQuery({
    queryKey: ["API_getSchedule",calendarRecoilValue.currentCalendar?.calendar_id],
    queryFn: () => API_getSchedule({
      calendar_id: calendarRecoilValue.currentCalendar?.calendar_id as number,
      target_date: momentToUtcString(moment(date))
    }).then(res => res.data),
    enabled: false
  });
  
  const scheduleResult =  getScheduleQuery.data;
  const scheduleList =  scheduleResult?.data?.scheduleList.filter(schedule => checkIsSameDay(schedule.due_date,moment.utc(date))); 

  const handleDeleteModalOpen = (schedule: scheduleType) => {
    requestPopupOpen(
        {
            title: "정말 삭제하겠습니까?",
            description: "다시 복구하기 어렵습니다.",
            type: "both",
            action: ()=> {
              handleDeleteSchedule(schedule)
            }
        }
    );
  }
  
  const handleDeleteSchedule = async (schedule: scheduleType) => {
    requestLoadingOpen();
    API_deleteSchedule({schedule_id: schedule.schedule_id})
    .then(async()=>{
        await getScheduleQuery.refetch();
        cancelPushSchedule(schedule);
    })
    .finally(()=>{
        requestLoadingClose();
    })
  }

  const handleChangeCacheData = (schedule: scheduleType) => {
    queryClient.setQueryData(
      ["API_getSchedule", calendarRecoilValue.currentCalendar?.calendar_id],
      (oldGetScheduleQueryData: typeof getScheduleQuery.data | undefined) => {
        if (oldGetScheduleQueryData?.data?.scheduleList) {
          let nextData = oldGetScheduleQueryData.data.scheduleList.map((item) => {
            if (item.schedule_id === schedule.schedule_id) {
              return { ...item, is_done: !item.is_done };
            }
            return item;
          });
          return { ...oldGetScheduleQueryData, data: { ...oldGetScheduleQueryData.data, scheduleList: nextData } };
        }
        return oldGetScheduleQueryData;
      }
    );
  }

  const handleCheckSchedule = (schedule: scheduleType,index: number) => {
    handleChangeCacheData(schedule);
    API_checkSchedule({schedule_id: schedule.schedule_id})
    .then(async(res)=>{
      let {code} = res.data;
      if(code!==200){
        handleChangeCacheData(schedule);
      }else{
        if(schedule.is_done===true){
          cancelPushSchedule(schedule);
        }else{
          addPushSchedule(schedule);
        }
      }
    })
  }

  const renderListItem = (schedule: scheduleType,index: number) => {
    return ( <ScheduleItem
        onDelete={handleDeleteModalOpen}
        onPress={(schedule: scheduleType)=>{
          handleCheckSchedule(schedule,index);
        }}
        schedule={schedule}
        isChecked={schedule.is_done}
      />
      // <View style={styles.scheduleContainer}>
      //   <CommonText
      //     text={schedule.title}
      //     type="Title1B24"
      //     color={colors.gray.GR900}
      //   />
      //   <CommonText
      //     text={schedule.description}
      //     type="Body5S14"
      //     color={colors.gray.GR700}
      //   />
      //   <CommonText
      //     text={schedule.due_date}
      //     type="Title1B24"
      //     color={colors.gray.GR500}
      //   />
      // </View>
    );
  };

  return (
    <RenderSafeAreaView>
      <View style={styles.container}>
        <CommonText
          text={moment(date).format("YY년 MM월 DD일 일정")}
          type="Title1B24"
          color={colors.red.Red300}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={{ width: "100%"}}
          data={scheduleList}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item,index }) => renderListItem(item,index)}
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
