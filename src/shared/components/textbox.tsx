import { ForwardedRef, forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

import Text from "./text";
import Colors from "../constants/Colors";
import { ValidationError } from "@tanstack/react-form";

interface TextboxProps extends Omit<TextInputProps, "className"> {
  label: string;
  error?: ValidationError[];
  inputClassName?: string;
  labelClassName?: string;
}

function Textbox(
  { label, inputClassName, labelClassName, error = [], ...props }: TextboxProps,
  ref: ForwardedRef<TextInput>,
) {
  return (
    <View className="relative">
      <Text
        className={twMerge(
          "text-md font-semibold",
          error.length > 0 && "!text-app-danger",
          labelClassName,
        )}
      >
        {label}
      </Text>
      <TextInput
        ref={ref}
        className={twMerge(
          "min-h-10 border-b border-app-border text-lg/none",
          inputClassName,
        )}
        placeholderTextColor={Colors["app-text-light"]}
        clearButtonMode="while-editing"
        {...props}
      />
      {error.length > 0 && (
        <Text className="absolute bottom-0 translate-y-full text-sm mt-1 font-normal italic text-app-danger">
          {error}
        </Text>
      )}
    </View>
  );
}

export default forwardRef(Textbox);
