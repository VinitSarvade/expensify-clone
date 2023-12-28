import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

import ScreenWrapper from "@/shared/components/screen-wrapper";
import Textbox from "@/shared/components/textbox";
import ProfilePic from "@/shared/components/profile-pic";
import Button from "@/shared/components/button";

export default function AccountEditScreen() {
  return (
    <ScreenWrapper scrollEnabled={false}>
      <Animated.View entering={FadeInRight.delay(100)}>
        <ProfilePic editable />
      </Animated.View>

      <View className="mt-8 px-3 gap-6">
        <Animated.View entering={FadeInRight.delay(150)}>
          <Textbox label="First name" value="Vinit" />
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(200)}>
          <Textbox label="Last name" value="Sarvade" />
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(250)}>
          <Button label="Save" onPress={() => {}} />
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
}
