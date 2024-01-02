import { Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useShallow } from "zustand/react/shallow";

import Text from "@/shared/components/text";
import Colors from "@/shared/constants/Colors";
import { useUser } from "@/shared/store/user";
import ListGroup from "./list-group";
import ListItem from "./list-item";

export default function OtherSettings() {
  const [preferences, toggleOfflineMode, toggleRealtimeAlerts] = useUser(
    useShallow((store) => [
      store.preferences,
      store.toggleOfflineMode,
      store.toggleRealtimeAlerts,
    ]),
  );

  return (
    <>
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
    </>
  );
}
