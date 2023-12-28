import { View, Modal, StyleSheet } from "react-native";
import dimensions from "../../../styles/dimensions";
import colors from "../../../styles/colors";

const MiddlePopup = ({
    children,
    visible = false,
    ...props
    // handleBackButtonPress = () => {},
    // handleBackdropPress = () => {}
}) => {
    return <Modal
        visible={visible}
        style={styles.modalWrapper}
        // animationType="fade"
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        animationInTiming={10}
        animationOutTiming={10}
        backdropColor={colors.gray.GR900}
        backdropOpacity={0.5}
        deviceHeight={dimensions.height}
        deviceWidth={dimensions.width}
        onBackButtonPress={()=>{}}
        onBackdropPress={()=>{}}
        {...props}
        transparent={true}
        statusBarTranslucent
        accessibilityViewIsModal
        avoidKeyboard={false}
        useNativeDriverForBackdrop={true}
        
        // useNativeDriverForBackdrop={Platform.OS === "android"}
        
        
    >
        <View style={styles.popupWrapper} >
            <View style={styles.popupContent}>{children}</View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modalWrapper: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
    },  
    popupWrapper: {
        shadowOpacity: 0.5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 20,
        maxWidth: dimensions.width,
    },
    popupContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minWidth: 255,
    }
});

export default MiddlePopup;