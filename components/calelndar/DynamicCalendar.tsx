import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
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

interface DynamicCalendarProps {
  handleClick: (date: string) => void;
  moveKeyDate: string;
  setMoveKeyDate: (newKey: string) => void;
  markedDates: {[key: string]: {dots: {key: string; color: string; description: string; time: string;}[], marked: boolean}}
}
const DynamicCalendar = ({
  handleClick,
  moveKeyDate,
  setMoveKeyDate,
  markedDates
}: DynamicCalendarProps) => {
  const flatListRef = useRef<FlatList>(null);
  const calendarListRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [monthData, setMonthData] = useState(moment().format("YYYY-MM-DD"));

  LocaleConfig.locales["kr"] = {
    monthNames: new Array(12).fill(null).map((_, index) => `${index + 1}월`),
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNames: ["일", "월", "화", "수", "목", "금", "토", "일"].map(
      (d) => d + "요일"
    ),
    today: "오늘",
  };
  LocaleConfig.defaultLocale = "kr";

  

  useEffect(() => {
    setMoveKeyDate("");
  }, [moveKeyDate]);

  const renderDay:
    | React.ComponentType<
        DayProps & {
          date?: DateData | undefined;
        }
      >
    | undefined = ({ date, state, marking }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ width: "100%", minHeight: 60 }}
        onPress={() => {
          handleClick(date?.dateString as string);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CommonText
            text={date?.day.toString()}
            color={state === "disabled" ? colors.gray.GR300 : colors.gray.GR700}
            type="Body5S14"
          />
          {marking &&
            marking.dots?.slice(0,4).map((dot, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: dot.color,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  borderRadius: 20,
                  marginBottom: 1
                }}
              >
                <CommonText
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  text={dot.key}
                  type="Caption1M12"
                  color={colors.gray.White}
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
            alignItems: "center",
          }}
        >
          <Spinner />
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={[
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <CommonText
                text={moment(monthData).format("YYYY년 MM월")}
                color={colors.gray.GR800}
                type="Title1B24"
                marginBottom={20}
                marginTop={20}
              />
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
              setMonthData(`${event.year}-${event.month}-01`);
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
            style={{
              flex: 1,
            }}
            scrollToOverflowEnabled
            markedDates={{
              ...markedDates,
            }}
            pagingEnabled={true}
            dayComponent={renderDay}
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
