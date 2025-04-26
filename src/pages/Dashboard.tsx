
import { useState } from "react";
import Layout from "@/components/common/Layout";
import RiskScoreCard from "@/components/dashboard/RiskScoreCard";
import CarePlanCard from "@/components/dashboard/CarePlanCard";
import UpcomingAppointmentsCard from "@/components/dashboard/UpcomingAppointmentsCard";
import HealthResourceCard from "@/components/dashboard/HealthResourceCard";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { toast } = useToast();
  const [showRiskDetails, setShowRiskDetails] = useState(false);

  // Sample data
  const riskScore = 42; // 0-100
  const riskFactors = [
    {
      factor: "Recent hospitalization",
      impact: "High",
      description: "You were hospitalized within the last 30 days"
    },
    {
      factor: "Multiple medications",
      impact: "Medium",
      description: "You are currently taking 5 or more medications"
    },
    {
      factor: "Diabetes management",
      impact: "Medium",
      description: "Your recent blood sugar readings are outside target range"
    },
    {
      factor: "Follow-up adherence",
      impact: "Low",
      description: "You've attended all scheduled follow-up appointments"
    }
  ];
  
  const appointmentsData = [
    {
      id: "apt1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "May 3, 2025",
      time: "10:30 AM",
      location: "Central Hospital, Room 302",
      type: "in-person" as const
    }
  ];
  
  const resourcesData = [
    {
      id: "res1",
      title: "Understanding Heart Disease",
      type: "article" as const,
      description: "Learn about the basics of heart disease and how to manage symptoms effectively."
    },
    {
      id: "res2",
      title: "Medication Management Guide",
      type: "guide" as const,
      description: "Tips and tools to help you remember and manage your medications."
    },
    {
      id: "res3",
      title: "Heart-Healthy Cooking",
      type: "video" as const,
      description: "Simple cooking demonstrations for heart-healthy meals."
    }
  ];

  const handleScheduleAppointment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Appointment scheduling will be available in the next update.",
    });
  };

  return (
    <Layout isAuthenticated={true}>
      <div className="nextcare-container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome Back, John</h1>
          <p className="text-muted-foreground">Here's an overview of your health status and care plan.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Risk Score */}
          <div className="xl:col-span-1">
            <RiskScoreCard 
              riskScore={riskScore} 
              onViewDetails={() => setShowRiskDetails(true)} 
            />
          </div>
          
          {/* Care Plan */}
          <div className="xl:col-span-1">
            <CarePlanCard completedTasks={3} totalTasks={6} />
          </div>
          
          {/* Upcoming Appointments */}
          <div className="xl:col-span-1">
            <UpcomingAppointmentsCard 
              appointments={appointmentsData} 
              onSchedule={handleScheduleAppointment} 
            />
          </div>
          
          {/* Resources */}
          <div className="md:col-span-2 xl:col-span-3">
            <HealthResourceCard resources={resourcesData} />
          </div>
        </div>
      </div>

      {/* Risk Details Dialog */}
      <Dialog open={showRiskDetails} onOpenChange={setShowRiskDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Your Readmission Risk Factors</DialogTitle>
            <DialogDescription>
              These factors contribute to your overall readmission risk score of {riskScore}%.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            {riskFactors.map((item, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.factor}</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    item.impact === "High" ? "bg-red-100 text-red-700" :
                    item.impact === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowRiskDetails(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
