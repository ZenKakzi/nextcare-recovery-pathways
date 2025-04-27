import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRiskLevel } from "@/utils/riskScoreCalculator";

interface RiskScoreCardProps {
  riskScore: number;
  onViewDetails: () => void;
}

const RiskScoreCard = ({ riskScore, onViewDetails }: RiskScoreCardProps) => {
  // Use the risk level from our utility function
  const { level, color, bgColor } = getRiskLevel(riskScore);

  // Get risk description based on level
  const getRiskDescription = () => {
    switch (level) {
      case "Low":
        return "Your current health profile suggests good stability with lower risk of complications.";
      case "Moderate":
        return "Your health profile indicates some factors that could affect your stability.";
      case "High":
        return "Your health profile shows significant factors that require careful management.";
      default:
        return "Your personalized health stability assessment.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Health Stability Score</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This score represents your estimated health stability based on your health profile data.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Your personalized health stability assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-40 h-40">
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
              <span className="text-4xl font-bold">{riskScore}%</span>
              <span className={`text-sm font-medium ${color}`}>{level} Stability</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 mt-0.5 ${color}`} />
            <div>
              <p className={`font-medium ${color}`}>
                {level} Health Stability
              </p>
              <p className="text-sm mt-1">
                {getRiskDescription()}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={onViewDetails} 
            variant="outline" 
            className="mt-2"
          >
            View Health Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;
