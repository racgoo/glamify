import SelectDropdown from "react-native-select-dropdown";

type CommonLabelSelectBoxProps = {
    item: labelType;
    setItem: (a: labelType) => void; 
    itemList: labelType[];
  };

  const CommonLabelSelectBox = ({
    item,
    setItem,
    itemList,
  }: CommonLabelSelectBoxProps) => {
  return (
    <SelectDropdown
      data={itemList.map(item => item.name)}
      onSelect={(selectedItem, index) => {
        setItem(itemList[index]);
      }}
      defaultValue={item.name}
      buttonStyle={{
        borderWidth: 2,
        width: "100%"
      }}
      dropdownStyle={{
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF"
      }}
      selectedRowStyle={{
          backgroundColor: item.color
      }}

    //   buttonTextAfterSelection={(selectedItem, index) => {
    //     // text represented after item is selected
    //     // if data array is an array of objects then return selectedItem.property to render after item is selected
    //     return selectedItem;
    //   }}
    //   rowTextForSelection={(item, index) => {
    //     // text represented for each item in dropdown
    //     // if data array is an array of objects then return item.property to represent item in dropdown
    //     return item;
    //   }}
    />
  );
};
export default CommonLabelSelectBox;
