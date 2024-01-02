import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useShallow } from "zustand/react/shallow";
import { router } from "expo-router";

import ScreenWrapper from "@/shared/components/screen-wrapper";
import Textbox from "@/shared/components/textbox";
import ProfilePic from "@/shared/components/profile-pic";
import Button from "@/shared/components/button";
import { useUser } from "@/shared/store/user";
import {
  useAccountEditForm,
  AccountEditFormValues,
} from "./hooks/account-edit-form";

export default function AccountEditScreen() {
  const [profilePic, setUser] = useUser(
    useShallow((store) => [store.profilePic, store.setUser]),
  );
  const onSubmit = (values: AccountEditFormValues) => {
    setUser(values);
    router.back();
  };

  const { form, validation } = useAccountEditForm(onSubmit);

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

        <View className="mt-8 px-3 gap-8">
          <Animated.View entering={FadeInRight.delay(150)}>
            <form.Field name="firstName" validators={validation.firstName}>
              {({ state: { value, meta }, handleBlur, handleChange }) => (
                <Textbox
                  label="First name"
                  value={value}
                  onBlur={handleBlur}
                  onChangeText={handleChange}
                  error={meta.touchedErrors}
                />
              )}
            </form.Field>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(200)}>
            <form.Field name="lastName" validators={validation.firstName}>
              {({ state: { value, meta }, handleBlur, handleChange }) => (
                <Textbox
                  label="Last name"
                  value={value}
                  onBlur={handleBlur}
                  onChangeText={handleChange}
                  error={meta.touchedErrors}
                />
              )}
            </form.Field>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(250)} className="mt-3">
            <Button label="Save" onPress={form.handleSubmit} />
          </Animated.View>
        </View>
      </form.Provider>
    </ScreenWrapper>
  );
}
