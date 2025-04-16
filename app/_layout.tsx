import SafeScreen from "@/components/SafeScreen";
import { Stack, useSegments, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AssessorUserProfile } from "@/commons/zustand/useAuthStore";
import NetworkStatusWrapper from "@/hooks/NetworkStatusWrapper";
import { Linking } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false); // Track when the app is ready
  const [loaded, error] = useFonts({
    'JetBrain': require('@/assets/fonts/JetBrainsMonoNL-Bold.ttf'),
    'JetBrainItalic': require('@/assets/fonts/JetBrainsMonoNL-BoldItalic.ttf'),
  });

  const { checkAuth, user, accessToken } = AssessorUserProfile();
  const segments = useSegments();
  useEffect(() => {
    // Lắng nghe sự kiện khi ứng dụng được mở bằng deep link
    const handleDeepLink = (event: { url: string }) => {
      if (!event?.url) return; // Kiểm tra URL hợp lệ
      console.log('Deep link URL:', event.url);
    
      const path = event.url.replace('catholicBookV5://', '');
      if (path === 'auth') {
        router.replace('/(auths)');
      } else if (path === 'tabs/bookStacks') {
        router.replace('/(tabs)/(bookStacks)');
      } else {
        console.warn('Unhandled deep link path:', path);
      }
    };

    // Lấy URL nếu ứng dụng được mở bằng deep link
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log('Initial URL:', initialUrl);
        handleDeepLink({ url: initialUrl });
      }
    };

    // Đăng ký listener
    const linkingListener = Linking.addListener('url', handleDeepLink);

    // Kiểm tra URL ban đầu
    getInitialURL();

    // Cleanup listener khi component bị unmount
    return () => {
      linkingListener.remove();
    };
  }, []);
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await checkAuth(); // Kiểm tra trạng thái đăng nhập
        if (loaded || error) {
          setAppReady(true); // Đánh dấu ứng dụng đã sẵn sàng
        }
      } catch (e) {
        console.log("Error during app preparation:", e);
      } finally {
        if (loaded || error) {
          SplashScreen.hideAsync(); // Ẩn splash screen khi fonts đã tải xong
        }
      }
    };
  
    prepareApp();
  }, [loaded, error, checkAuth]);

  useEffect(() => {
    if (!appReady || !segments || !router) return; // Đảm bảo segments đã sẵn sàng
  
    const inAuthScreen = segments[0] === "(auths)";
    const isSignedIn = user && accessToken;
  
    if (router && !isSignedIn && !inAuthScreen) {
      router.replace("/(auths)");
    } else if (router && isSignedIn && inAuthScreen) {
      router.replace("/(tabs)/(bookStacks)");
    }
  }, [user, accessToken, segments, appReady, router]);

  if (!appReady) {
    return null; // Render nothing until the app is ready
  }

  

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <NetworkStatusWrapper>
          <Stack>
            <Stack.Screen
              name="(auths)"
              options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }} />
          </Stack>
        </NetworkStatusWrapper>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}