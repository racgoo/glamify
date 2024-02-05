import React, { Fragment, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { GestureResponderEvent } from "react-native-modal";
import colors from "../../styles/colors";
import CommonText from "../text/CommonText";

interface BtnXLargeProps {
    type: "SolidHigh" | "SolidLow" | "OutlineHigh" | "OutlineLow";
    style?: ViewStyle;
    active: boolean;
    text?: string | JSX.Element;
    component?: JSX.Element;
    action?: () => void;
}

const BtnXLarge: React.FC<BtnXLargeProps> = ({
  text = "",
  component = null,
  action = () => {},
  active = true,
  type = "SolidHigh",
  style = {},
}): JSX.Element => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const generateButtonStyle = () => {
    let selectedStyle = styles.solidHighDisabledButton;
    if (active) {
      if (isPressed) {
        switch (type) {
          case "SolidHigh":
            selectedStyle = styles.solidHighPressedButton;
            break;
          case "SolidLow":
            selectedStyle = styles.solidLowPressedButton;
            break;
          case "OutlineHigh":
            selectedStyle = styles.outlineHighPressedButton;
            break;
          case "OutlineLow":
            selectedStyle = styles.outlineLowPressedButton;
            break;
        }
      } else {
        switch (type) {
          case "SolidHigh":
            selectedStyle = styles.solidHighEnabledButton;
            break;
          case "SolidLow":
            selectedStyle = styles.solidLowEnabledButton;
            break;
          case "OutlineHigh":
            selectedStyle = styles.outlineHighEnabledButton;
            break;
          case "OutlineLow":
            selectedStyle = styles.outlineLowEnabledButton;
            break;
        }
      }
    } else {
      switch (type) {
        case "SolidHigh":
          selectedStyle = styles.solidHighDisabledButton;
          break;
        case "SolidLow":
          selectedStyle = styles.solidLowDisabledButton;
          break;
        case "OutlineHigh":
          selectedStyle = styles.outlineHighDisabledButton;
          break;
        case "OutlineLow":
          selectedStyle = styles.outlineLowDisabledButton;
          break;
      }
    }
    return selectedStyle;
  };

  const generateTextColor = () => {
    switch (type) {
      case "SolidHigh":
        return active
          ? isPressed
            ? colors.gray.White
            : colors.gray.White
          : colors.gray.White;
      case "SolidLow":
        return active
          ? isPressed
            ? colors.gray.GR700
            : colors.gray.GR700
          : colors.gray.White;
      case "OutlineHigh":
        return active
          ? isPressed
            ? colors.orange.OR700
            : colors.orange.OR500
          : colors.gray.GR200;
      case "OutlineLow":
        return active
          ? isPressed
            ? colors.gray.GR750
            : colors.gray.GR750
          : colors.gray.GR200;
    }
  };

  return (
    <Pressable
      style={[styles.baseLayout, generateButtonStyle(),style]}
      onPress={(event: GestureResponderEvent) => {
        if (active) action();
      }}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
      }}
    >
      {
        component ?? <CommonText color={generateTextColor()} type="Body1S16" text={text} />
      }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseLayout: {
    borderRadius: 16,
    width: "100%",
    minHeight: 52,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  solidHighEnabledButton: {
    backgroundColor: colors.orange.OR500,
    borderColor: colors.orange.OR500,
    borderWidth: 1,
  },
  solidHighDisabledButton: {
    backgroundColor: colors.gray.GR200, //colors에 추가해야함, 디자인 예시라 아직 design system에 없음
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
  solidHighPressedButton: {
    backgroundColor: colors.orange.OR700,
    borderColor: colors.orange.OR500,
    borderWidth: 1,
  },
  solidLowEnabledButton: {
    backgroundColor: colors.gray.GR150,
    borderColor: colors.gray.GR150,
    borderWidth: 1,
  },
  solidLowDisabledButton: {
    backgroundColor: colors.gray.GR200, //colors에 추가해야함, 디자인 예시라 아직 design system에 없음
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
  solidLowPressedButton: {
    backgroundColor: colors.gray.GR200,
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
  outlineHighEnabledButton: {
    backgroundColor: colors.gray.White,
    borderColor: colors.orange.OR500,
    borderWidth: 1,
  },
  outlineHighDisabledButton: {
    borderColor: colors.gray.GR200,
    backgroundColor: colors.gray.White,
    borderWidth: 1,
  },
  outlineHighPressedButton: {
    backgroundColor: colors.gray.GR150,
    borderColor: colors.orange.OR700,
    borderWidth: 1,
  },
  outlineLowEnabledButton: {
    backgroundColor: colors.gray.White,
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
  outlineLowDisabledButton: {
    backgroundColor: colors.gray.White,
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
  outlineLowPressedButton: {
    backgroundColor: colors.gray.GR100,
    borderColor: colors.gray.GR200,
    borderWidth: 1,
  },
});

export default BtnXLarge;