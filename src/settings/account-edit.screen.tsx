import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useShallow } from "zustand/react/shallow";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { router } from "expo-router";

import ScreenWrapper from "@/shared/components/screen-wrapper";
import Textbox from "@/shared/components/textbox";
import ProfilePic from "@/shared/components/profile-pic";
import Button from "@/shared/components/button";
import { useUser } from "@/shared/store/user";

const validation = {
  firstName: { onChange: z.string().min(1, "First name is required") },
  lastName: { onChange: z.string().min(1, "Last name is required") },
};

export default function AccountEditScreen() {
  const [firstName, lastName, profilePic, setUser] = useUser(
    useShallow((store) => [
      store.firstName,
      store.lastName,
      store.profilePic,
      store.setUser,
    ]),
  );
  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      profilePic,
    },
    onSubmit: ({ value }) => {
      setUser(value);
      router.back();
    },
    validatorAdapter: zodValidator,
  });

  const source = profilePic ? { uri: profilePic } : undefined;

  return (
    <ScreenWrapper scrollEnabled={false}>
      <form.Provider>
        <Animated.View entering={FadeInRight.delay(100)}>
          <form.Field name="profilePic">
            {({ handleChange }) => (
              <ProfilePic source={source} editable onChange={handleChange} />
            )}
          </form.Field>
        </Animated.View>

        <View className="mt-8 px-3 gap-6">
          <Animated.View entering={FadeInRight.delay(150)}>
            <form.Field name="firstName" validators={validation.firstName}>
              {({ state: { value }, handleBlur, handleChange }) => (
                <Textbox
                  label="First name"
                  value={value}
                  onBlur={handleBlur}
                  onChangeText={handleChange}
                />
              )}
            </form.Field>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(200)}>
            <form.Field name="lastName" validators={validation.firstName}>
              {({ state: { value }, handleBlur, handleChange }) => (
                <Textbox
                  label="Last name"
                  value={value}
                  onBlur={handleBlur}
                  onChangeText={handleChange}
                />
              )}
            </form.Field>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(250)}>
            <Button label="Save" onPress={form.handleSubmit} />
          </Animated.View>
        </View>
      </form.Provider>
    </ScreenWrapper>
  );
}
