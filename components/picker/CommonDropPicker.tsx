import { useState } from 'react';
import { ViewStyle } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
interface CommonDropPickerProps {
  style: ViewStyle,
  value: any,
  setValue: any,
  items: {label: string, value: any}[]
}
const CommonDropPicker = ({
  style,
  value,
  setValue,
  items
}: CommonDropPickerProps) => {
  const [open, setOpen] = useState(false);
  let initialStyle: ViewStyle = {
    // borderColor: ""
  };
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      // setItems={setItems}
      placeholder='캘린더를 선택해주세요'
      // disableBorderRadius={true}
      style={Object.assign(style,initialStyle)}
    />
  );
}
export default CommonDropPicker;