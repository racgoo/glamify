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
import router from "../../references/router";

interface CalendarItemProps {
  onPress: (calendar: calendarType) => void;
  onDelete: (calendar: calendarType) => void;
  calendar: calendarType;
}

const CalendarItem = ({
  onPress,
  onDelete,
  calendar,
}: CalendarItemProps): JSX.Element => {

  const siwperRef: React.LegacyRef<Swiper> = useRef(null);
  const calendarReocilValue = useRecoilValue(calendarAtom);

  const goBack = () => {
    siwperRef.current?.scrollTo(0);
  };
  const isSelected = calendarReocilValue.currentCalendar?.calendar_id ===calendar.calendar_id;

  const goSetting = () => {
    goBack();
    router.navigate({pathname: "Calendar/CalendarSettingModal",params: {calendar}});
  }

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        key={calendar.calendar_id}
        style={{ height: 80 }}
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
              borderColor: isSelected ? colors.orange.OR500 : colors.gray.GR600,
            },
          ]}
          onPress={() => {
            onPress(calendar);
          }}
        >
          <CommonText
            text={calendar.title}
            type="Body1S16"
            color={isSelected ? colors.orange.OR500 : colors.gray.GR750}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
        <View style={[styles.slide]}>
          <TouchableOpacity
            onPress={goBack}
            style={{ width: "30%", height: "100%", backgroundColor: "#000000" }}
          >
            <CommonText
              text={"<- 뒤로가기"}
              type="Body1S16"
              color={colors.gray.GR750}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goSetting}
            style={{ width: 100, height: "100%", backgroundColor: "#000000" }}
          >
            <CommonText
              text={"설정"}
              type="Body1S16"
              color={colors.gray.GR750}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onDelete(calendar);
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
    alignItems: "center"
  },
});

export default CalendarItem;
