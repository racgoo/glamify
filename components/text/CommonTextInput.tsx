import React from "react";
import {
  Text,
  TextProps,
  TextStyle,
  TextInputProps,
  ViewStyle,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import TextDeleteIcon from "../../assets/icons/cancel/TextDeleteIcon";
import { Keyboard } from "react-native";
interface commonTextProps extends TextStyle {
  color: string;
  type:
    | "TitleS28"
    | "Title1B24"
    | "Title2B20"
    | "Title3B18"
    | "Title3S18"
    | "Body1S16"
    | "Body2M16"
    | "Body3S15"
    | "Body4B14"
    | "Body5S14"
    | "Body6M14"
    | "Caption1M12"
    | "Caption2B12";
  text: string;
  setText: (newText: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  style: ViewStyle;
  placeholder?: string;
  onFocus?: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: () => void;
  placeholderTextColor?: string;
  autoFocus?: boolean;
  deleteButtonOffset?: number;
  isNumberPad?: boolean;
  hideEraser?: boolean;
}

const CommonTextInput = ({
  text,
  color = colors.gray.GR900,
  type,
  textAlign,
  numberOfLines,
  multiline,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  textDecorationLine,
  style,
  setText,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  autoFocus = false,
  deleteButtonOffset = 4,
  isNumberPad = false,
  hideEraser = false,
  ...props
}: commonTextProps) => {
  return (
    <View
      style={{
        width: style.width ?? "auto",
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        justifyContent: "center",
      }}
    >
      <TextInput
        style={[
          {
            ...fonts[type],
            color,
            textAlign,
            includeFontPadding: false,
            textDecorationLine,
          },
          style,
        ]}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
        value={text}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
        autoFocus={autoFocus}
        // returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        onChangeText={(text) => {
          setText(text);
        }}
        keyboardType={isNumberPad ? "number-pad" : "default"}
      />
      {text !== "" && hideEraser === false && (
        <Pressable
          onPress={() => setText("")}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            right: deleteButtonOffset,
          }}
          hitSlop={{ top: 3, right: 3, bottom: 3, left: 3 }}
        >
          <TextDeleteIcon />
        </Pressable>
      )}
    </View>
  );
};

CommonTextInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  multiline: false,
  placeholder: "",
  text: "",
  color: colors.gray.White,
  type: "body1_B",
  textAlign: "left",
  textAlignVertical: "top",
  paddingTop: 0,
  paddingBottom: 0,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginHorizontal: 0,
  marginVertical: 0,
  textDecorationLine: "none",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  placeholderTextColor: "#FFFFFF",
  style: {},
};

export default CommonTextInput;
