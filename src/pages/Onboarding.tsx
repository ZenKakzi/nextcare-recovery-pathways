
import { useState } from "react";
import Layout from "@/components/common/Layout";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import BasicInfoForm from "@/components/onboarding/BasicInfoForm";
import MedicalConditionsForm from "@/components/onboarding/MedicalConditionsForm";
import HospitalizationHistoryForm from "@/components/onboarding/HospitalizationHistoryForm";
import LifestyleForm from "@/components/onboarding/LifestyleForm";
import OnboardingComplete from "@/components/onboarding/OnboardingComplete";

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    basicInfo: {},
    medicalConditions: {},
    hospitalizationHistory: {},
    lifestyle: {},
  });

  const handleNext = (data: any) => {
    switch (currentStep) {
      case 1:
        setUserData(prev => ({ ...prev, basicInfo: data }));
        break;
      case 2:
        setUserData(prev => ({ ...prev, medicalConditions: data }));
        break;
      case 3:
        setUserData(prev => ({ ...prev, hospitalizationHistory: data }));
        break;
      case 4:
        setUserData(prev => ({ ...prev, lifestyle: data }));
        break;
      default:
        break;
    }
    
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm onNext={handleNext} />;
      case 2:
        return <MedicalConditionsForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <HospitalizationHistoryForm onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <LifestyleForm onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <OnboardingComplete />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="nextcare-container py-12">
        <div className="max-w-3xl mx-auto">
          {currentStep < TOTAL_STEPS && (
            <div className="mb-8">
              <OnboardingProgress
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS - 1}  // Subtract 1 for completion screen
              />
            </div>
          )}
          
          <div className="bg-card border rounded-lg p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;
