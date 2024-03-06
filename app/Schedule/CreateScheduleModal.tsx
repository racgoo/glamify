import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  findNodeHandle,
} from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import CommonTextInput from "../../components/text/CommonTextInput";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  API_createSchedule,
  API_getCalendarLabelList,
  API_getCalendarList,
  API_getSchedule,
} from "../../controller/api";
import { useRecoilValue } from "recoil";
import { calendarAtom } from "../../recoil/recoil";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import router from "../../references/router";
import momentToUtcString from "../../modules/time/momentToUtcString";
import { useQuery } from "@tanstack/react-query";
import serializeParams from "../../modules/params/serializeParams";
import CommonSwitch from "../../components/CommonSwitch";
import BtnXLarge from "../../components/button/BtnXLarge";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonDropPicker from "../../components/picker/CommonDropPicker";
import repetitionTypeJSON from "../../assets/json/repetitionTypeJSON";
import CommonLabelSelectBox from "../../components/picker/CommonLabelSelectBox";

const dayList = ["일", "월", "화", "수", "목", "금", "토"];

function isValidHHMM(text: string) {
  if (text.length !== 4) {
    return false;
  }
  if (!/^\d+$/.test(text)) {
    return false;
  }
  const hours = parseInt(text.substring(0, 2));
  if (hours < 0 || hours > 23) {
    return false;
  }
  const minutes = parseInt(text.substring(2, 4));
  if (minutes < 0 || minutes > 59) {
    return false;
  }
  return true;
}

const swapMaskByIndex = (mask: string, index: number) => {
  return mask
    .split("")
    .map((m, i) => (i === index ? (m === "0" ? "1" : "0") : m))
    .join("");
};

