import ScreenWrapper from "@/shared/components/screen-wrapper";
import ConciergePolicy from "./components/concierge-policy";
import ConciergePayBills from "./components/concierge-pay-bills";
import ConciergeInvite from "./components/concierge-invite";

export default function Home() {
  return (
    <ScreenWrapper
      className="px-3"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <ConciergePolicy />
      <ConciergePayBills />
      <ConciergeInvite />
    </ScreenWrapper>
  );
}
