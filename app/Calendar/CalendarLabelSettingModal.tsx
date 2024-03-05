import { StyleSheet, TouchableOpacity, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CommonTextInput from "../../components/text/CommonTextInput";
import copy from "../../modules/data/copy";
import serializeParams from "../../modules/params/serializeParams";
import saveCalendarLabelList from "../../action/calendar/saveCalendarLabelList";
import { API_getCalendarLabelList } from "../../controller/api";
import { useQuery } from "@tanstack/react-query";

const CalendarLabelSettingModal = () => {
  const navigation = useNavigation();
  const { calendar } = serializeParams(
    useLocalSearchParams()
  ) as routeType["Calendar/CalendarLabelSettingModal"];
  const getCalendarLabelListQuery = useQuery({
    queryKey: ["API_getCalendarLabelList", calendar.calendar_id],
    queryFn: () =>
      API_getCalendarLabelList({
        calendar_id: calendar.calendar_id,
      }).then((res) => res.data),
    initialData: { code: 200, message: "", data: { labelList: [] } },
    enabled: true
  });

  const isAllScheduleForSearchLoading = getCalendarLabelListQuery.isLoading;
  const allScheduleForSearchResult = getCalendarLabelListQuery.data;

  let [labels, setLabels] = useState<labelType[]>([]);

  useEffect(() => {
    if (!isAllScheduleForSearchLoading && allScheduleForSearchResult.data?.labelList.length) {
        setLabels(allScheduleForSearchResult.data?.labelList);
    }
  }, [isAllScheduleForSearchLoading]);

  const handleLabelChange = ({
    index,
    color,
    name,
  }: {
    index: number;
    color?: string;
    name?: string;
  }) => {
    let copyLables = copy(labels);
    if (color !== undefined) {
      copyLables[index].color = color;
    }
    if (name !== undefined) {
      copyLables[index].name = name;
    }
    setLabels(copyLables);
  };

  const handleDeleteLabel = (label: labelType) => {
    // label
  }

  const renderListItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: {
    item: labelType;
    drag: any;
    isActive: boolean;
    getIndex: () => number | undefined;
  }) => {
    let index = getIndex();
    return (
      <View style={[styles.labelContainer, { borderWidth: 2 }]}>
        <View
          style={{
            height: 18,
            width: 18,
            borderRadius: 9,
            backgroundColor: item.color,
            marginRight: 10,
          }}
        />
        <CommonTextInput
          text={item.name}
          color={colors.gray.GR700}
          type="Title3B18"
          setText={(newText) => {
            if (index !== undefined) {
              handleLabelChange({
                index: index,
                name: newText,
              });
            }
          }}
          hideEraser={true}
          style={{ width: 200, alignItems: "center" }}
          placeholder="라벨을 입력해주세요."
          placeholderTextColor={colors.gray.GR400}
        />
        <TouchableOpacity
          style={{ height: 40, minWidth: 40, backgroundColor: "red" }}
          onPressIn={drag}
          disabled={isActive}
        />
        <TouchableOpacity
          style={{ height: 40, minWidth: 40, backgroundColor: "green" }}
          onPress={() => {
            handleDeleteLabel(item);
          }}
          disabled={isActive}
        />
      </View>
    );
    // }
  };
  const handleSave = async () => {
    await saveCalendarLabelList({ labelList: copy(labels) });
    await getCalendarLabelListQuery.refetch();
    // copyLabels.push({name: "입력해주세요", color: "red"});
  };

  const handleCreateLabel = () => {
    let copyLabels = copy(labels);
    copyLabels.push({
      name: "",
      color: "red",
      calendar_id: calendar.calendar_id,
    });
    setLabels(copyLabels);
  };

  useLayoutEffect(() => {
    // let isInValidForSave = newScheduleTitle.length === 0 || selectedCalendar === 0;
    // let textColor = isInValidForSave ? colors.gray.GR500 : colors.gray.GR900;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={false} onPress={handleSave}>
          <CommonText text={"저장"} type="Body1S16" color={"red"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity disabled={false} onPress={handleCreateLabel}>
          <CommonText text={"추가"} type="Body1S16" color={"red"} />
        </TouchableOpacity>
      ),
    });
  }, [labels]);

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback={true}>
      <View style={styles.container}>
        <DraggableFlatList
          data={labels}
          renderItem={renderListItem}
          keyExtractor={(item, idx) => idx.toString()}
          onDragEnd={({ data }: any) => {
            setLabels(data);
            // setData(data);
            // setTotalData({ ...totalData, musics: data });
          }}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        />
      </View>
    </RenderSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    // justifyContent: ""
  },
});

export default CalendarLabelSettingModal;
