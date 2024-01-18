import moment from "moment";

/**
 * 통신할때 사용되는 UTC String으로 변형하는 함수 
 * @param {moment} momentObject 사용중인 moment 객체 
 * @returns {string} moment객체의 UTC를 YYYY-MM-DD HH:mm:ss 형식으로 반환
*/
const momentToUtcString = ( momentObject: moment.Moment ) => {
    return momentObject.utc().format('YYYY-MM-DD HH:mm:ss')
}
export default momentToUtcString;