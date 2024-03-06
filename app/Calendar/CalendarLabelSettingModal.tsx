import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
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
import CustomKeyboardAvoidngView from "../../components/layout/CustomKeyboardAvoidngView";
import deleteCalendarLabel from "../../action/calendar/deleteCalendarLabel";
import CommonColorPicker from "../../components/picker/CommonColorPicker";
import requestPopupOpen from "../../action/popup/requestPopupOpen";

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


  let [labels, setLabels] = useState<labelType[]>([]);
  const isAllScheduleForSearchLoading = getCalendarLabelListQuery.isLoading;
  const allScheduleForSearchResult = getCalendarLabelListQuery.data;

  useEffect(() => {
    if (isAllScheduleForSearchLoading===false && allScheduleForSearchResult.data?.labelList) {
        setLabels(allScheduleForSearchResult.data?.labelList);
    }
  }, [isAllScheduleForSearchLoading,allScheduleForSearchResult]);

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


  

  const handleDeleteLabel = async(label: labelType, index: number) => {
    requestPopupOpen({
      title: "정말 삭제하겠습니까?",
      description: "다시 복구하기 어렵습니다.",
      type: "both",
      action: async() => {
        if(label.calendar_label_id){
          await deleteCalendarLabel({label});
        }
        setLabels(copy(labels).filter((_,labelIndex) => labelIndex!=index));
      },
    });
    
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
    let [isPickerOpen,setIsPickerOpen] = useState(false);

    const handleColorChange = (color: string) => {
        if (index !== undefined) {
            handleLabelChange({
                index: index,
                color: color,
            });
        }
    }

    const handleNameChange = (newText: string) => {
        if (index !== undefined) {
            handleLabelChange({
                index: index,
                name: newText,
            });
        }
    }
    
    return (
      <View style={[styles.labelContainer, { borderWidth: 2 }]}>
        <CommonColorPicker color={item.color} setColor={handleColorChange} isOpen={isPickerOpen} setIsOpen={setIsPickerOpen} />
        <TouchableOpacity onPress={()=>{setIsPickerOpen(true)}} >
            <View
            style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor: item.color,
                marginRight: 10,
            }}
            />
        </TouchableOpacity>
        <CommonTextInput
          text={item.name}
          color={item.color}
          type="Title3B18"
          setText={handleNameChange}
          hideEraser={true}
          style={{ width: 200, alignItems: "center" }}
          placeholder="라벨을 입력해주세요."
          placeholderTextColor={colors.gray.GR400}
        />
        <TouchableOpacity
          style={{ height: 40, minWidth: 40, backgroundColor: "red" }}
          onPressIn={drag}
          disabled={isActive}
        >
            <CommonText text={"이동"} color={colors.gray.White} type="Body1S16" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 40, minWidth: 40, backgroundColor: "green" }}
          onPress={() => {
            handleDeleteLabel(item,index ?? -1);
          }}
          disabled={isActive}
        >
            <CommonText text={"삭제"} color={colors.gray.White} type="Body1S16" />
        </TouchableOpacity>
      </View>
    );
    // }
  };
  const handleSave = async () => {
    Keyboard.dismiss();
    await saveCalendarLabelList({ labelList: copy(labels) });
    await getCalendarLabelListQuery.refetch();
  };

  const handleCreateLabel = () => {
    let copyLabels = copy(labels);
    copyLabels.push({
      name: "",
      color: "rgba(237, 117, 71, 1.0)",
      calendar_id: calendar.calendar_id,
    });
    setLabels(copyLabels);
  };

  useLayoutEffect(() => {
    let isInValidForSave = labels.filter(label => label.name==="").length === 0;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={!isInValidForSave} onPress={handleSave}  >
          <CommonText text={"저장"} type="Body1S16" color={"red"} opacity={isInValidForSave ? 1 : 0.4} />
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
        <CustomKeyboardAvoidngView>
            <DraggableFlatList
            data={labels}
            renderItem={renderListItem}
            keyExtractor={(item, idx) => idx.toString()}
            onDragEnd={({ data }: any) => {
                setLabels(data);
            }}
            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
            />
        </CustomKeyboardAvoidngView>
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
