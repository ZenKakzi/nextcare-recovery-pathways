import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { getRiskLevel } from "@/utils/riskScoreCalculator";

interface OnboardingCompleteProps {
  riskScore?: number;
  userData?: any;
}

const OnboardingComplete = ({ riskScore = 42, userData = {} }: OnboardingCompleteProps) => {
  const navigate = useNavigate();

  // Use the risk level from our utility function
  const { level, color } = getRiskLevel(riskScore);

  // Get risk description based on level
  const getRiskDescription = () => {
    switch (level) {
      case "Low":
        return "Your health profile suggests a lower risk of hospital readmission. Continue following your care plan to maintain this status.";
      case "Moderate":
        return "Your health profile indicates some risk factors that could lead to readmission. We've created a personalized care plan to help manage these factors.";
      case "High":
        return "Your health profile shows significant risk factors that require careful management. Our comprehensive care plan will help address these concerns.";
      default:
        return "Your personalized care plan has been created based on this assessment.";
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-nextcare-success/20 p-3">
          <CheckCircle className="h-12 w-12 text-nextcare-success" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">Profile Setup Complete!</h2>
      
      <p className="text-muted-foreground max-w-md mx-auto">
        Thank you for providing your health information. We've created your personalized care plan based on your profile.
      </p>
      
      <div className="bg-muted/30 p-6 rounded-lg max-w-md mx-auto">
        <h3 className="font-medium text-lg mb-2">Your Readmission Risk Assessment</h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e6e6e6" 
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * riskScore) / 100}
                className={
                  riskScore < 30
                    ? "text-nextcare-success"
                    : riskScore < 60
                    ? "text-nextcare-warning"
                    : "text-nextcare-error"
                }
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{riskScore}%</span>
              <span className={`text-sm font-medium ${color}`}>{level} Risk</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {getRiskDescription()}
        </p>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={() => navigate("/dashboard")}
          className="bg-nextcare-primary hover:bg-nextcare-dark"
          size="lg"
        >
          Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
