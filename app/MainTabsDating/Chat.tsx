import { Pressable, StyleSheet, Text, View } from 'react-native';
import RenderSafeAreaView from '../../components/layout/RenderSafeAreaView';
import router from '../../references/router';
import React from 'react';

function Chat() {
  const goToOne = () => {
    router.navigate({pathname: "Camera/CameraTest", params: {} as routeType["Camera/CameraTest"]})
  }
  return (
    <RenderSafeAreaView>
        <View style={styles.container}>
        <Pressable onPress={goToOne} >
            <Text style={styles.title}>Tab Two</Text>
        </Pressable>
        </View>
    </RenderSafeAreaView>
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

export default React.memo(Chat);