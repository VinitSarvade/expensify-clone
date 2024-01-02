import "../style.css";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useShallow } from "zustand/react/shallow";

import Colors from "@/shared/constants/Colors";
import Fab from "@/shared/components/fab";
import Text from "@/shared/components/text";
import { useUser } from "@/shared/store/user";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [storeLoaded, setStoreLoaded] = useState(false);
  const email = useUser(useShallow((store) => store.email ?? ""));

  useUser.persist.onFinishHydration(() => {
    setStoreLoaded(true);
  });

  const [loaded, error] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    setStoreLoaded(useUser.persist.hasHydrated());
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && storeLoaded) {
      if (storeLoaded && email.length > 0) {
        router.replace("/(tabs)/home");
      }
    }
  }, [loaded, storeLoaded, email]);

  const onLayout = () => {
    SplashScreen.hideAsync();
  };

  if (!loaded || !storeLoaded) {
    return null;
  }

  return (
    <View className="flex-1" onLayout={onLayout}>
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
          headerTintColor: Colors["app-text"],
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(settings)/profile"
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="(settings)/currencies"
          options={{ title: "Select a Currency" }}
        />
        <Stack.Screen
          name="(settings)/categories"
          options={{ title: "Categories" }}
        />
        <Stack.Screen
          name="add-expense"
          options={{
            title: "New Expense",
            presentation: "modal",
            headerRight() {
              return (
                <Pressable onPress={router.back}>
                  <Text className="text-app-secondary">Close</Text>
                </Pressable>
              );
            },
          }}
        />
      </Stack>
      <Fab />
    </View>
  );
}
