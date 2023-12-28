import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CommonText from "../text/CommonText";
import colors from "../../styles/colors";

interface TextTabHeaderProps {
  currentTab: string;
  setCurrentTab: (nextTab: string) => void;
  tabList: string[];
}
const TextTabHeader = ({
  currentTab,
  setCurrentTab,
  tabList,
}: TextTabHeaderProps) => {
  const handleChange = (value: string) => {
    setCurrentTab(value);
  };
  const renderTabHeader = ({ item }: { item: string }): JSX.Element => {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => {
          handleChange(item);
        }}
      >
        <CommonText
          text={item}
          type={"Title1B24"}
          color={colors.gray.GR900}
          style={{ opacity: item === currentTab ? 1 : 0.2 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.headerWrapper]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tabList}
        renderItem={renderTabHeader}
        keyExtractor={(_, index) => String(index)}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
});

export default TextTabHeader;
