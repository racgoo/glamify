import React, { Fragment } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { SafeAreaView, StyleProp, StyleSheet } from "react-native";
import colors from "../../styles/colors";

interface RenderSafeAreaViewType {
  children?: JSX.Element;
  style?: ViewStyle;
  isNeedTouchableWithoutFeedback?: boolean;
}

const RenderSafeAreaView = ({
  children,
  style,
  isNeedTouchableWithoutFeedback = false,
}: RenderSafeAreaViewType) => {
  return (
    <SafeAreaView style={[styles.root, style]}>
      {isNeedTouchableWithoutFeedback ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {children}
        </TouchableWithoutFeedback>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: colors.gray.White,
    flex: 1,
  },
});

export default RenderSafeAreaView;
