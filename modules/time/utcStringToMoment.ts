import moment from "moment-timezone";

const utcStringToMoment = (utcString: string) => {
    const country = 'KR'; // 대한민국 , 국가 추가되면 이것도 바꿔여함
    const timezone = moment.tz.guess(true); // 사용자의 로컬 타임존 가져오기
    const countryTimezone = moment.tz.zonesForCountry(country)[0]; // 국가의 타임존 가져오기    
    const utcTime = moment.utc(utcString);
    const countryTime = utcTime.clone().tz(countryTimezone);
    return countryTime;
}
export default utcStringToMoment;