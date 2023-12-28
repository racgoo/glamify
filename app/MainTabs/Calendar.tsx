import {
  DeviceEventEmitter,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import router from "../../references/router";
import { View } from "react-native";
import { API_healthCheck } from "../../controller/api";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import CommonTextInput from "../../components/text/CommonTextInput";
import colors from "../../styles/colors";
import moment from "moment";
import DynamicCalendar from "../../components/calelndar/DynamicCalendar";
import AgendaScreen from "../../components/calelndar/AgendaScreen";
import BtnXLarge from "../../components/button/BtnXLarge";
import hashStringToRGB from "../../modules/rgb/hashStringToRGB";
function Calendar() {
  const [searchText, setSearchText] = useState<string>("");
  const [moveKeyDate, setMoveKeyDate] = useState(moment().format("YYYY-MM-DD"));
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const healthCheckParams = { dummy: "Test1" };
  const healthCheck = useQuery({
    queryKey: ["API_healthCheck", "Interest"],
    queryFn: () => API_healthCheck(healthCheckParams),
  });

  useFocusEffect(
    useCallback(() => {
      healthCheck.refetch();
    }, [JSON.stringify(healthCheckParams)])
  );

  const filterMarkedDates = (text: string) => {
    const searchResults: {
      [key: string]: {
        dots: { key: string; color: string }[];
        marked: boolean;
      };
    } = {};

    for (const date in markedDates) {
      if (markedDates[date]) {
        const dots: any = markedDates[date]?.dots;
        const filteredDots = dots.filter((dot: any) => dot.key.includes(text));

        if (filteredDots.length > 0) {
          // 검색 결과가 있는 경우 해당 날짜의 데이터를 searchResults에 추가
          searchResults[date] = { dots: filteredDots, marked: true };
        }
      }
    }

    return searchResults;
  };

  const markedDates: {
    [key: string]: {
      dots: { key: string; description: string; time: string; color: string }[];
      marked: boolean;
    };
  } = {
    "2023-12-02": {
      dots: [
        {
          key: "homeless",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("home22less"),
        },
        {
          key: "homel3ss2",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
      ],
      marked: true,
    },
    "2023-12-05": {
      dots: [
        {
          key: "homeless",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("home22less"),
        },
        {
          key: "homel3ss2",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
      ],
      marked: true,
    },
    "2023-12-03": {
      dots: [
        {
          key: "homeless",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("home22less"),
        },
        {
          key: "homel3ss2",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "homeless",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("home22less"),
        },
        {
          key: "homel3ss2",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
        {
          key: "vacation",
          time: moment().format("YYYY-MM-DD"),
          description: "string",
          color: hashStringToRGB("vacation"),
        },
      ],
      marked: true,
    },
  };

  // useEffect(()=>{
  //   DeviceEventEmitter.addListener("scrollUp",({tabName}) => {
  //     if(tabName==="Calendar"){
  //       flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
  //     }
  //   })
  // },[]);
  const handleOpeDetailModal = (date: string) => {
    // console.log(markedDates[date]?.dots[0],"dot",{key: "1",color: "red",description: "hi",time: "2022-12-24"})
    router.navigate({
      pathname: "Calendar/CalendarDetailModal",
      params: {
        date,
        scheduleList: markedDates[date]?.dots,
        // scheduleList:  markedDates[date]?.dots.map(d=>({key: d.key, description: d.description, time: d.time}))
        // scheduleList: markedDates[date]?.dots,
      } as routeType["Calendar/CalendarDetailModal"],
    });
  };

  return (
    <RenderSafeAreaView isNeedTouchableWithoutFeedback >
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <CommonTextInput
              text={searchText}
              setText={setSearchText}
              color={colors.gray.GR900}
              placeholderTextColor={colors.gray.White}
              onFocus={() => {
                setIsFocusOnInput(true);
              }}
              onBlur={() => {
                setIsFocusOnInput(false);
              }}
              placeholder="검색어를 입력해주세요."
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            height: isFocusOnInput ? "auto" : 0,
            overflow: "hidden"
          }}
        >
          {Object.entries(filterMarkedDates(searchText)).map(([key, value]) => (
            <View>
              <Text>{key}</Text>
              <View style={{ alignItems: "flex-end" }}>
                {value.dots.map((item) => (
                  <TouchableOpacity
                    style={{borderWidth: 2}}
                    onPress={() => {
                      handleOpeDetailModal(key);
                    }}
                  >
                    <Text>{item.key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: isFocusOnInput ? 0 : "auto" }}>
          <DynamicCalendar
            markedDates={markedDates}
            moveKeyDate={moveKeyDate}
            setMoveKeyDate={setMoveKeyDate}
            handleClick={handleOpeDetailModal}
          />
        </View>
        {/* <FlatList
          style={{flex: 1, width: "100%"}}
          scrollEnabled={false}
          data={[
            <View style={{flex: 1, height: "100%"}} ><Text>Hi</Text></View>
            ,
            <DynamicCalendar
              markedDates={markedDates}
              moveKeyDate={moveKeyDate}
              setMoveKeyDate={setMoveKeyDate}
              handleClick={handleOpeDetailModal}
            />
          ]}
          renderItem={({item}) => item}
        /> */}
        {/* <View style={{flex: 1,width: "100%"}} >
          
        </View> */}
        {/* <BtnXLarge active={true} type="SolidHigh" text={"test"} action={()=>{
          setMoveKeyDate("2024-01-02")
        }} /> */}
        {/* <FlatList
          bounces={false}
          scrollEnabled
          // stickyHeaderIndices={[0]}
          style={{ flex: 1,width: "100%" }}
          data={[
            <DynamicCalendar
              moveKeyDate={moveKeyDate}
              setMoveKeyDate={setMoveKeyDate}
              handleClick={handleOpeDetailModal}
            />,
          ]}
          renderItem={({ item }) => item}
        /> */}
      </View>
    </RenderSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  searchBox: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.GR300,
  },
  searchBoxContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.gray.White,
  },
});

export default React.memo(Calendar);
