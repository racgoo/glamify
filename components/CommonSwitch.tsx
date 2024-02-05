import { Dispatch, SetStateAction } from "react";
import { Switch } from "react-native";

interface CommonSwitchProps {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}
const CommonSwitch = ({setValue,value}: CommonSwitchProps) => {
    return <Switch
        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>{setValue((pre) => !pre)}}
        value={value}
    />
}
export default CommonSwitch;