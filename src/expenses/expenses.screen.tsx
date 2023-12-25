import { View } from "react-native";
import { SvgCssUri } from "react-native-svg";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Button from "@/shared/components/button";

export default function Expenses() {
  return (
    <ScreenWrapper>
      <View className="mx-3 mt-3 px-10 pb-10 bg-white shadow-md shadow-app-border rounded-md items-center">
        <SvgCssUri
          uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/emptystate__expenses.svg"
          width={200}
          height={180}
        />
        <Text className="text-xl font-semibold">Create your first expense</Text>
        <Text className="text-center text-base mt-3 mb-10">
          Tap the button below and we will take care of everything else
        </Text>

        <Button label="Create Expense" onPress={() => {}} />
      </View>
    </ScreenWrapper>
  );
}
