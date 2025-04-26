
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

interface OnboardingCompleteProps {
  riskScore?: number;
}

const OnboardingComplete = ({ riskScore = 42 }: OnboardingCompleteProps) => {
  const navigate = useNavigate();

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "text-nextcare-success" };
    if (score < 60) return { level: "Moderate", color: "text-nextcare-warning" };
    return { level: "High", color: "text-nextcare-error" };
  };

  const { level, color } = getRiskLevel(riskScore);

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
      
      <div className="bg-card border rounded-lg p-6 max-w-sm mx-auto">
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
          Your personalized care plan has been created based on this assessment.
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
