import { Switch, View } from "react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useShallow } from "zustand/react/shallow";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { z } from "zod";

import ScreenWrapper from "@/shared/components/screen-wrapper";
import Text from "@/shared/components/text";
import Textbox from "@/shared/components/textbox";
import Button from "@/shared/components/button";
import { useUser } from "@/shared/store/user";
import Colors from "@/shared/constants/Colors";
import ProfilePic from "@/shared/components/profile-pic";
import { useExpenses } from "@/shared/store/expenses";

const validation = {
  merchant: { onChange: z.string().min(1, "Merchant is required") },
  date: { onChange: z.date({ required_error: "Date is required" }) },
  amount: {
    onChange: z.coerce
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Please enter a valid amount",
      })
      .gt(0, "Amount must be greater than 0"),
  },
};

export default function AddExpenseScreen() {
  const [firstName, lastName, profilePic] = useUser(
    useShallow((store) => [store.firstName, store.lastName, store.profilePic]),
  );
  const addExpense = useExpenses(useShallow((store) => store.addExpense));

  const form = useForm({
    defaultValues: {
      merchant: "",
      date: new Date(),
      amount: 0,
      description: "",
      reimbursable: false,
    },
    onSubmit: ({ value }) => {
      addExpense(value);
      router.replace("/(tabs)/expenses");
    },
    validatorAdapter: zodValidator,
  });

  return (
    <ScreenWrapper>
      <View className="bg-white mx-3 mt-4 p-4 shadow-lg shadow-app-border rounded-md gap-5">
        <form.Provider>
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-2">
              <ProfilePic
                source={profilePic}
                imageClassName="w-10 h-10"
                iconSize={28}
              />

              <Text className="text-base font-semibold">{`${firstName} ${lastName}`}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="cash-multiple"
                size={20}
                color={Colors["app-text-light"]}
              />
              <Text className="text-base text-app-text-light font-semibold">
                Cash
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <form.Field name="merchant" validators={validation.merchant}>
                {({ state: { value, meta }, handleChange, handleBlur }) => (
                  <>
                    <Textbox
                      label="Merchant"
                      labelClassName={
                        meta.touchedErrors.length > 0 ? "text-app-danger" : ""
                      }
                      value={value}
                      onChangeText={handleChange}
                      onBlur={handleBlur}
                      error={meta.touchedErrors}
                    />
                  </>
                )}
              </form.Field>
            </View>
            <View className="border border-app-border justify-center px-4 rounded-md">
              <Ionicons
                name="receipt-outline"
                size={20}
                color={Colors["app-text-light"]}
              />
            </View>
          </View>

          <form.Field name="date" validators={validation.date}>
            {({ state: { value, meta }, handleChange }) => (
              <View className="flex-row items-center">
                <Text className="text-base">Date:</Text>
                <DateTimePicker
                  value={value}
                  mode={"date"}
                  onChange={(_, date) => date && handleChange(date)}
                  accentColor={Colors["app-secondary"]}
                />
                {meta.touchedErrors.length > 0 && (
                  <Text className="text-sm mt-1 font-normal italic text-app-danger">
                    {meta.touchedErrors}
                  </Text>
                )}
              </View>
            )}
          </form.Field>

          <form.Field name="amount" validators={validation.amount}>
            {({ state: { value, meta }, handleChange, handleBlur }) => (
              <Textbox
                label="Amount"
                value={value.toString()}
                onChangeText={(val) => handleChange(Number(val))}
                onBlur={handleBlur}
                error={meta.touchedErrors}
              />
            )}
          </form.Field>

          <form.Field name="description">
            {({ state: { value }, handleChange, handleBlur }) => (
              <Textbox
                label="Description"
                numberOfLines={3}
                multiline
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur}
              />
            )}
          </form.Field>

          <View className="flex-row justify-between">
            <Text>Reimbursable</Text>
            <form.Field name="reimbursable">
              {({ state: { value }, handleChange }) => (
                <Switch
                  trackColor={{ true: Colors["app-primary"] }}
                  value={value}
                  onValueChange={handleChange}
                />
              )}
            </form.Field>
          </View>

          <Button label="Save" onPress={form.handleSubmit} />
        </form.Provider>
      </View>
    </ScreenWrapper>
  );
}
