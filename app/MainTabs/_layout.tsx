import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, Pressable, View, useColorScheme } from 'react-native';
import router from '../../references/router';
import { router as expoRouter } from "expo-router";
import GNBIcon from '../../components/labelIcon/GNBIcon';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import serializeParams from '../../modules/params/serializeParams';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const params = serializeParams(useLocalSearchParams()) as routeType["MainTabs"];
  const [currentTab,setCurrentTab] = useState("");
  useEffect(()=>{
    if(params.tabPathname){
      expoRouter.push(`/MainTabs/${params.tabPathname}`);
    }
  },[params]);

  return (
    <Tabs
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIconStyle: {marginTop: 10}
      }}
      screenListeners={{
        tabPress: (event) => {
          let shortTabName = event.target?.split("-")[0] ?? "";
          if(shortTabName===currentTab){
            DeviceEventEmitter.emit(event.target?.split("-")[0] ?? "",{});
          }
          setCurrentTab(shortTabName);
        }
      }}
    >
      <Tabs.Screen

        name="Home"
        options={{
          tabBarIcon: ({ color,focused }) => <GNBIcon type='Home' isFocused={focused} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          tabBarIcon: ({ color,focused }) => <GNBIcon type='Calendar' isFocused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Community"
        options={{
          tabBarIcon: ({ color,focused }) => <GNBIcon type='Community' isFocused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          tabBarIcon: ({ color,focused }) => <GNBIcon type='Setting' isFocused={focused} />,
        }}
      />
    </Tabs>
  );
}
