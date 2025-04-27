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
  const healthStabilityScore = 100 - riskScore;
  const { level, color, bgColor } = getRiskLevel(riskScore);

  // Determine color, emoji, and label based on healthStabilityScore
  let stabilityColor = "";
  let stabilityEmoji = "";
  let stabilityLabel = "";
  let clinicalInterpretation = "";
  if (healthStabilityScore >= 95) {
    stabilityColor = "text-green-600";
    stabilityEmoji = "🟢";
    stabilityLabel = "Minimal";
    clinicalInterpretation = "No significant risk; optimal stability.";
  } else if (healthStabilityScore >= 81) {
    stabilityColor = "text-yellow-500";
    stabilityEmoji = "🟡";
    stabilityLabel = "Low";
    clinicalInterpretation = "Slight risk; monitor for minor changes.";
  } else if (healthStabilityScore >= 51) {
    stabilityColor = "text-orange-500";
    stabilityEmoji = "🟠";
    stabilityLabel = "Moderate";
    clinicalInterpretation = "Elevated risk; requires intervention.";
  } else if (healthStabilityScore >= 1) {
    stabilityColor = "text-red-600";
    stabilityEmoji = "🔴";
    stabilityLabel = "High";
    clinicalInterpretation = "Urgent action needed; unstable.";
  } else {
    stabilityColor = "text-black";
    stabilityEmoji = "⚫";
    stabilityLabel = "Critical";
    clinicalInterpretation = "Immediate medical attention required.";
  }

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
                strokeDashoffset={282.7 - (282.7 * healthStabilityScore) / 100}
                className={stabilityColor}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{healthStabilityScore}%</span>
              <span className={`text-sm font-medium ${stabilityColor}`}>{stabilityEmoji} {stabilityLabel} Stability</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 mt-0.5 ${stabilityColor}`} />
            <div>
              <p className={`font-medium ${stabilityColor}`}>
                {stabilityLabel} Health Stability
              </p>
              <p className="text-sm mt-1">
                {clinicalInterpretation}
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
