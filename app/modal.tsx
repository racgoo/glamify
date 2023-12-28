import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface ModalScreenProps {
  InnerComponent?: JSX.Element;
}
export default function ModalScreen({InnerComponent=<View />}: ModalScreenProps) {
  return (
    <View style={styles.container}>
      {InnerComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
