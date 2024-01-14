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

const SelectCalendarModal = () => {
    // const {  } = serializeParams(
    //     useLocalSearchParams()
    //   ) as routeType["Calendar/SelectCalendarModal"];

    const getCalendarListQuery = useQuery({
      queryKey: ["API_getCalendarList"],
      queryFn: () => API_getCalendarList({})
    });

    const isCalenderListLoading = getCalendarListQuery.isLoading;
    const calenderListResult =  getCalendarListQuery.data?.data;

    const [deleteLoading,setDeleteLoading] = useState(false);

    const handleDelete = (calendar_id: number) => {
        setDeleteLoading(true);
        API_deleteCalendar({calendar_id})
        .then(async()=>{
            await getCalendarListQuery.refetch();
            // router.goBack();
        })
        .finally(()=>{
            setDeleteLoading(false);
        })
    }

    const handleInsertButton = () => {
        router.navigate({pathname: "Calendar/CreateCalendarModal"});
    }

    const renderItem: ListRenderItem<calendarType> = ({item}) => {
        return <TouchableOpacity style={[styles.calenderCard]} onPress={()=>{handleDelete(item.calendar_id)}} >
            <CommonText 
                text={item.title}
                type="Body1S16"
                // color={currentCalendar === item ? "red" : colors.blue.Blue600}
                color={colors.blue.Blue600}
                
            />
        </TouchableOpacity>
    }

    if(isCalenderListLoading)return null;

    return <RenderSafeAreaView isLoading={deleteLoading} >
        <View style={[styles.container]} >
            <FlatList
                style={[styles.flatListContinaer]}
                data={calenderListResult?.data?.calendarList}
                renderItem={renderItem}
                ItemSeparatorComponent={()=><View style={{height: 20}} />}
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
        paddingHorizontal: 12,
        paddingTop: 12
    }
})

export default SelectCalendarModal;