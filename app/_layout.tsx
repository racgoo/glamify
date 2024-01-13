import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigation } from 'expo-router';
import { Fragment, useEffect } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { RecoilRoot } from 'recoil';
import { setCustomText } from "react-native-global-props"
import OverlayLoadingModule from "../components/dynamicModules/loading/OverlayLoadingModule";
import RecoilNexus from 'recoil-nexus';
import NavigationModule from "../components/dynamicModules/navigation/NavigationModule";
import CustomPopupModule from "../components/dynamicModules/popup/CustomPopupModule";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import requestLoadingClose from '../action/loading/requestLoadingClose';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();


export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "SpaceMono": require('../assets/fonts/SpaceMono-Regular.ttf'),
    // ...FontAwesome.font,
  });
  

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  if (!loaded) {
    return null;
  }
  
  

  return <Fragment>
    <QueryClientProvider client={queryClient} >
        <StatusBar style="dark" />
        <RecoilRoot>
          <RecoilNexus />
          <OverlayLoadingModule />
          <CustomPopupModule />
          <NavigationModule />
          <RootLayoutNav />
        </RecoilRoot>
    </QueryClientProvider>
  </Fragment>;
}


function RootLayoutNav() {
  const navigation = useNavigation();
  
  useEffect(()=>{
      navigation.addListener("state",(state)=>{
        requestLoadingClose();
      })
    },[]);

  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" options={{ headerShown: false }} />
      <Stack.Screen name="Login/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Login/SocialWebviewScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Camera/CameraTest" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="Calendar/CalendarDetailModal" options={{ headerShown: false,presentation: "formSheet"}} />
      <Stack.Screen name="Calendar/MutateShedule" options={{  title: "일정 추가" ,headerShown: true, presentation: "formSheet"}} />
      <Stack.Screen name="Calendar/SelectCalendarModal" options={{  headerShown: false, presentation: "formSheet"}} />
      
    </Stack>
  );
}
