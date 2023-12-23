import { ForwardedRef, forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";

function ListItem(
  { children, className, ...props }: TouchableOpacityProps,
  ref: ForwardedRef<TouchableOpacity>,
) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      ref={ref}
      className={twMerge(
        "ml-3 pr-2 h-14 border-b border-app-border flex-row justify-between items-center",
        className,
      )}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export default forwardRef(ListItem);
