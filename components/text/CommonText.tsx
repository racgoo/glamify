import React from "react";
import { Text, TextProps, TextStyle, TextInputProps, ViewStyle } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
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
  text: string | JSX.Element;
  numberOfLines: number;
  ellipsizeMode: "tail" | "clip";
  style: ViewStyle;
}

const CommonText = ({
  text,
  color = colors.gray.GR900,
  type,
  textAlign,
  numberOfLines,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  textDecorationLine,
  ellipsizeMode,
  style,
  ...props
}: commonTextProps) => {
  return (
    <Text
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
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      {...props}
    >
      {text}
    </Text>
  );
};

CommonText.defaultProps = {
  text: "",
  color: colors.gray.White,
  type: "body1_B",
  textAlign: "left",
  numberOfLines: 0,
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
  ellipsizeMode: "tail",
  style: {},
};

export default CommonText;