const CreateScheduleModal = () => {
  const { date } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Schedule/CreateScheduleModal"];
  const navigation = useNavigation();
  const calendarRecoilValue = useRecoilValue(calendarAtom);

  const getScheduleQuery = useQuery({
    queryKey: [
      "API_getSchedule",
      calendarRecoilValue.currentCalendar?.calendar_id,
    ],
    queryFn: () =>
      API_getSchedule({
        calendar_id: calendarRecoilValue.currentCalendar?.calendar_id as number,
        target_date: momentToUtcString(moment.utc(date)),
      }).then((res) => res.data),
    enabled: false,
  });

  const getCalendarListQuery = useQuery({
    queryKey: ["API_getCalendarList"],
    queryFn: () => API_getCalendarList({}).then((res) => res.data),
    enabled: false,
  });

  

  let calendarList = getCalendarListQuery.data?.data?.calendarList ?? [];

  const [selectedCalendar, setSelectedCalendar] = useState(
    calendarRecoilValue.currentCalendar?.calendar_id ?? 0
  );
  const [newScheduleTitle, setNewScheduleTitle] = useState("");
  const [newSchedulePlace, setNewSchedulePlace] = useState("");
  const [newScheduleDescription, setNewScheduleDescription] = useState("");
  const [newScheduleUTCString, setNewScheduleUTCString] = useState(
    new Date(date)
  );
  const [selectedLabel, setSelectedLabel] = useState<labelType | null>(null);
  const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);
  const [isVisibleIntervalDateModal, setIsVisibleIntervalDateModal] =
    useState(false);

  const [isRepetition, setIsRepetition] = useState(false);
  const [repetitionType, setRepetitionType] =
    useState<keyof typeof repetitionTypeJSON>("DAILY");
  const [repetitionInterval, setRepetitionInterval] = useState("1");
  const [weeklyDayMask, setWeeklyDayMask] = useState(
    swapMaskByIndex("0000000", newScheduleUTCString.getDay())
  );
  const [
    newScheduleEndRepetitionUTCString,
    setNewScheduleEndRepetitionUTCString,
  ] = useState<null | Date>(null);


  const getCalendarLabelListQuery = useQuery({
    queryKey: [
      "API_getCalendarLabelList",
      selectedCalendar,
    ],
    queryFn: () =>
      API_getCalendarLabelList({
        calendar_id: selectedCalendar,
      }).then((res) => res.data),
    initialData: { code: 200, message: "", data: { labelList: [] } },
  });
  const isCalendarLabelListLoading = getCalendarLabelListQuery.isLoading;
  const calendarLabelListResult = getCalendarLabelListQuery.data;

  useEffect(() => {
    if (
      isCalendarLabelListLoading === false &&
      calendarLabelListResult.data?.labelList.length
    ) {
      setSelectedLabel(calendarLabelListResult.data.labelList[0]);
    }
  }, [isCalendarLabelListLoading, calendarLabelListResult]);
  
  useEffect(()=>{
    getCalendarLabelListQuery.refetch();
  },[selectedCalendar]);

  useLayoutEffect(() => {
    let isInValidForSave =
      newScheduleTitle.length === 0 || selectedCalendar === 0;
    let textColor = isInValidForSave ? colors.gray.GR500 : colors.gray.GR900;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={isInValidForSave} onPress={handleSave}>
          <CommonText text={"저장"} type="Body1S16" color={textColor} />
        </TouchableOpacity>
      ),
    });
  }, [
    newScheduleTitle,
    newScheduleDescription,
    newScheduleUTCString,
    newSchedulePlace,
    isRepetition,
    repetitionType,
    repetitionInterval,
    weeklyDayMask,
    newScheduleEndRepetitionUTCString,
    selectedCalendar,
  ]);

  const handleSave = async () => {
    Keyboard.dismiss();
    requestLoadingOpen();
    API_createSchedule({
      calendar_id: selectedCalendar,
      title: isValidHHMM(newScheduleTitle.substr(0, 4))
        ? newScheduleTitle.substr(4)
        : newScheduleTitle,
      description: newScheduleDescription,
      due_date: momentToUtcString(moment(newScheduleUTCString)),
      place: newSchedulePlace,
      repeat_type: isRepetition ? repetitionType : "ONCE",
      interval_num: parseInt(repetitionInterval),
      weekly_days_mask: weeklyDayMask,
      interval_due_date: newScheduleEndRepetitionUTCString
        ? momentToUtcString(moment(newScheduleEndRepetitionUTCString))
        : "",
      calendar_label_id: selectedLabel?.calendar_label_id ?? -1,
    })
      .then(async (res) => {
        let { code, data } = res.data;
        if (code === 200) {
          await getScheduleQuery.refetch();
          router.goBack();
        }
      })
      .finally(() => {
        requestLoadingClose();
      });
  };

  const handleChangeRepetitionInterval = (newInterval: string) => {
    if (newInterval === "" || newInterval === "0") setRepetitionInterval("");
    else if (parseInt(newInterval) <= 100) {
      setRepetitionInterval(parseInt(newInterval).toString());
    }
  };

  const resetDetailSetting = () => {
    setRepetitionInterval("1");
    setWeeklyDayMask(swapMaskByIndex("0000000", newScheduleUTCString.getDay()));
    setNewScheduleEndRepetitionUTCString(null);
  };

  useEffect(() => {
    if (isRepetition) {
      setRepetitionType("DAILY");
      resetDetailSetting();
    }
  }, [isRepetition]);

  useEffect(() => {
    resetDetailSetting();
  }, [repetitionType]);

  useEffect(() => {
    //시간 자동 입력기능
    let tmp = newScheduleTitle.substr(0, 4);
    if (isValidHHMM(tmp)) {
      let hour = parseInt(tmp.substr(0, 2));
      let minute = parseInt(tmp.substr(2, 2));
      let t = new Date(newScheduleUTCString);
      t.setHours(hour, minute);
      setNewScheduleUTCString(t);
    }
  }, [newScheduleTitle]);

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback={true}>
      <View style={[styles.container]}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: "100%" }}
          behavior={"padding"}
          enabled
          // keyboardVerticalOffset={120}
        >
          <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 20 }}>
            {calendarRecoilValue.currentCalendar?.calendar_id === 0 && (
              <CommonDropPicker
                items={calendarList.map((calendar) => ({
                  value: calendar.calendar_id,
                  label: calendar.title,
                }))}
                value={selectedCalendar}
                setValue={setSelectedCalendar}
                style={{ marginVertical: 10 }}
              />
            )}
            <View style={[styles.inputBoxContainer]}>
              <View style={styles.inputBox}>
                <CommonTextInput
                  text={newScheduleTitle}
                  setText={setNewScheduleTitle}
                  color={colors.gray.GR800}
                  placeholderTextColor={colors.gray.GR600}
                  placeholder="제목(HHMM 입력 가능)"
                  autoFocus={true}
                />
              </View>
              <View style={styles.inputBox}>
                <CommonTextInput
                  text={newSchedulePlace}
                  setText={setNewSchedulePlace}
                  color={colors.gray.GR800}
                  placeholderTextColor={colors.gray.GR600}
                  placeholder="위치(선택)"
                />
              </View>
              <View style={styles.inputBox}>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisibleDateModal(true);
                  }}
                >
                  <CommonText
                    text={moment(newScheduleUTCString).format(
                      "YYYY년 MM월 DD일 HH시 mm분"
                    )}
                    color={colors.gray.GR500}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 10 }} />
            {/* allScheduleForSearchResult */}
            {selectedLabel && (
              <Fragment>
                <View style={[styles.inputBoxContainer]}>
                  <View style={[styles.inputRowContainer]}>
                    <CommonLabelSelectBox
                      item={selectedLabel}
                      setItem={setSelectedLabel}
                      itemList={calendarLabelListResult.data?.labelList ?? []}
                    />
                  </View>
                </View>
                <View style={{ height: 10 }} />
              </Fragment>
            )}

            <View style={[styles.inputBoxContainer]}>
              <View style={[styles.inputRowContainer]}>
                <CommonText
                  text={"반복"}
                  type="Body1S16"
                  color={colors.gray.GR750}
                />
                <CommonSwitch value={isRepetition} setValue={setIsRepetition} />
              </View>
              {isRepetition && (
                <Fragment>
                  <View style={[styles.inputRowContainer, { gap: 4 }]}>
                    {(
                      Object.entries(repetitionTypeJSON) as EntriesType<
                        typeof repetitionTypeJSON
                      >
                    ).map((entry) => (
                      <BtnXLarge
                        type={
                          repetitionType === entry[0]
                            ? "SolidHigh"
                            : "OutlineHigh"
                        }
                        active={true}
                        action={() => {
                          setRepetitionType(entry[0]);
                        }}
                        text={entry[1]}
                        style={{ flex: 1 }}
                      />
                    ))}
                  </View>
                  {repetitionType === "DAILY" ? (
                    <View style={[styles.inputRowContainer]}>
                      <CommonTextInput
                        hideEraser={true}
                        isNumberPad={true}
                        text={repetitionInterval}
                        setText={handleChangeRepetitionInterval}
                        style={{
                          width: 30,
                          borderWidth: 2,
                          borderRadius: 8,
                          padding: 4,
                          height: 30,
                        }}
                        marginRight={4}
                        color={colors.gray.GR800}
                        placeholderTextColor={colors.gray.GR500}
                      />
                      <CommonText
                        text={"일 간격으로 반복"}
                        type="Body1S16"
                        color={colors.gray.GR750}
                      />
                    </View>
                  ) : repetitionType === "WEEKLY" ? (
                    <View>
                      <View style={[styles.inputRowContainer]}>
                        <CommonTextInput
                          hideEraser={true}
                          isNumberPad={true}
                          text={repetitionInterval}
                          setText={handleChangeRepetitionInterval}
                          style={{
                            width: 30,
                            borderWidth: 2,
                            borderRadius: 8,
                            padding: 4,
                            height: 30,
                          }}
                          marginRight={4}
                          color={colors.gray.GR800}
                          placeholderTextColor={colors.gray.GR500}
                        />
                        <CommonText
                          text={"주 간격으로 반복"}
                          type="Body1S16"
                          color={colors.gray.GR750}
                        />
                      </View>
                      <View style={{ height: 10 }} />
                      <View style={[styles.inputRowContainer, { gap: 4 }]}>
                        {dayList.map((day, dayIndex) => (
                          <BtnXLarge
                            type={
                              weeklyDayMask[dayIndex] === "1"
                                ? "SolidHigh"
                                : "OutlineHigh"
                            }
                            active={true}
                            action={() => {
                              setWeeklyDayMask(
                                swapMaskByIndex(weeklyDayMask, dayIndex)
                              );
                            }}
                            text={day}
                            style={{ flex: 1 }}
                          />
                        ))}
                      </View>
                    </View>
                  ) : null}
                  <View style={[styles.inputRowContainer, { gap: 4 }]}>
                    <CommonText
                      text={"반복 종료일"}
                      type="Body1S16"
                      color={colors.gray.GR750}
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisibleIntervalDateModal(true);
                      }}
                    >
                      <CommonText
                        text={
                          newScheduleEndRepetitionUTCString
                            ? moment(newScheduleEndRepetitionUTCString).format(
                                "YYYY년 MM월 DD일 HH시 mm분"
                              )
                            : "미지정"
                        }
                        color={colors.gray.GR500}
                      />
                    </TouchableOpacity>
                  </View>
                </Fragment>
              )}
            </View>

            <View style={{ height: 10 }} />

            <View style={[styles.inputBoxContainer]}>
              <View
                style={[
                  styles.inputBox,
                  {
                    height: 100,
                    borderRadius: 10,
                  },
                ]}
              >
                <CommonTextInput
                  style={{ height: "100%" }}
                  text={newScheduleDescription}
                  setText={setNewScheduleDescription}
                  color={colors.gray.GR800}
                  placeholderTextColor={colors.gray.GR600}
                  placeholder="설명"
                  multiline={true}
                />
              </View>
            </View>

            <View style={{ height: 30 }} />
          </ScrollView>
        </KeyboardAvoidingView>
        <DateTimePickerModal
          isVisible={isVisibleDateModal}
          mode={"datetime"}
          onConfirm={(e) => {
            setNewScheduleUTCString(e);
            setIsVisibleDateModal(false);
          }}
          onCancel={() => {
            setIsVisibleDateModal(false);
          }}
          locale="ko"
          confirmTextIOS="확인"
          cancelTextIOS="취소"
          date={newScheduleUTCString}
        />
        <DateTimePickerModal
          isVisible={isVisibleIntervalDateModal}
          mode={"datetime"}
          onConfirm={(e) => {
            setNewScheduleEndRepetitionUTCString(e);
            setIsVisibleIntervalDateModal(false);
          }}
          onCancel={() => {
            setIsVisibleIntervalDateModal(false);
          }}
          locale="ko"
          confirmTextIOS="확인"
          cancelTextIOS="취소"
          date={newScheduleEndRepetitionUTCString ?? new Date(date)}
        />
      </View>
    </RenderSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.gray.GR300,
  },
  inputBoxContainer: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.gray.GR200,
    gap: 8,
    borderRadius: 20,
  },
  inputRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default CreateScheduleModal;
