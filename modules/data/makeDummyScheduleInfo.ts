const makeDummyScheduleInfo = (): scheduleInfoType => {
    return {
        schedule_info_id: -1,
        schedule_id: -1,
        register_date: "",
        update_date: "",
        done_Yn: "N",
        target_date: "",
        user_id: -1
    }
}
export default makeDummyScheduleInfo;