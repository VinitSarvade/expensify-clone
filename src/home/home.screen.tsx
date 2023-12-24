import { useRef } from "react";
import { ScrollView } from "react-native";

import ScreenWrapper from "@/shared/components/screen-wrapper";
import ConciergePolicy from "./components/concierge-policy";
import ConciergePayBills from "./components/concierge-pay-bills";
import ConciergeInvite from "./components/concierge-invite";

export default function Home() {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScreenWrapper
      className="px-3"
      contentContainerStyle={{ paddingBottom: 24 }}
      ref={scrollViewRef}
    >
      <ConciergePolicy scrollViewRef={scrollViewRef} />
      <ConciergePayBills scrollViewRef={scrollViewRef} />
      <ConciergeInvite scrollViewRef={scrollViewRef} />
    </ScreenWrapper>
  );
}
