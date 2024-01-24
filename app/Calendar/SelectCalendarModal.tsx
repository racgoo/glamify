import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import { useLocalSearchParams } from "expo-router";
import serializeParams from "../../modules/params/serializeParams";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import BtnXLarge from "../../components/button/BtnXLarge";
import { useQuery } from "@tanstack/react-query";
import { API_deleteCalendar, API_getCalendarList } from "../../controller/api";
import { useEffect, useState } from "react";
import router from "../../references/router";
import OverlayLoadingModule from "../../components/dynamicModules/loading/OverlayLoadingModule";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import requestLoadingClose from "../../action/loading/requestLoadingClose";
import requestPopupOpen from "../../action/popup/requestPopupOpen";
import CalendarItem from "../../components/slider/CalendarItem";
import { setRecoil } from "recoil-nexus";
import { calendarAtom, requestSetCalendarItem } from "../../recoil/recoil";
import setCurrentCalendar from "../../action/calendar/setCurrentCalendar";
import { useRecoilValue } from "recoil";

const SelectCalendarModal = () => {
    const calendarRecoilValue = useRecoilValue(calendarAtom);
    const getCalendarListQuery = useQuery({
      queryKey: ["API_getCalendarList"],
      queryFn: () => API_getCalendarList({}).then(res=>res.data),
      enabled: false
    });

    const isCalendarListLoading = getCalendarListQuery.isLoading;
    const calendarListResult =  getCalendarListQuery.data;

    useEffect(()=>{
        if(calendarListResult?.data?.calendarList?.length===0)router.goBack();
    },[calendarListResult?.data?.calendarList]);

    const handleDeleteModalOpen = (calendar: calendarType) => {
        requestPopupOpen(
            {
                title: "정말 삭제하겠습니까?",
                description: "다시 복구하기 어렵습니다.",
                type: "both",
                action: ()=> {
                    handleDelete(calendar)
                }
            }
        );
    }

    const handleDelete = (calendar: calendarType) => {
        requestLoadingOpen();
        API_deleteCalendar({calendar_id: calendar.calendar_id})
        .then(async()=>{
            await getCalendarListQuery.refetch();
            if(calendarRecoilValue.currentCalendar?.calendar_id === calendar.calendar_id){
                setCurrentCalendar(null);
            }
        })
        .finally(()=>{
            requestLoadingClose();
        })
    }

    const handleInsertButton = () => {
        router.navigate({pathname: "Calendar/CreateCalendarModal"});
    }

    const handleSelectButton = (calendar: calendarType) => {
        setCurrentCalendar(calendar);
        router.goBack();
      }

    const renderItem: ListRenderItem<calendarType> = ({item,index}) => {
        return <CalendarItem 
                calendar={item}
                onPress={handleSelectButton}
                onDelete={handleDeleteModalOpen}
            />
            
    }

    if(isCalendarListLoading)return null;

    return <RenderSafeAreaView >
        <View style={[styles.container]} >
            <FlatList
                style={[styles.flatListContinaer]}
                data={calendarListResult?.data?.calendarList}
                renderItem={renderItem}
                ItemSeparatorComponent={()=><View style={{height: 4}} />}
            />
            <BtnXLarge
                active={true}
                type="SolidHigh"
                action={handleInsertButton}
                text={"캘린더 추가하기"}
            />
        </View>
    </RenderSafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    flatListContinaer: {
        width: "100%",
        height: "100%",
    },
    calenderCard: {
        width: "100%",
        height: 60,
        backgroundColor: "yellow",
    }
})

export default SelectCalendarModal;