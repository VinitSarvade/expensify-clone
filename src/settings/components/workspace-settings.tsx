import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useShallow } from "zustand/react/shallow";

import Text from "@/shared/components/text";
import Colors from "@/shared/constants/Colors";
import { useUser } from "@/shared/store/user";
import Currencies from "@assets/currencies.json";
import ListGroup from "./list-group";
import ListItem from "./list-item";
export default function WorkspaceSettings() {
  const [firstName, preferences] = useUser(
    useShallow((store) => [store.firstName, store.preferences]),
  );

  const selectedCurrency = preferences?.defaultCurrency
    ? Currencies[preferences.defaultCurrency as keyof typeof Currencies]
    : null;

  return (
    <>
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
            <Text className="text-sm text-app-text-light">25 Smart Scans</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors["app-text-light"]}
            />
          </View>
        </ListItem>
      </ListGroup>
    </>
  );
}
