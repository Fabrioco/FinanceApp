import { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import Container from "@/src/components/Container";

import { OnBoardingStepOne } from "@/src/components/onBoarding/OnBoardingStepOne";
import { OnBoardingStepTwo } from "@/src/components/onBoarding/OnBoardingStepTwo";
import { OnBoardingStepThree } from "@/src/components/onBoarding/OnBoardingStepThree";
import { renderBar } from "@/src/components/onBoarding/RenderBar";

export default function OnBoarding() {
  const [step, setStep] = useState(1);

  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress1, {
      toValue: step >= 1 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(progress2, {
      toValue: step >= 2 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(progress3, {
      toValue: step >= 3 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [step, progress1, progress2, progress3]);

  return (
    <Container>
      <View className="flex-1 flex-col items-center justify-center">
        {/* Progress */}
        <View className="absolute top-16 w-full items-center">
          <View className="flex-row gap-2 w-2/3">
            {renderBar(progress1)}
            {renderBar(progress2)}
            {renderBar(progress3)}
          </View>
        </View>

        {/* Steps */}
        {step === 1 && <OnBoardingStepOne onNext={() => setStep(2)} />}

        {step === 2 && (
          <OnBoardingStepTwo
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && <OnBoardingStepThree />}
      </View>
    </Container>
  );
}
