import { useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Colors from "@/shared/constants/Colors";

import ListGroup from "./components/list-group";
import ListItem from "./components/list-item";

export default function Settings() {
  const [twoFA, setTwoFA] = useState(false);
  const [offline, setOffline] = useState(false);
  const [alerts, setAlerts] = useState(false);

  return (
    <ScreenWrapper className="px-3">
      <Link href="/(settings)/profile" asChild>
        <TouchableOpacity className="items-center gap-1" activeOpacity={0.7}>
          <Ionicons
            name="person-circle-outline"
            size={98}
            color={Colors["app-text"]}
          />
          <View className="flex-row items-center gap-3 ml-5">
            <Text className="text-2xl">Vinit Sarvade</Text>
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

      <Text className="text-sm font-semibold mt-8 mb-3">Your Account</Text>
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
            value={twoFA}
            onValueChange={setTwoFA}
          />
        </ListItem>
      </ListGroup>

      <View className="flex-row justify-between mt-8 mb-3">
        <Text className="text-sm font-semibold">Workspaces</Text>
        <View className="flex-row items-center">
          <Text className="text-xs text-blue-500">View All</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={12}
            color={"rgb(59,130,246)"}
          />
        </View>
      </View>

      <ListGroup>
        <ListItem className="h-24 flex-col justify-center items-start">
          <Text className="text-lg">
            Vinit's Expenses &nbsp;
            <Text className="text-sm">(Default Workspace)</Text>
          </Text>
          <Text className="text-sm text-app-text-light">
            Your default workspace determines your currency, categories, and
            more.
          </Text>
        </ListItem>

        <ListItem>
          <Text>Report Currency</Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-app-text-light">INR &#8377;</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </View>
        </ListItem>

        <ListItem>
          <Text>Categories</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color={Colors["app-text-light"]}
          />
        </ListItem>

        <ListItem className="border-b-0">
          <Text>Free Trial</Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-app-text-light">25 Smart Scans</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </View>
        </ListItem>
      </ListGroup>

      <Text className="text-sm font-semibold mt-8 mb-3">Others</Text>
      <ListGroup>
        <ListItem>
          <Text>Offline Mode</Text>
          <Switch
            trackColor={{ true: Colors["app-primary"] }}
            value={offline}
            onValueChange={setOffline}
          />
        </ListItem>

        <ListItem>
          <Text>Receive realtime alerts</Text>
          <Switch
            trackColor={{ true: Colors["app-primary"] }}
            value={alerts}
            onValueChange={setAlerts}
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
