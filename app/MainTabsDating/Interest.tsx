import { Pressable, StyleSheet, Text } from 'react-native';
import RenderSafeAreaView from '../../components/layout/RenderSafeAreaView';
import router from '../../references/router';
import { View } from 'react-native';
import { API_healthCheck } from '../../controller/api';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';

function Interest() {
  const goToOne = () => {
    // router.navigate({pathname: "Camera/Test2", params: {} as routeType["MainTabs"]})
  }
  const healthCheckParams = {dummy: "Test1"};
  const healthCheck = useQuery({
    queryKey: ["API_healthCheck","Interest"],
    queryFn: () => API_healthCheck(healthCheckParams)
  });
  useFocusEffect(
    useCallback(() => {
      healthCheck.refetch();
    }, [JSON.stringify(healthCheckParams)])
  );

  return (
    <RenderSafeAreaView>
        <View style={styles.container}>
        <Pressable onPress={goToOne} >
            <Text style={styles.title}>{healthCheck?.data?.data?.data?.dummy}</Text>
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

export default React.memo(Interest);