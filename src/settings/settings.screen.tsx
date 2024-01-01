import { Switch, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Link } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useShallow } from "zustand/react/shallow";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Colors from "@/shared/constants/Colors";
import ProfilePic from "@/shared/components/profile-pic";
import { useUser } from "@/shared/store/user";
import Currencies from "@assets/currencies.json";
import ListGroup from "./components/list-group";
import ListItem from "./components/list-item";

export default function Settings() {
  const [
    firstName,
    lastName,
    profilePic,
    preferences,
    toggleOfflineMode,
    toggleRealtimeAlerts,
    toggleTwoFactor,
  ] = useUser(
    useShallow((store) => [
      store.firstName,
      store.lastName,
      store.profilePic,
      store.preferences,
      store.toggleOfflineMode,
      store.toggleRealtimeAlerts,
      store.toggleTwoFactor,
    ]),
  );

  const selectedCurrency = preferences?.defaultCurrency
    ? Currencies[preferences.defaultCurrency as keyof typeof Currencies]
    : null;

  return (
    <ScreenWrapper className="px-3">
      <Animated.View entering={FadeInRight}>
        <Link href="/(settings)/profile" asChild>
          <TouchableOpacity className="items-center gap-1" activeOpacity={0.7}>
            <ProfilePic source={profilePic} />

            <View className="flex-row items-center gap-3 ml-5">
              <Text className="text-2xl">{`${firstName} ${lastName}`}</Text>
              <FontAwesome5
                name="pencil-alt"
                size={18}
                color={Colors["app-text"]}
              />
            </View>
            <Text className="text-app-text-light text-sm">
              vinit.sarvade.08@gmail.com
            </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeInRight.delay(50)}>
        <Text className="text-md font-semibold mt-8 mb-3">Your Account</Text>
        <ListGroup>
          <Link href="/(settings)/import-card" asChild>
            <ListItem>
              <Text>Import a Card</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={Colors["app-text-light"]}
              />
            </ListItem>
          </Link>

          <ListItem>
            <Text>Reimbursement</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-app-text-light">
                Add personal bank account
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={Colors["app-text-light"]}
              />
            </View>
          </ListItem>

          <ListItem className="border-b-0">
            <Text>Two Factor Authentication</Text>
            <Switch
              trackColor={{ true: Colors["app-primary"] }}
              value={preferences?.twoFactor}
              onValueChange={toggleTwoFactor}
            />
          </ListItem>
        </ListGroup>
      </Animated.View>

      <Animated.View entering={FadeInRight.delay(100)}>
        <View className="flex-row justify-between mt-8 mb-3">
          <Text className="text-md font-semibold">Workspaces</Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-blue-500">View All</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={12}
              color={"rgb(59,130,246)"}
            />
          </View>
        </View>

        <ListGroup>
          <ListItem className="h-28 flex-col justify-center items-start">
            <Text>
              {`${firstName}'s Expenses `}
              <Text className="text-sm">(Default Workspace)</Text>
            </Text>
            <Text className="mt-1 text-md text-app-text-light">
              Your default workspace determines your currency, categories, and
              more.
            </Text>
          </ListItem>

          <Link href="/(settings)/currencies" asChild>
            <ListItem>
              <Text>Report Currency</Text>
              <View className="flex-row items-center">
                {selectedCurrency && (
                  <Text className="text-sm text-app-text-light">
                    {`${selectedCurrency.code} ${selectedCurrency.symbol}`}
                  </Text>
                )}

                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color={Colors["app-text-light"]}
                />
              </View>
            </ListItem>
          </Link>

          <Link href="/(settings)/categories" asChild>
            <ListItem>
              <Text>Categories</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={Colors["app-text-light"]}
              />
            </ListItem>
          </Link>

          <ListItem className="border-b-0">
            <Text>Free Trial</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-app-text-light">
                25 Smart Scans
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={Colors["app-text-light"]}
              />
            </View>
          </ListItem>
        </ListGroup>
      </Animated.View>

      <Animated.View entering={FadeInRight.delay(150)}>
        <Text className="text-md font-semibold mt-8 mb-3">Others</Text>
        <ListGroup>
          <ListItem>
            <Text>Offline Mode</Text>
            <Switch
              trackColor={{ true: Colors["app-primary"] }}
              value={preferences?.offlineMode}
              onValueChange={toggleOfflineMode}
            />
          </ListItem>

          <ListItem>
            <Text>Receive realtime alerts</Text>
            <Switch
              trackColor={{ true: Colors["app-primary"] }}
              value={preferences?.realtimeAlerts}
              onValueChange={toggleRealtimeAlerts}
            />
          </ListItem>

          <ListItem>
            <Text>Privacy Policy</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </ListItem>

          <ListItem>
            <Text>Help and Feedback</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </ListItem>

          <ListItem className="border-b-0">
            <Text>Refer a friend, earn cash!</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </ListItem>
        </ListGroup>
      </Animated.View>

      <TouchableOpacity className="mt-8 bg-white rounded-md shadow-md shadow-app-border px-3 h-14 flex-row justify-between items-center">
        <Text className="text-app-primary">Sync Account</Text>
        <Ionicons
          name="sync-outline"
          size={18}
          color={Colors["app-text-light"]}
        />
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 bg-white rounded-md shadow-md shadow-app-border px-3 h-14 flex-row justify-between items-center">
        <Text className="text-app-secondary">Sign Out</Text>
        <Ionicons
          name="log-out-outline"
          size={18}
          color={Colors["app-text-light"]}
        />
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 mb-8 bg-white rounded-md shadow-md shadow-app-border px-3 h-14 flex-row justify-between items-center">
        <Text className="text-app-danger">Close Account</Text>
        <Ionicons
          name="trash-outline"
          size={18}
          color={Colors["app-text-light"]}
        />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
