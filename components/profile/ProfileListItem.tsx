import { Image, View } from "react-native";
import CommonText from "../text/CommonText";
import colors from "../../styles/colors";

const ProfileListItem = ({}) => {
    return <View style={{flexDirection: "row", gap: 18}} >
         <Image
            style={{ width: 64, height: 64, borderRadius: 24 }}
            source={{
                uri: 'https://unsplash.it/400/400?image=1'
            }}
            resizeMode={"contain"}
        />
        <View>
            <View style={{flexDirection: "row", alignItems: "center"}} >
                <CommonText text={"락구"} type={"Body1S16"} color={colors.gray.GR800} marginRight={8} />
                <CommonText text={"프리랜서 / 사무직"} type={"Body5S14"} color={colors.gray.GR600} />
            </View>    
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 3}} >
                <CommonText text={"락구"} type={"Body1S16"} color={colors.gray.GR800} marginRight={8} />
                <CommonText text={"프리랜서 / 사무직"} type={"Body5S14"} color={colors.gray.GR600} />
            </View>    
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 6}} >
                <CommonText text={"락구"} type={"Body1S16"} color={colors.gray.GR800} marginRight={8} />
                <CommonText text={"프리랜서 / 사무직"} type={"Body5S14"} color={colors.gray.GR600} />
            </View>    
        </View>
    </View>
}
export default ProfileListItem;