
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, ListChecks, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface CarePlanCardProps {
  completedTasks: number;
  totalTasks: number;
}

const CarePlanCard = ({ completedTasks, totalTasks }: CarePlanCardProps) => {
  const navigate = useNavigate();
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Care Plan</CardTitle>
        <CardDescription>
          Daily tasks and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Daily Progress</span>
          <span className="text-sm font-medium">{completionPercentage}% Complete</span>
        </div>
        
        <Progress value={completionPercentage} className="h-2" />
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <div className="rounded-full bg-nextcare-success/20 p-1.5">
              <CheckCircle2 className="h-4 w-4 text-nextcare-success" />
            </div>
            <div>
              <span className="text-sm font-medium">Completed</span>
              <p className="text-2xl font-semibold">{completedTasks}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <div className="rounded-full bg-nextcare-warning/20 p-1.5">
              <Clock className="h-4 w-4 text-nextcare-warning" />
            </div>
            <div>
              <span className="text-sm font-medium">Pending</span>
              <p className="text-2xl font-semibold">{totalTasks - completedTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <span className="text-sm font-medium">Today's Priority Tasks</span>
          
          {completedTasks < totalTasks ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-l-4 border-nextcare-warning pl-3 py-2">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-nextcare-warning" />
                  <span className="text-sm">Take morning medication</span>
                </div>
                <Button size="sm" variant="ghost">
                  Mark Done
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-nextcare-primary pl-3 py-2">
                <div className="flex items-center space-x-3">
                  <ListChecks className="h-4 w-4 text-nextcare-primary" />
                  <span className="text-sm">Record blood pressure</span>
                </div>
                <Button size="sm" variant="ghost">
                  Mark Done
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-nextcare-primary pl-3 py-2">
                <div className="flex items-center space-x-3">
                  <ListChecks className="h-4 w-4 text-nextcare-primary" />
                  <span className="text-sm">30-minute light exercise</span>
                </div>
                <Button size="sm" variant="ghost">
                  Mark Done
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 space-y-3 border rounded-md">
              <CheckCircle2 className="h-10 w-10 text-nextcare-success" />
              <p className="text-center text-muted-foreground">
                All tasks completed for today!
              </p>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full bg-nextcare-primary hover:bg-nextcare-dark"
          onClick={() => navigate("/care-plan")}
        >
          View Full Care Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarePlanCard;
