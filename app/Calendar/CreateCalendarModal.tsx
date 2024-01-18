import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import RenderSafeAreaView from "../../components/layout/RenderSafeAreaView";
import CommonText from "../../components/text/CommonText";
import colors from "../../styles/colors";
import CommonTextInput from "../../components/text/CommonTextInput";
import { useEffect, useState } from "react";
import BtnXLarge from "../../components/button/BtnXLarge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_createCalendar, API_getCalendarList } from "../../controller/api";
import router from "../../references/router";
import requestLoadingOpen from "../../action/loading/requestLoadingOpen";
import Spinner from "../../assets/animation/Spinner";

const CreateCalendarModal = () => {
    const [calendarName,setCalendarName] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const getCalendarListQuery = useQuery({
        queryKey: ["API_getCalendarList"],
        queryFn: () => API_getCalendarList({}),
        enabled: false
      });
      
    const handleRegister = () => {
        setIsLoading(true);
        API_createCalendar({calendarName})
        .then(async(res)=>{
            let { code } = res.data;
            if(code===200){
                await getCalendarListQuery.refetch();
                router.goBack();
            }
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }


    if(isLoading)return (
        <RenderSafeAreaView isNeedTouchableWithoutFeedback={true} >
            <View style={[styles.container]} >
                <Spinner />
            </View>
        </RenderSafeAreaView>
    )

    return <RenderSafeAreaView isNeedTouchableWithoutFeedback={true} >
        {/* <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={60} > */}
        <View style={[styles.container]} >
            <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset={60} >
                <CommonText 
                    text="캘린더 이름을 정해볼까요?"
                    type="Title1B24"
                    color={colors.gray.GR750}
                />
                <CommonTextInput
                    autoFocus={true}
                    text={calendarName}
                    setText={setCalendarName}
                    color={colors.gray.GR800}
                    placeholderTextColor={colors.gray.GR500}
                    placeholder="회사, 학업, 가족 등 간략하게 입력해주세요."
                    style={styles.nameInput}
                    marginTop={4}
                />

                
                    <BtnXLarge  
                        active={true}
                        type="SolidHigh"
                        style={{width: "100%",marginVertical: 10}}
                        action={handleRegister}
                        text={"시작하기"}
                    />
            </KeyboardAvoidingView>
                </View>
    </RenderSafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    nameInput: {
        minWidth: "100%",
        height: 40,
        padding: 10,
         paddingVertical: 10, 
         borderWidth: 2,
          borderRadius: 4
    }
});

export default CreateCalendarModal;