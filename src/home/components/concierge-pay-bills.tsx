import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SvgCssUri } from "react-native-svg";

import Text from "@/shared/components/text";
import Button from "@/shared/components/button";
import ConciergeCollapsible from "./concierge-collapsible";

interface ConciergePayBillsProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

export default function ConciergePayBills({
  scrollViewRef,
}: ConciergePayBillsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConciergeCollapsible
      title="Pay your bills with Expensify"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <View className="mt-6">
        <View className="bg-[#0065bf] mb-5 rounded-md">
          <SvgCssUri
            uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/img_fastmoney.svg"
            width="100%"
            height={180}
          />
        </View>
        <Text className="mb-8 text-base">
          Track, approve, and pay bills with Expensify. Just add your company
          email to your account so suppliers can send bills to
          example.com@expensify.cash and SmartScan will take care of the rest.
        </Text>

        <Button label="Got it" onPress={() => setIsOpen((prev) => !prev)} />
      </View>
    </ConciergeCollapsible>
  );
}
