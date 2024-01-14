import {
  DeviceEventEmitter,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import colors from "../../styles/colors";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import CommonText from "../../components/text/CommonText";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import TextTabHeader from "../../components/header/TextTabHeader";
import { View } from "react-native";
import MyLocationIcon from "../../assets/icons/location/MyLocationIcon";
import SmallNoticeIcon from "../../assets/icons/notice/SmallNoticeIcon";
import ProfileListItem from "../../components/profile/ProfileListItem";
import { useQuery } from "@tanstack/react-query";
import { API_healthCheck } from "../../controller/api";
import { useFocusEffect } from "expo-router";
import { Text } from "react-native";

function Home() {
  const flatListRef = useRef<any>(null);
  
  useEffect(()=>{
    DeviceEventEmitter.addListener("scrollUp",({tabName}) => {
      if(tabName==="Home"){
        flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
      }
    })
  },[]);
  
  
  
  const tabList = ["리스트", "지도"];
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  const [testDummy,setTestDummy] = useState({dummy: "1"});
  const healthCheckParams =  {dummy: testDummy.dummy};
  const healthCheck = useQuery({
    queryKey: ["API_healthCheck","Home"],
    queryFn: () => API_healthCheck(healthCheckParams)
  });
  useFocusEffect(
    useCallback(() => {
      healthCheck.refetch();
    }, [JSON.stringify(healthCheckParams)])
  );
  
// useEffect(()=>{
//   console.log(healthCheckParams)
// },[healthCheckParams]);



  // useEffect(()=>{
  //   console.log(healthCheck.isLoading)
  // },[healthCheck.isLoading]);
  // useEffect(()=>{
  //   console.log(healthCheck.data?.data.data)
  // },[healthCheck.data?.data.data]);

  let dummy = [1,2,3,4,5,6,7,8,10,10];
  return (
    <RenderSafeAreaView>
      <View style={styles.mainContainer}>

        {/* <View style={{ width: "100%",backgroundColor: "red", gap: 20, flexDirection: "row", flexWrap: "wrap"}} >
          {
            dummy.map((data,index) => <View key={index} style={{backgroundColor: "green",minWidth: "50%", height: 200}} >
              <Text style={{width: "100%"}} key="" >{data}</Text>
            </View>)
          }
        </View> */}


        <CommonText
          text={"준비중"}
          color={colors.gray.GR800}
          type="Title1B24"
         /> 
        {/* <FlatList
          ref={flatListRef}
          style={styles.flatListContainer}
          bounces={false}
          stickyHeaderIndices={[1]}
          data={[
            <View style={{ height: 60 }} />,
            <Fragment>
              <View style={{ backgroundColor: colors.gray.White }}>
                <TextTabHeader
                  tabList={tabList}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />

                <View style={{ height: 24 }} />

                <View style={[styles.bannerContainer]}>
                  <View style={{ position: "relative", top: 2 }}>
                    <MyLocationIcon />
                  </View>
                  <CommonText
                    marginLeft={4}
                    text={"내 위치"}
                    type="Body4B14"
                    color={colors.red.Red300}
                  />
                  <CommonText
                    marginLeft={6}
                    text={"서울특별시 강남구 역삼동"}
                    type="Body6M14"
                    color={colors.red.Red400}
                  />
                </View>

                <View style={{ height: 21 }} />

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <SmallNoticeIcon />
                  <CommonText
                    text={"반경 100M 내에 있는 상대를 보여드려요"}
                    type="Caption1M12"
                    color={colors.gray.GR750}
                  />
                </View>
              </View>
            </Fragment>,
            ...new Array(healthCheck.isLoading ? 0 : parseInt(healthCheck.data?.data.data?.dummy as string)).fill(0).map((_, index) => <ProfileListItem />),
          ]}
          renderItem={({ item }) => item}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={<View style={{ height: 30 }} />}
        /> */}
      </View>
    </RenderSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.gray.White,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    width: "100%",
  },
  bannerContainer: {
    borderRadius: 10,
    backgroundColor: colors.red.Red100,
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default React.memo(Home);
