import { Animated, View } from "react-native";

  export const renderBar = (progress: Animated.Value) => (
    <View className="flex-1 h-2 bg-gray-400/40 rounded-full overflow-hidden">
      <Animated.View
        className="h-full bg-blue-500 rounded-full"
        style={{
          transform: [{ scaleX: progress }],
          transformOrigin: "left",
        }}
      />
    </View>
  );