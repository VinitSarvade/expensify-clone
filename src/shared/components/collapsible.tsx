import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  WithTimingConfig,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Collapsible({
  children,
  expanded,
  config,
}: {
  children: React.ReactNode;
  expanded: boolean;
  config?: WithTimingConfig;
}) {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsibleStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded
      ? withTiming(height, config)
      : withTiming(0, config);

    animatedOpacity.value = expanded
      ? withTiming(1, config)
      : withTiming(0, config);

    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={collapsibleStyle} className="overflow-hidden">
      <View className="w-full absolute" onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
}
