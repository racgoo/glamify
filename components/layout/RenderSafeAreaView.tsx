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
import OverlayLoadingModule from "../dynamicModules/loading/OverlayLoadingModule";
import CustomPopupModule from "../dynamicModules/popup/CustomPopupModule";
interface RenderSafeAreaViewType {
  children?: JSX.Element;
  style?: ViewStyle;
  isNeedTouchableWithoutFeedback?: boolean;
  isLoading?: boolean;
  isKeyboardAvoidingView?: boolean;
}

const RenderSafeAreaView = ({
  children,
  style,
  isNeedTouchableWithoutFeedback = false,
  isLoading = false,
}: RenderSafeAreaViewType) => {
  let dimensions = Dimensions.get("screen");
  if(isNeedTouchableWithoutFeedback){
    children=<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {children}
    </TouchableWithoutFeedback>
  }
  
    
  
  return (
    <SafeAreaView style={[styles.root, style]}>
      <Fragment>

        <OverlayLoadingModule />
        <CustomPopupModule />
        {/* {isLoading && (
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
        )} */}
        {children}
        {/* {isNeedTouchableWithoutFeedback ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            
              {children}
          </TouchableWithoutFeedback>
        ) : (
          children
        )} */}
      </Fragment>
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
