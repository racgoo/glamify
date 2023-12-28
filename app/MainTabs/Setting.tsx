import { Pressable, StyleSheet, Text, View } from 'react-native';
import RenderSafeAreaView from '../../components/layout/RenderSafeAreaView';
import router from '../../references/router';
import requestLogout from '../../action/auth/requestLogout';
import requestLoadingOpen from '../../action/loading/requestLoadingOpen';
import React from 'react';

function Setting() {
  const handleLogout = async () => {
    requestLoadingOpen();
    await requestLogout();
  }
  return (
    <RenderSafeAreaView>
        <View style={styles.container}>
        <Pressable onPress={handleLogout} >
            <Text style={styles.title}>Log out</Text>
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

export default React.memo(Setting);