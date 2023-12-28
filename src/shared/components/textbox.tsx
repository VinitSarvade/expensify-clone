import { ForwardedRef, forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

import Text from "./text";
import Colors from "../constants/Colors";

interface TextboxProps extends Omit<TextInputProps, "className"> {
  label: string;
  inputClassName?: string;
  labelClassName?: string;
}

function Textbox(
  { label, inputClassName, labelClassName, ...props }: TextboxProps,
  ref: ForwardedRef<TextInput>,
) {
  return (
    <View>
      <Text className={twMerge("text-md font-semibold", labelClassName)}>
        {label}
      </Text>
      <TextInput
        ref={ref}
        className={twMerge(
          "h-10 border-b border-app-border text-lg/none",
          inputClassName,
        )}
        placeholderTextColor={Colors["app-text-light"]}
        clearButtonMode="while-editing"
        {...props}
      />
    </View>
  );
}

export default forwardRef(Textbox);
