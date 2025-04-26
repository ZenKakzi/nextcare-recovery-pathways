
import { Check } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium text-nextcare-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-nextcare-primary">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`progress-step ${
                index + 1 < currentStep
                  ? "completed"
                  : index + 1 === currentStep
                  ? "active"
                  : "incomplete"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`progress-line ${
                  index + 1 < currentStep ? "active" : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgress;
