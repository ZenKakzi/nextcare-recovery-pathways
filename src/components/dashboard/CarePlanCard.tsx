import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, ListChecks, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TASKS = [
  { id: 1, label: "Take morning medication", icon: <AlertTriangle className="h-4 w-4 text-nextcare-warning" /> },
  { id: 2, label: "Record blood pressure", icon: <ListChecks className="h-4 w-4 text-nextcare-primary" /> },
  { id: 3, label: "30-minute light exercise", icon: <ListChecks className="h-4 w-4 text-nextcare-primary" /> },
];

const CarePlanCard = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState<boolean[]>(Array(TASKS.length).fill(false));
  const completedTasks = done.filter(Boolean).length;
  const totalTasks = TASKS.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const handleToggleDone = (idx: number) => {
    setDone((prev) => prev.map((d, i) => (i === idx ? !d : d)));
  };

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
              {TASKS.map((task, idx) => (
                <div key={task.id} className={`flex items-center justify-between border-l-4 pl-3 py-2 ${idx === 0 ? 'border-nextcare-warning' : 'border-nextcare-primary'}`}>
                  <div className="flex items-center space-x-3">
                    {task.icon}
                    <span className="text-sm">{task.label}</span>
                  </div>
                  {done[idx] ? (
                    <img
                      src="http://www.clipartbest.com/cliparts/jTx/kX5/jTxkX5rTE.png"
                      alt="Done"
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => handleToggleDone(idx)}
                      title="Mark as not done"
                    />
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleToggleDone(idx)}>
                      Mark Done
                    </Button>
                  )}
                </div>
              ))}
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
