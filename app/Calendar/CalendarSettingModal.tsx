import { StyleSheet, TouchableOpacity, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import CommonText from "../../components/text/CommonText";
import serializeParams from "../../modules/params/serializeParams";
import { useLocalSearchParams } from "expo-router";
import colors from "../../styles/colors";
import CommonSwitch from "../../components/CommonSwitch";
import { Dispatch, SetStateAction, useState } from "react";
import router from "../../references/router";

const CalendarDetailModal = () => {
  const { calendar } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Calendar/CalendarSettingModal"];
  const [alertSwitch, setAlertSwitch] = useState(false);

  const SettingBox = ({
    title,
    value,
    setValue,
    onPress,
  }: {
    title: string;
    value?: boolean;
    setValue?: Dispatch<SetStateAction<boolean>>;
    onPress?: () => void;
  }) => {
    const isEnablePress = onPress !== undefined;
    const isEnableSwich = value !== undefined;
    return (
      <TouchableOpacity
        disabled={!isEnablePress}
        onPress={isEnablePress ? onPress : ()=>{}}
        activeOpacity={0.7}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 40
        }}
      >
        <CommonText text={title} color={colors.gray.GR600} type="Body1S16" />
        {isEnableSwich && (
          <CommonSwitch setValue={setAlertSwitch} value={alertSwitch} />
        )}
        {isEnablePress && (
          <CommonText text={">"} color={colors.gray.GR600} type="Body1S16" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback={true}>
      <View style={styles.container}>
        <View>
          <CommonText
            text={calendar.title}
            color={colors.gray.GR750}
            type="Body1S16"
          />
        </View>

        <SettingBox
          value={alertSwitch}
          setValue={setAlertSwitch}
          title="알림(미구현)"
        />
        <View style={styles.divider} />
        <SettingBox title="라벨" onPress={() => {
          router.navigate({pathname: "Calendar/CalendarLabelSettingModal", params: {calendar: calendar}});
        }} />
        <View style={styles.divider} />
        <SettingBox title="배경화면(미구현)" onPress={() => {
          router.navigate({pathname: "Calendar/CalendarBackgroundImageSettingModal"});
        }} />
      </View>
    </RenderSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray.GR500,
  },
});

export default CalendarDetailModal;
