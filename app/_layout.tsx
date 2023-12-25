import "../style.css";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Colors from "@/shared/constants/Colors";
import Fab from "@/shared/components/fab";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors["app-bg"],
          },
          headerTitleStyle: {
            color: Colors["app-text"],
          },
          headerShadowVisible: false,
          headerTintColor: Colors["app-primary"],
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(settings)/profile"
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="(settings)/import-card"
          options={{ title: "Import credit card" }}
        />
        <Stack.Screen
          name="(settings)/currencies"
          options={{ title: "Select a Currency" }}
        />
        <Stack.Screen
          name="(settings)/categories"
          options={{ title: "Categories" }}
        />
      </Stack>
      <Fab />
    </>
  );
}
