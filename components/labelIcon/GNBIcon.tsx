import ActiveHomeIcon from "../../assets/icons/GNB/ActiveHomeIcon";
import InActiveHomeIcon from "../../assets/icons/GNB/InActiveHomeIcon";
import ActiveSearchIcon from "../../assets/icons/GNB/ActiveSearchIcon";
import InactiveSearchIcon from "../../assets/icons/GNB/InActiveSearchIcon";
import ActiveInterestIcon from "../../assets/icons/GNB/ActiveInterestIcon";
import InActiveInterestIcon from "../../assets/icons/GNB/InActiveInterestIcon";
import InActiveChatIcon from "../../assets/icons/GNB/InActiveChatIcon";
import ActiveChatIcon from "../../assets/icons/GNB/ActiveChatIcon";
import InActiveSettingIcon from "../../assets/icons/GNB/InActiveSettingIcon";
import ActiveSettingIcon from "../../assets/icons/GNB/ActiveSettingIcon";
import InActiveCommunityIcon from "../../assets/icons/GNB/InActiveCommunityIcon";
import ActiveCommunityIcon from "../../assets/icons/GNB/ActiveCommunityIcon";
import InActiveCalendarIcon from "../../assets/icons/GNB/InActiveCalendarIcon";
import ActiveCalendarIcon from "../../assets/icons/GNB/ActiveCalendarIcon";
import { View } from "react-native";
import CommonText from "../text/CommonText";
import colors from "../../styles/colors";

interface GNBIconProps {
    type: "Home" | "Search" | "Interest" | "Chat" | "Setting" | "Community" | "Calendar";
    isFocused: boolean;
}
const GNBIcon = ({ type, isFocused }: GNBIconProps):JSX.Element => {
    let index = isFocused ? 1 : 0;
    const getIcon = () => {
        switch(type) {
            case "Community": return [<InActiveCommunityIcon />,<ActiveCommunityIcon />][index];
            case "Calendar": return [<InActiveCalendarIcon />,<ActiveCalendarIcon />][index];
            case "Home": return [<InActiveHomeIcon />,<ActiveHomeIcon />][index];
            case "Search": return [<InactiveSearchIcon />,<ActiveSearchIcon />][index];
            case "Interest": return [<InActiveInterestIcon />,<ActiveInterestIcon />][index];
            case "Chat": return [<InActiveChatIcon />,<ActiveChatIcon />][index];
            case "Setting": return [<InActiveSettingIcon />,<ActiveSettingIcon />][index];
            default: return [<InActiveInterestIcon />,<ActiveInterestIcon />][index];
        }
    }
    const getLabel = () => {
        switch(type) {
            case "Community": return "커뮤니티";
            case "Calendar": return "캘린더";
            case "Home": return "홈";
            case "Search": return "검색";
            case "Interest": return "흥미";
            case "Chat": return "채팅";
            case "Setting": "더보기";
            default: return "";
        }
    }
    return <View style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        {getIcon()}
        {/* <CommonText 
            text={getLabel()}
            color={isFocused ? colors.gray.GR900 : colors.gray.GR600}
            type="Title1B24"
        /> */}
    </View>
}
export default GNBIcon;