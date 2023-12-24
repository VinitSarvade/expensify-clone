import { Text as RnText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Text({ children, className, ...props }: TextProps) {
  return (
    <RnText
      className={twMerge("text-app-text font-medium text-lg", className)}
      {...props}
    >
      {children}
    </RnText>
  );
}
