import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

const BtnLarge = ({text="확인", isHigh=true, action=()=>{},active=true,width = "100%",style={}}) => {
    return <TouchableOpacity
        style={[styles.btnLargeWrapper,!active ? styles.lowBtn : isHigh ? styles.highBtn : styles.lowBtn,{width: width},style ]}
        disabled={!active}
        onPress={action}
        activeOpacity={0.7}
    >
        <Text style={{
            color: "#000000",
            fontSize: 15,
            lineHeight: 22,
            fontWeight: 600
        }} >
            {text}
        </Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
    btnLargeWrapper: {
        borderRadius: 12,
        height: 44,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    lowBtn: {
        backgroundColor: colors.gray.GR150,
    },     
    highBtn: {
        backgroundColor: colors.orange.OR500,
    },
    disabledBtn: {
        backgroundColor: colors.gray.GR200,
    }
});

export default BtnLarge;