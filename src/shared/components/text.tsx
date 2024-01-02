import { Text as RnText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Text({ children, className, ...props }: TextProps) {
  return (
    <RnText
      className={twMerge("text-app-text font-medium text-lg", className)}
      maxFontSizeMultiplier={1}
      minimumFontScale={1}
      {...props}
    >
      {children}
    </RnText>
  );
}
