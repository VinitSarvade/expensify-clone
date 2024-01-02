import { View, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SvgFromUri } from "react-native-svg";

import Colors from "@/shared/constants/Colors";

const TabItems = [
  {
    screen: "index",
    title: "Home",
    icon: "home" as const,
  },
  {
    screen: "expenses",
    title: "Expenses",
    icon: "receipt" as const,
  },
  {
    screen: "trips",
    title: "Trips",
    icon: "airplane" as const,
  },
  {
    screen: "reports",
    title: "Reports",
    icon: "document" as const,
  },
  {
    screen: "settings",
    title: "Settings",
    icon: "settings" as const,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors["app-bg"],
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: Colors["app-primary"],
        headerTitleStyle: {
          color: Colors["app-text"],
        },
        headerRight: HeaderRight,
        headerLeft: HeaderLeft,
      }}
    >
      {TabItems.map(({ screen, title, icon }) => (
        <Tabs.Screen
          key={screen}
          name={screen}
          options={{
            title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={icon}
                color={focused ? Colors["app-primary"] : color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const HeaderLeft = () => (
  <SvgFromUri
    uri="https://static1.squarespace.com/static/ta/577c006b725e25e0affed0c1/2551/assets/img/expensify-wordmark.svg"
    width={80}
    height={20}
    className="ml-3 mt-2"
    fill={Colors["app-text-light"]}
  />
);

const HeaderRight = () => (
  <View className="mr-3 flex-row gap-5">
    <TouchableOpacity>
      <Ionicons
        name="chatbubble-outline"
        size={24}
        color={Colors["app-text-light"]}
      />
    </TouchableOpacity>
  </View>
);
