import { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

import Text from "@/shared/components/text";
import SearchInput from "@/shared/components/search-input";
import Categories from "@assets/categories.json";

export default function CategoriesScreen() {
  const [searchText, setSearchText] = useState("");
  const filteredCategories =
    searchText.length === 0
      ? Categories
      : Categories.filter((cat) =>
          cat.toLowerCase().includes(searchText.toLowerCase()),
        );

  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      <View className="flex-1 px-3">
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          enterKeyHint="search"
        />

        {filteredCategories.length === 0 && (
          <View className="flex-1 mt-36 items-center">
            <Text className="text-xl font-semibold">No Results</Text>
          </View>
        )}

        {filteredCategories.length > 0 && (
          <FlashList
            data={filteredCategories}
            keyExtractor={(_, index) => index.toString()}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInRight.delay(25 * index)}>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-3 border-b border-app-border"
                  activeOpacity={0.5}
                >
                  <Text className="">{item}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
