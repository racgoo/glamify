import { Dimensions } from "react-native"

const width = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').width : Dimensions.get('window').height
const height =  Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width
const screenWidth = Dimensions.get('screen').height > Dimensions.get('screen').width ? Dimensions.get('screen').width : Dimensions.get('screen').height
const screenHeight = Dimensions.get('screen').height > Dimensions.get('screen').width ? Dimensions.get('screen').height : Dimensions.get('screen').width
const orientation = Dimensions.get('window').height > Dimensions.get('window').width ? 'portrait' : 'landscape'
const headerHeight = 40;
const dimensions = {
    width,
    height,
    screenWidth,
    screenHeight,
    orientation,
    headerHeight
};
export default dimensions;