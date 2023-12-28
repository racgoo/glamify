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

const CalendarDetailModal = () => {
  const { date, scheduleList } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Calendar/CalendarDetailModal"];
  const handlePress = async () => {
    router.navigate({
      pathname: "Calendar/MutateShedule",
      params: { date } as routeType["Calendar/MutateShedule"],
    });
  };

  const renderListItem = (schedule: {
    key: string;
    description: string;
    time: string;
  }) => {
    return (
      <View style={styles.scheduleContainer}>
        <CommonText
          text={schedule.key}
          type="Title1B24"
          color={colors.gray.GR900}
        />
        <CommonText
          text={schedule.description}
          type="Body5S14"
          color={colors.gray.GR700}
        />
        <CommonText
          text={schedule.time}
          type="Title1B24"
          color={colors.gray.GR500}
        />
      </View>
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
          renderItem={({ item }) => renderListItem(item)}
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
