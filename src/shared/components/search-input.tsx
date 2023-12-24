import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

import Colors from "../constants/Colors";

interface SearchInputProps extends Omit<TextInputProps, "className"> {
  containerClassName?: string;
  inputClassName?: string;
}

export default function SearchInput({
  containerClassName,
  inputClassName,
  ...props
}: SearchInputProps) {
  return (
    <View
      className={twMerge(
        "bg-white rounded-md flex-row items-center px-2 border border-app-border",
        containerClassName,
      )}
    >
      <Ionicons
        name="search-outline"
        size={18}
        color={Colors["app-text-light"]}
      />
      <TextInput
        className={twMerge("px-2 py-3 flex-grow", inputClassName)}
        placeholder="Search"
        clearButtonMode="always"
        placeholderTextColor={Colors["app-text-light"]}
        {...props}
      />
    </View>
  );
}
