import { Dispatch, ForwardedRef, SetStateAction, forwardRef } from "react";
import { LayoutChangeEvent, Pressable, View } from "react-native";
import { SvgCssUri } from "react-native-svg";
import { Easing } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import Text from "@/shared/components/text";
import Collapsible from "@/shared/components/collapsible";
import Colors from "@/shared/constants/Colors";

interface ConciergeCollapsibleProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ConciergeCollapsible(
  { title, children, isOpen, setIsOpen }: ConciergeCollapsibleProps,
  ref: ForwardedRef<View>,
) {
  return (
    <View
      className="mt-3 p-4 pb-6 rounded-lg bg-white shadow-md shadow-app-border"
      ref={ref}
    >
      <Pressable
        className="flex-row justify-between items-center"
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View className="flex-row items-center gap-3 w-11/12">
          <SvgCssUri
            uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/avatar_concierge.svg"
            width={40}
            height={40}
          />
          <View className="gap-1 flex-grow">
            <Text className="font-semibold">Concierge</Text>
            <Collapsible
              expanded={!isOpen}
              config={{ duration: 160, easing: Easing.linear }}
            >
              <Text className="text-sm" numberOfLines={1}>
                {title}
              </Text>
            </Collapsible>
          </View>
        </View>

        {isOpen && (
          <Ionicons
            name="chevron-up-outline"
            size={20}
            color={Colors["app-text-light"]}
          />
        )}
      </Pressable>

      <Collapsible expanded={isOpen}>{children}</Collapsible>
    </View>
  );
}

export default forwardRef(ConciergeCollapsible);
