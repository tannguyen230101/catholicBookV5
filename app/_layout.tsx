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