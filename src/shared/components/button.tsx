import { TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

import Text from "@/shared/components/text";

interface ButtonProps {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  onPress: () => void;
}

export default function Button({
  label,
  containerClassName,
  labelClassName,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        "flex-row items-center justify-center h-14 bg-app-primary rounded-full",
        containerClassName,
      )}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Text className={twMerge("text-white font-semibold", labelClassName)}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
