import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import { useLocalSearchParams } from "expo-router";
import serializeParams from "../../modules/params/serializeParams";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";

const SelectCalendarModal = () => {
    const { calenderList, currentCalendar, setCurrentCalendar } = serializeParams(
        useLocalSearchParams()
      ) as routeType["Calendar/SelectCalendarModal"];

    const handleClick = (name: string) => {
        setCurrentCalendar(name);
    }

    const renderItem: ListRenderItem<string> = ({item}) => {
        return <TouchableOpacity style={[styles.calenderCard]} onPress={()=>{handleClick(item)}} >
            <CommonText 
                text={item}
                type="Body1S16"
                color={currentCalendar === item ? "red" : colors.blue.Blue600}
                
            />
        </TouchableOpacity>
    }

    return <RenderSafeAreaView >
        <View style={[styles.container]} >
            <FlatList
                style={[styles.flatListContinaer]}
                data={calenderList}
                renderItem={renderItem}
                ItemSeparatorComponent={()=><View style={{height: 20}} />}
            />
        </View>
    </RenderSafeAreaView>
}

const styles = StyleSheet.create({
    container: {
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