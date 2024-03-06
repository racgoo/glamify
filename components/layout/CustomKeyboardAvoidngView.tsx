import { useEffect, useState } from "react";
import { KeyboardAvoidingView, NativeModules, Platform } from "react-native";

const CustomKeyboardAvoidngView = ({children,offset= 70}: {children: JSX.Element,offset?: number}) => {
    const { StatusBarManager } = NativeModules;
    useEffect(()=>{
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData: any) => {
            setStatusBarHeight(statusBarFrameData.height)
          }) : null
    }, []);

    const [statusBarHeight, setStatusBarHeight] = useState(0);
    return <KeyboardAvoidingView
        behavior={"padding"}
        style={{flex: 1}}
        keyboardVerticalOffset={statusBarHeight+offset}
    >
            {children}
    </KeyboardAvoidingView>
}
export default CustomKeyboardAvoidngView;
 