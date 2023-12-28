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
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import TextDeleteIcon from "../../assets/icons/cancel/TextDeleteIcon";
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
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderTextColor?: string;
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
  ...props
}: commonTextProps) => {
  return (
    <View style={{ width: "100%", justifyContent: "center" }}>
        <TextInput
          style={[
            {
              ...fonts[type],
              color,
              textAlign,
              includeFontPadding: false,
              marginTop,
              marginBottom,
              marginLeft,
              marginRight,
              marginHorizontal,
              marginVertical,
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
          onChangeText={(text) => {
            setText(text);
          }}
        />
        {text!=="" && 
        <Pressable 
          onPress={()=>setText("")}
          style={{position: "absolute",width: 20, height: 20, right: -4}} 
        >
          <TextDeleteIcon />
        </Pressable>
        }
        
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
  textAlignVertical: 'top',
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
