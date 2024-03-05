const makeDummySchedule = (): scheduleType => {
    return {
        schedule_id: -1,
        user_id: -1,
        title: "",
        description: "",
        register_date: "",
        update_date: "",
        due_date: "",
        calendar_id: -1,
        is_done: false,
        repeat_type: "ONCE",
        weekly_days_mask: "0000000",
        interval_due_date: null,
        interval_num: 1,
        schedule_infos: []
    }
}
export default makeDummySchedule;

