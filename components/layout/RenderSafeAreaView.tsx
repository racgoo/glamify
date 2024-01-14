import React, { Fragment } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, StyleProp, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import Spinner from "../../assets/animation/Spinner";

interface RenderSafeAreaViewType {
  children?: JSX.Element;
  style?: ViewStyle;
  isNeedTouchableWithoutFeedback?: boolean;
  isLoading?: boolean;
}

const RenderSafeAreaView = ({
  children,
  style,
  isNeedTouchableWithoutFeedback = false,
  isLoading = false,
}: RenderSafeAreaViewType) => {
  let dimensions = Dimensions.get("screen");
  return (
    <SafeAreaView style={[styles.root, style]}>
      {isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: dimensions.height,
            width: dimensions.width,
            position: "absolute",
            zIndex: 10000,
          }}
        >
          <Spinner />
        </View>
      )}

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
