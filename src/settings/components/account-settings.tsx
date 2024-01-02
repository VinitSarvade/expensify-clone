import { View, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useShallow } from "zustand/react/shallow";

import Colors from "@/shared/constants/Colors";
import { useUser } from "@/shared/store/user";
import Text from "@/shared/components/text";
import ListGroup from "./list-group";
import ListItem from "./list-item";

export default function AccountSettings() {
  const [preferences, toggleTwoFactor] = useUser(
    useShallow((store) => [store.preferences, store.toggleTwoFactor]),
  );

  return (
    <>
      <Text className="text-md font-semibold mt-8 mb-3">Your Account</Text>
      <ListGroup>
        <ListItem>
          <Text>Import a Card</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color={Colors["app-text-light"]}
          />
        </ListItem>

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
    </>
  );
}
