import { View } from "react-native";
import { SvgCssUri } from "react-native-svg";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useShallow } from "zustand/react/shallow";

import Text from "@/shared/components/text";
import ScreenWrapper from "@/shared/components/screen-wrapper";
import Button from "@/shared/components/button";
import { useExpenses } from "@/shared/store/expenses";
import Colors from "@/shared/constants/Colors";
import { useUser } from "@/shared/store/user";

export default function Expenses() {
  const currencyCode = useUser(
    useShallow((store) => store.preferences?.defaultCurrency),
  );
  const expenses = useExpenses(useShallow((store) => store.expenses));

  return (
    <ScreenWrapper>
      {expenses.map((expense) => (
        <View
          key={expense.id}
          className="mx-3 mt-3 bg-white shadow-md shadow-app-border rounded-md flex-row items-center"
        >
          <View className="border-r-2 border-app-bg p-3">
            <Ionicons
              name="receipt-outline"
              size={32}
              color={Colors["app-text"]}
            />
          </View>
          <View className="px-3 py-2 flex-1">
            <View className="flex-row justify-between">
              <Text className="text-xl">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: currencyCode,
                }).format(expense.amount)}
                &nbsp;
                <MaterialCommunityIcons
                  size={16}
                  name="cash-multiple"
                  color={Colors["app-text-light"]}
                />
              </Text>
              <Text className="text-sm">
                {new Intl.DateTimeFormat("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(expense.date))}
              </Text>
            </View>
            <Text className="text-base font-semibold text-app-text-light mt-2">
              {expense.merchant}
            </Text>
            {expense.description && (
              <Text className="text-base font-normal text-app-text-light">
                {expense.description}
              </Text>
            )}
          </View>
        </View>
      ))}

      {expenses.length === 0 && (
        <View className="mx-3 mt-3 px-10 pb-10 bg-white shadow-md shadow-app-border rounded-md items-center">
          <SvgCssUri
            uri="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/emptystate__expenses.svg"
            width={200}
            height={180}
          />
          <Text className="text-xl font-semibold">
            Create your first expense
          </Text>
          <Text className="text-center text-base mt-3 mb-10">
            Tap the button below and we will take care of everything else
          </Text>

          <Button label="Create Expense" onPress={() => {}} />
        </View>
      )}
    </ScreenWrapper>
  );
}
