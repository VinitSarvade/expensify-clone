import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function ListGroup({
  children,
  className,
  ...props
}: ViewProps) {
  return (
    <View
      {...props}
      className={twMerge(
        "bg-white rounded-md shadow-md shadow-app-border",
        className,
      )}
    >
      {children}
    </View>
  );
}
