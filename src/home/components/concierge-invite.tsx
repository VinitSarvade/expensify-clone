import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, Share, View } from "react-native";
import { SvgCssUri } from "react-native-svg";

import Text from "@/shared/components/text";
import Button from "@/shared/components/button";
import ConciergeCollapsible from "./concierge-collapsible";

interface ConciergeInviteProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

export default function ConciergeInvite({
  scrollViewRef,
}: ConciergeInviteProps) {
  const collapsibleRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onInvite = useCallback(async () => {
    try {
      await Share.share({
        title: "Hey! Join me on Expensify!",
        message:
          "Hey! Join me on Expensify! \nhttps://join.my.expensify.com/?thanks=vinit.sarvade.08@gmail.com",
        url: "https://join.my.expensify.com/?thanks=vinit.sarvade.08@gmail.com",
      });
    } catch (error: unknown) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      Alert.alert((error as any).message);
    }
  }, []);

  return (
    <ConciergeCollapsible
      title="The more the merrier - invite others to Expensify!"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      ref={collapsibleRef}
    >
      <View className="mt-6">
        <Text className="text-base">
          The more the merrier - invite others to Expensify!
        </Text>

        <SvgCssUri
          uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/emptystate__invite.svg"
          width="100%"
          height={180}
        />

        <Button label="Invite" onPress={onInvite} />
      </View>
    </ConciergeCollapsible>
  );
}
