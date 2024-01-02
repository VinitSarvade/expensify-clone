import { TouchableOpacity, View } from "react-native";
import { SvgCssUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Colors from "@/shared/constants/Colors";
import { useEffect, useState } from "react";

const EMAIL = "receipts@expensify.com";

export default function Trips() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(EMAIL);
    setCopied(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(setCopied, 1000, false);
    }

    () => clearTimeout(timeout);
  }, [copied]);

  return (
    <ScreenWrapper>
      <View className="mx-3 mt-3 px-10 pb-14 bg-white shadow-md shadow-app-border rounded-md items-center">
        <SvgCssUri
          uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/simple-illustration__plane.svg"
          width={140}
          height={180}
        />
        <Text className="text-xl font-semibold">Forward your trips</Text>
        <Text className="text-center text-base mt-3">
          Let us help by forwarding your trips to
        </Text>
        <TouchableOpacity
          className="flex-row gap-2 mt-3 px-3 py-2 bg-app-bg rounded-md border border-app-border"
          activeOpacity={0.75}
          onPress={copyToClipboard}
        >
          <Text className="font-bold">{EMAIL}</Text>
          <Ionicons name="copy-outline" size={24} color={Colors["app-text"]} />
        </TouchableOpacity>
        {copied && (
          <Animated.Text
            entering={FadeInUp}
            exiting={FadeOutUp}
            className="text-center text-base absolute bottom-6"
          >
            Copied!
          </Animated.Text>
        )}
      </View>
    </ScreenWrapper>
  );
}
