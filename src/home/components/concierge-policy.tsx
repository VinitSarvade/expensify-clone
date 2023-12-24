import { Fragment, useState } from "react";
import { View, Dimensions, Pressable } from "react-native";
import { SvgCssUri, SvgFromUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

import Colors from "@/shared/constants/Colors";
import Text from "@/shared/components/text";
import ConciergeCollapsible from "./concierge-collapsible";

const { width } = Dimensions.get("screen");

const cardWidth = Math.floor(width / 2 - 30);

enum ConciergeTypes {
  IndividualTrack = "individual-track",
  IndividualSubmit = "individual-submit",
  GroupCollect = "group-collect",
  GroupControl = "group-control",
}

const conciergeOptions = [
  {
    title: "For Individuals",
    options: [
      {
        id: ConciergeTypes.IndividualTrack,
        title: "Track",
        description: "Track receipts for tax and personal expenses",
        icon: "https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__piggybank.svg",
        onPress: () => {},
      },
      {
        id: ConciergeTypes.IndividualSubmit,
        title: "Submit",
        description: "Send expenses to anyone",
        icon: "https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__sendmoney.svg",
        onPress: () => {},
      },
    ],
  },
  {
    title: "For Groups",
    options: [
      {
        id: ConciergeTypes.GroupCollect,
        title: "Collect",
        description: "Collect receipts from your team or clients",
        icon: "https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__mailbox.svg",
        onPress: () => {},
      },
      {
        id: ConciergeTypes.GroupControl,
        title: "Control",
        description: "Control company spends and manage expenses",
        icon: "https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__shield.svg",
        onPress: () => {},
      },
    ],
  },
];

export default function ConciergePolicy() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState(ConciergeTypes.IndividualTrack);

  return (
    <ConciergeCollapsible
      title="Welcome back! What would you like to configure your policy to do?"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <View className="mt-6">
        <Text className="text-base">
          Welcome back! What would you like to configure your policy to do?
        </Text>

        {conciergeOptions.map((option) => (
          <Fragment key={option.title}>
            <Text className="mt-6 mb-3 text-sm text-app-text-light">
              {option.title}
            </Text>
            <View className="flex-row gap-3">
              {option.options.map((opt) => {
                const isSelected = selected === opt.id;
                const Component = isSelected ? SvgCssUri : SvgFromUri;

                return (
                  <Pressable
                    key={opt.id}
                    className={twMerge(
                      "p-5 rounded-xl border border-app-border items-center",
                      `w-[${cardWidth}px]`,
                      isSelected ? "" : "opacity-50",
                    )}
                    style={{ width: cardWidth }}
                    onPress={() => setSelected(opt.id)}
                  >
                    <View className="h-[80px]">
                      <Component
                        uri={opt.icon}
                        width={70}
                        height={70}
                        fill={Colors["app-text-light"]}
                        stroke={Colors["app-text"]}
                      />
                    </View>
                    <Text className="font-semibold mt-2 mb-1">{opt.title}</Text>
                    <Text className="text-xs text-center">
                      {opt.description}
                    </Text>

                    {isSelected && (
                      <View className="absolute top-2 right-2">
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={Colors["app-primary"]}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Fragment>
        ))}
      </View>
    </ConciergeCollapsible>
  );
}
