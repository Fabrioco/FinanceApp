import { useState } from "react";
import Container from "@/src/components/Container";

import { OnBoardingStepOne } from "@/src/components/onBoarding/OnBoardingStepOne";
import { OnBoardingStepTwo } from "@/src/components/onBoarding/OnBoardingStepTwo";
import { OnBoardingStepThree } from "@/src/components/onBoarding/OnBoardingStepThree";

export default function OnBoarding() {
  const [step, setStep] = useState(1);

  return (
    <Container>
      {step === 1 && <OnBoardingStepOne onNext={() => setStep(2)} />}

      {step === 2 && (
        <OnBoardingStepTwo
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && <OnBoardingStepThree />}
    </Container>
  );
}
