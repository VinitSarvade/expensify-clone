import { StatusBar } from "expo-status-bar";
import { ScrollView, ScrollViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function ScreenWrapper({
  className,
  children,
  ...props
}: ScrollViewProps) {
  return (
    <ScrollView
      className={twMerge("flex-1 bg-app-bg", className)}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
