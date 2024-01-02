import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useShallow } from "zustand/react/shallow";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Colors from "@/shared/constants/Colors";
import ProfilePic from "@/shared/components/profile-pic";
import { useUser } from "@/shared/store/user";
import AccountSettings from "./components/account-settings";
import WorkspaceSettings from "./components/workspace-settings";
import OtherSettings from "./components/other-settings";
import Actions from "./components/actions";

export default function Settings() {
  const [firstName, lastName, email, profilePic] = useUser(
    useShallow((store) => [
      store.firstName,
      store.lastName,
      store.email,
      store.profilePic,
    ]),
  );

  return (
    <ScreenWrapper>
      <View className="px-3">
        <Animated.View entering={FadeInRight}>
          <Link href="/(settings)/profile" asChild>
            <TouchableOpacity
              className="items-center gap-1"
              activeOpacity={0.7}
            >
              <ProfilePic source={profilePic} />

              <View className="flex-row items-center gap-3 ml-5">
                <Text className="text-2xl">{`${firstName} ${lastName}`}</Text>
                <FontAwesome5
                  name="pencil-alt"
                  size={18}
                  color={Colors["app-text"]}
                />
              </View>
              <Text className="text-app-text-light text-sm">{email}</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(50)}>
          <AccountSettings />
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(100)}>
          <WorkspaceSettings />
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(150)}>
          <OtherSettings />
        </Animated.View>

        <Actions />
      </View>
    </ScreenWrapper>
  );
}
