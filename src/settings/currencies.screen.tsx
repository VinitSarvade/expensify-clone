import { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Text from "@/shared/components/text";
import SearchInput from "@/shared/components/search-input";
import Currencies from "@assets/currencies.json";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const currenciesList = Object.values(Currencies);

export default function CurrenciesScreen() {
  const [searchText, setSearchText] = useState("");
  const filteredCurrencies =
    searchText.length === 0
      ? currenciesList
      : currenciesList.filter(
          (currency) =>
            currency.name.toLowerCase().includes(searchText.toLowerCase()) ||
            currency.code.toLowerCase().includes(searchText.toLowerCase()),
        );

  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      <View className="flex-1 px-3">
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          enterKeyHint="search"
        />

        {filteredCurrencies.length === 0 && (
          <View className="flex-1 mt-36 items-center">
            <Text className="text-xl font-semibold">No Results</Text>
          </View>
        )}

        {filteredCurrencies.length > 0 && (
          <FlashList
            data={filteredCurrencies}
            keyExtractor={(item) => item.code}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInRight.delay(25 * index)}>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-3 border-b border-app-border"
                  activeOpacity={0.5}
                >
                  <View className="flex-row gap-4 items-center">
                    <View className="bg-app-border px-2 py-1 rounded-lg w-16 items-center">
                      <Text className="font-semibold">{item.symbol}</Text>
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                  <Text className="font-semibold">{item.code}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
