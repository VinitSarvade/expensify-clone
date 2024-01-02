import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SvgCssUri } from "react-native-svg";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useShallow } from "zustand/react/shallow";
import { router } from "expo-router";

import Colors from "@/shared/constants/Colors";
import Textbox from "@/shared/components/textbox";
import Button from "@/shared/components/button";
import { useUser } from "@/shared/store/user";
import { useOnboardingAnimation } from "./hooks/onboarding-animation";
import { useOnboardingForm, OnBoardingForm } from "./hooks/onboarding-form";

export default function Onboarding() {
  const setUser = useUser(useShallow((store) => store.setUser));
  const { logoStyle } = useOnboardingAnimation();

  const onSubmit = (values: OnBoardingForm) => {
    setUser(values);
    router.replace("/(tabs)/home");
  };

  const { form, validations } = useOnboardingForm(onSubmit);

  return (
    <SafeAreaView className="flex-1 bg-app-drawer-bg">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 items-center px-10 justify-center"
      >
        <Animated.View style={logoStyle}>
          <SvgCssUri
            uri="https://static1.squarespace.com/static/ta/577c006b725e25e0affed0c1/2551/assets/img/expensify-wordmark.svg"
            width={200}
            height={100}
            className="mb-5"
          />
        </Animated.View>

        <form.Provider>
          <View className="w-full gap-8">
            <Animated.View entering={FadeInRight.duration(600).delay(500)}>
              <form.Field name="firstName" validators={validations.firstName}>
                {({ state: { value, meta }, handleChange }) => (
                  <Textbox
                    label="First Name"
                    labelClassName="text-white"
                    inputClassName="text-white"
                    cursorColor={Colors["app-bg"]}
                    selectionColor={Colors["app-bg"]}
                    value={value}
                    onChangeText={handleChange}
                    error={meta.touchedErrors}
                  />
                )}
              </form.Field>
            </Animated.View>

            <Animated.View entering={FadeInRight.duration(600).delay(600)}>
              <form.Field name="lastName" validators={validations.lastName}>
                {({ state: { value, meta }, handleChange }) => (
                  <Textbox
                    label="Last Name"
                    labelClassName="text-white"
                    inputClassName="text-white"
                    cursorColor={Colors["app-bg"]}
                    selectionColor={Colors["app-bg"]}
                    value={value}
                    onChangeText={handleChange}
                    error={meta.touchedErrors}
                  />
                )}
              </form.Field>
            </Animated.View>

            <Animated.View entering={FadeInRight.duration(600).delay(700)}>
              <form.Field name="email" validators={validations.email}>
                {({ state: { value, meta }, handleChange, handleBlur }) => (
                  <Textbox
                    label="Email"
                    labelClassName="text-white"
                    inputClassName="text-white"
                    cursorColor={Colors["app-bg"]}
                    selectionColor={Colors["app-bg"]}
                    value={value}
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    error={meta.touchedErrors}
                    keyboardType="email-address"
                    inputMode="email"
                  />
                )}
              </form.Field>
            </Animated.View>

            <Animated.View entering={FadeInRight.duration(600).delay(800)}>
              <Button
                containerClassName="mt-5"
                label="Sign Up"
                onPress={form.handleSubmit}
              />
            </Animated.View>
          </View>
        </form.Provider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
