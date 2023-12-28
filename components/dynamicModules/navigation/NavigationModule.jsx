import { useRouter, useNavigation } from "expo-router";
import navigationRef from "../../../references/navigationRef";

const NavigationModule = () => {
    const navigation = useNavigation();
    navigationRef.current = navigation;
    return null;
}
export default NavigationModule;