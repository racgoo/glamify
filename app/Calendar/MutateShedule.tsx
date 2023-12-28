import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import CommonTextInput from "../../components/text/CommonTextInput";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const MutateShedule = () => {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventPlace, setNewEventPlace] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventUTCString, setNewEventUTCString] = useState(new Date());
  const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);
  const [isDailyRepetition, setIsDailyRepetition] = useState(false);
  const [isWeeklyRepetition, setIsWeeklyRepetition] = useState(false);
  const [isMonthlyRepetition, setIsMonthlyRepetition] = useState(false);
  const [is3MonthlyRepetition, setIs3MonthlyRepetition] = useState(false);
  const [is6MonthlyRepetition, setIs6MonthlyRepetition] = useState(false);
  const [isYearlyRepetition, setIsYearlyRepetition] = useState(false);

  const toggleSwitch = (
    type: "daily" | "weekly" | "monthly" | "3monthly" | "6monthly" | "yearly"
  ) => {
    let mutationFunction: Dispatch<SetStateAction<boolean>>;
    switch (type) {
      case "daily":
        mutationFunction = setIsDailyRepetition;
        break;
      case "weekly":
        mutationFunction = setIsWeeklyRepetition;
        break;
      case "monthly":
        mutationFunction = setIsMonthlyRepetition;
        break;
      case "3monthly":
        mutationFunction = setIs3MonthlyRepetition;
        break;
      case "6monthly":
        mutationFunction = setIs6MonthlyRepetition;
        break;
      case "yearly":
        mutationFunction = setIsYearlyRepetition;
        break;
    }
    mutationFunction((pre) => !pre);
  };

  return (
    <RenderSafeAreaView>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 20 }}>
          <View style={[styles.inputBoxContainer]}>
            <View style={styles.inputBox}>
              <CommonTextInput
                text={newEventTitle}
                setText={setNewEventTitle}
                color={colors.gray.GR800}
                placeholderTextColor={colors.gray.GR600}
                placeholder="제목"
              />
            </View>
            <View style={styles.inputBox}>
              <CommonTextInput
                text={newEventPlace}
                setText={setNewEventPlace}
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
                  text={moment(newEventUTCString).format(
                    "YYYY년 MM월 DD일 HH시 mm분"
                  )}
                  color={colors.gray.GR500}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isVisibleDateModal}
                mode={"datetime"}
                onConfirm={(e) => {
                  setNewEventUTCString(e);
                  setIsVisibleDateModal(false);
                }}
                onCancel={() => {
                  setIsVisibleDateModal(false);
                }}
                locale="ko"
                confirmTextIOS="확인"
                cancelTextIOS="취소"
                date={newEventUTCString}
              />
            </View>
          </View>

          <View style={{ height: 10 }} />

          <View style={[styles.inputBoxContainer, {gap: 10}]}>
          <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"매일 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDailyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("daily")}
                    value={isDailyRepetition}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"매주 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isWeeklyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("weekly")}
                    value={isWeeklyRepetition}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"매달 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isMonthlyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("monthly")}
                    value={isMonthlyRepetition}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"석달 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={is3MonthlyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("3monthly")}
                    value={is3MonthlyRepetition}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"반년 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={is6MonthlyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("6monthly")}
                    value={is6MonthlyRepetition}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexGrow: 1,
                  },
                ]}
              >
                <CommonText text={"매년 반복"} color={colors.gray.GR500} />
                <View style={{ height: 20, justifyContent: "center" }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isYearlyRepetition ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch("yearly")}
                    value={isYearlyRepetition}
                  />
                </View>
              </View>
            </View>
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
                text={newEventDescription}
                setText={setNewEventDescription}
                color={colors.gray.GR800}
                placeholderTextColor={colors.gray.GR600}
                placeholder="설명"
                multiline={true}
              />
            </View>
          </View>

          {new Array(1).fill(false).map((d, di) => (
            <View
              style={{
                backgroundColor: "red",
                borderWidth: 2,
                width: "100%",
                height: 50,
              }}
            >
              <Text>{di}</Text>
            </View>
          ))}

          <CommonText text="hi" color={colors.gray.GR900} type="Title1B24" />
        </ScrollView>
      </View>
    </RenderSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default MutateShedule;
