import { useCallback, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router, usePathname, Route } from "expo-router";

import Text from "./text";
import Colors from "../constants/Colors";

interface Option {
  title: string;
  actions: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    link?: Route<string>;
  }[];
}

const AnimatedIcon = Animated.createAnimatedComponent(Feather);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const screenWidth = Dimensions.get("screen").width;

const OPEN_WIDTH = screenWidth - 10;
const CLOSED_WIDTH = 56;
const OPEN_HEIGHT = 280;
const CLOSED_HEIGHT = 56;

const FAB_VISIBLE_PATHS = ["/", "/expenses", "/trips", "/reports"];

const OPTIONS: Option[] = [
  {
    title: "Expense",
    actions: [
      {
        title: "Create",
        icon: "receipt",
        link: "/add-expense",
      },
      {
        title: "Scan",
        icon: "camera",
      },
      {
        title: "Time",
        icon: "time",
      },
    ],
  },
  {
    title: "Distance",
    actions: [
      {
        title: "Create",
        icon: "car" as const,
        link: "/add-expense",
      },
      {
        title: "Odometer",
        icon: "camera" as const,
      },
      {
        title: "GPS",
        icon: "navigate" as const,
      },
    ],
  },
];

export default function Fab() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const viewStyle = useAnimatedStyle(() => {
    return {
      width: isOpen
        ? withSpring(OPEN_WIDTH, { mass: 0.5 })
        : withSpring(CLOSED_WIDTH, { mass: 0.5 }),
      height: isOpen
        ? withSpring(OPEN_HEIGHT, { mass: 0.5 })
        : withSpring(CLOSED_HEIGHT, { mass: 0.5 }),
      borderRadius: isOpen ? withTiming(10) : withTiming(28),
      right: isOpen ? withTiming(5) : withTiming(20),
      bottom: isOpen ? withTiming(5) : withTiming(128),
      borderBottomEndRadius: isOpen ? withTiming(50) : withTiming(28),
      borderBottomStartRadius: isOpen ? withTiming(50) : withTiming(28),
      backgroundColor: isOpen
        ? withTiming(Colors["app-bg"])
        : withTiming(Colors["app-primary"]),
      shadowColor: isOpen
        ? withTiming(Colors["app-text"])
        : withTiming(Colors["app-text-light"]),
      shadowRadius: isOpen ? withTiming(12) : withTiming(3),
      shadowOpacity: isOpen ? withTiming(0.4) : withTiming(0.8),
    };
  }, [isOpen]);

  const iconProps = useAnimatedProps(() => {
    return {
      color: isOpen ? withTiming(Colors["app-text"]) : withTiming("white"),
    };
  }, [isOpen]);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: isOpen ? withTiming(0.3) : withTiming(0),
    };
  }, [isOpen]);

  const goto = useCallback(
    (link?: Route<string>) => () => {
      if (link) {
        setIsOpen(false);
        router.push(link);
      }
    },
    [],
  );

  if (!FAB_VISIBLE_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <AnimatedPressable
          style={[backdropStyle]}
          className="flex-1 w-full h-full absolute inset-0 bg-app-text"
          onPress={() => setIsOpen(false)}
        />
      )}
      <Animated.View style={[viewStyle]} className="absolute shadow-sm">
        {!isOpen && (
          <Pressable
            onPress={() => setIsOpen(true)}
            className="rounded-full p-3 items-center justify-center "
            hitSlop={10}
          >
            <AnimatedIcon name="plus" size={36} animatedProps={iconProps} />
          </Pressable>
        )}

        {isOpen && (
          <Pressable
            onPress={() => setIsOpen(false)}
            className="absolute top-0 right-0 p-3 z-10"
            hitSlop={10}
          >
            <AnimatedIcon name="x" size={24} animatedProps={iconProps} />
          </Pressable>
        )}

        {isOpen && (
          <Animated.View entering={FadeInRight.delay(200)} className="p-4">
            {OPTIONS.map(({ title, actions }) => (
              <View key={title} className="mb-4">
                <Text className="mb-3">{title}</Text>
                <View className="flex-row gap-3">
                  {actions.map(({ title, icon, link }) => (
                    <TouchableOpacity
                      key={icon}
                      activeOpacity={0.5}
                      className="rounded-md bg-white py-3 items-center flex-1 justify-center border border-app-border"
                      onPress={goto(link)}
                    >
                      <Ionicons
                        name={icon}
                        size={24}
                        color={Colors["app-primary"]}
                      />
                      <Text className="text-md mt-2">{title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>
        )}
      </Animated.View>
    </>
  );
}
