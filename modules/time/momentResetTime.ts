import * as moment from "moment";
const momentResetTime = (momnetDate: moment.Moment) => {
    return momnetDate.startOf('day');
}
export default momentResetTime;