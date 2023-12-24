import { ForwardedRef, forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

function ScreenWrapper(
  { className, children, ...props }: ScrollViewProps,
  ref: ForwardedRef<ScrollView>,
) {
  return (
    <ScrollView
      className={twMerge("flex-1 bg-app-bg", className)}
      showsVerticalScrollIndicator={false}
      ref={ref}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export default forwardRef(ScreenWrapper);
