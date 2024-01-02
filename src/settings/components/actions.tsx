import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Text from "@/shared/components/text";
import Colors from "@/shared/constants/Colors";

const ACTIONS = [
  {
    title: "Sync Account",
    icon: "sync-outline" as const,
    color: "app-primary",
  },
  {
    title: "Sign Out",
    icon: "log-out-outline" as const,
    color: "app-secondary",
  },
  {
    title: "Close Account",
    icon: "trash-outline" as const,
    color: "app-danger",
  },
];

export default function Actions() {
  return ACTIONS.map(({ title, icon, color }) => (
    <TouchableOpacity
      key={title}
      className={`mt-8 bg-white rounded-md shadow-md shadow-app-border px-3 h-14 flex-row justify-between items-center ${color}`}
    >
      <Text className={`text-${color}`}>{title}</Text>
      <Ionicons name={icon} size={18} color={Colors["app-text-light"]} />
    </TouchableOpacity>
  ));
}
