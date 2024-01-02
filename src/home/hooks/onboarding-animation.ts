import { useEffect } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useOnboardingAnimation() {
  const logoY = useSharedValue(140);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(logoY.value, [0, 140], [1, 0]),
      transform: [{ translateY: logoY.value }],
    };
  });

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(logoY.value, [80, 0], [30, 0]) }],
    };
  });

  useEffect(() => {
    logoY.value = withTiming(0, { duration: 1000 });
  }, [logoY]);

  return { logoStyle, boxStyle };
}
