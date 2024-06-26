import React, { Fragment, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import {
  Gesture,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import CommonText from "../text/CommonText";
import colors from "../../styles/colors";
import BtnXLarge from "../button/BtnXLarge";
import { setRecoil } from "recoil-nexus";
import { calendarAtom, requestSetCalendarItem } from "../../recoil/recoil";
import { useRecoilValue } from "recoil";
import printDate from "../../modules/time/printDate";
import hashStringToRGB from "../../modules/rgb/hashStringToRGB";
import repetitionTypeJSON from "../../assets/json/repetitionTypeJSON";
import repetitionDayJSON from "../../assets/json/repetitionDayJSON";

interface ScheduleItemProps {
  onPress: (schedule: scheduleType) => void;
  onDelete: (schedule: scheduleType) => void;
  schedule: scheduleType;
  isChecked: boolean;
  isNeedChecked?: boolean;
  isNeedDetail?: boolean;
  isInterval: boolean;
}

const ScheduleItem = ({
  onPress,
  onDelete,
  schedule,
  isChecked,
  isNeedChecked = true,
  isNeedDetail = false,
  isInterval,
}: ScheduleItemProps): JSX.Element => {
  const siwperRef: React.LegacyRef<Swiper> = useRef(null);
  const calendarReocilValue = useRecoilValue(calendarAtom);
  const goBack = () => {
    siwperRef.current?.scrollTo(0);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        key={schedule.schedule_id}
        style={{ height: 120 }}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        showsPagination={false}
        loop={false}
        automaticallyAdjustsScrollIndicatorInsets
        decelerationRate={"fast"}
        ref={siwperRef}
      >
        <TouchableOpacity
          style={[
            styles.slide,
            {
              borderColor: hashStringToRGB(schedule.title),
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            },
          ]}
          onPress={() => {
            onPress(schedule);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingRight: 20,
            }}
          >
            <CommonText
              text={isNeedChecked ? (isChecked ? "(완료)" : "(미완료)") : ""}
              type="Body5S14"
              color={colors.gray.GR750}
              style={{ marginLeft: 20, borderWidth: 2 }}
            />
            <CommonText
              text={
                isInterval
                  ? isNeedDetail
                    ? schedule.repeat_type !== "ONCE"
                      ? (repetitionTypeJSON[schedule.repeat_type] + "반복"+(
                        schedule.repeat_type==="WEEKLY" ? (`(${schedule.weekly_days_mask.split("").reduce((acc: string[],cur,index) => {
                          if(cur==="1"){
                            acc.push(repetitionDayJSON[index])
                          }
                          return acc;
                        } ,[]).join("")})`) : ""
                      ))
                      : ""
                    : "반복"
                  : ""
              }
              type="Title3B18"
              color={colors.gray.GR750}
              style={{ marginLeft: 20, borderWidth: 2 }}
            />
          </View>
          {
            schedule.label &&
            <CommonText
              text={"라벨:"+(schedule.label.name ?? "없음")}
              type="Caption1M12"
              color={schedule.label.color ?? colors.gray.GR750}
              style={{ marginLeft: 20, borderWidth: 2 }}
            />  
          }
          <CommonText
            text={schedule.title}
            type="Body6M14"
            color={colors.gray.GR750}
            style={{ marginLeft: 20, borderWidth: 2 }}
          />
          <CommonText
            text={schedule.description}
            type="Body4B14"
            color={colors.gray.GR750}
            style={{ marginLeft: 20, borderWidth: 2 }}
          />
          <CommonText
            text={
              isNeedDetail
                ? "등록일:" + printDate(schedule.due_date, "long")
                : printDate(schedule.due_date, "short")
            }
            type="Body3S15"
            color={colors.gray.GR750}
            style={{ marginLeft: 20, borderWidth: 2 }}
          />
        </TouchableOpacity>
        <View style={[styles.slide]}>
          <TouchableOpacity
            onPress={goBack}
            style={{ width: 100, height: "100%", backgroundColor: "#000000" }}
          >
            <CommonText
              text={"<- 뒤로가기"}
              type="Body1S16"
              color={colors.gray.GR750}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onDelete(schedule);
            }}
            style={{
              width: 100,
              height: "100%",
              backgroundColor: colors.orange.OR300,
            }}
          >
            <CommonText
              text={"삭제"}
              type="Body1S16"
              color={colors.gray.GR750}
            />
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    alignItems: "center",
  },
});

export default ScheduleItem;
