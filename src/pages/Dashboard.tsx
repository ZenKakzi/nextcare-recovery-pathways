import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/common/Layout";
import RiskScoreCard from "@/components/dashboard/RiskScoreCard";
import CarePlanCard from "@/components/dashboard/CarePlanCard";
import UpcomingAppointmentsCard from "@/components/dashboard/UpcomingAppointmentsCard";
import HealthResourceCard from "@/components/dashboard/HealthResourceCard";
import DailyInsights from "@/components/dashboard/DailyInsights";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { calculateOverallRiskScore, getRiskLevel } from "@/utils/riskScoreCalculator";

const ARTICLE1_TITLE = "Eat for a Happy Heart: Delicious Dishes That Keep Your Ticker Ticking";
const ARTICLE1_BODY = `Hello there, proud owner of a heart that needs a bit of VIP treatment!
 If your heart's been feeling a little "meh" thanks to cholesterol, high blood pressure, or everyday life stress, don't worry! Today, I'll take you on a kitchen adventure — cooking mouthwatering dishes that'll make your heart dance with joy!
1. Fatty Fish – Get Your Heart Grooving
Top picks: Salmon, mackerel, sardines.

Why it's good: Packed with Omega-3s, which fight inflammation and prevent clogged arteries.

Tasty tips:

Lightly pan-sear with green pepper and a squeeze of fresh lemon.
Or wrap it in foil with veggies and a honey glaze for an irresistible oven treat.

2. Avocado – More Than Just a Fancy Guacamole Base
Why it's good: Full of heart-healthy monounsaturated fats that lower bad cholesterol.

Trendy ways to eat:

Mash it into a creamy salad dressing.
Spread on whole-grain toast, sprinkle some chia seeds — healthy but make it fashion.
3. Oats – The Breakfast MVP for Heart Health
Why it's good: Rich in beta-glucan, a fiber that lowers cholesterol like a charm.

How to keep it exciting:

Classic oatmeal with fresh fruits and a drizzle of honey.
Overnight oats with almond milk for the busy bees out there.
4. Dark Leafy Greens – Nature's Heart Guardians
Top picks: Spinach, kale, bok choy.

Why it's good: Loaded with natural nitrates that gently lower blood pressure.

Tasty ideas:

Toss into a salad with olive oil.
Lightly stir-fry with garlic (easy on the oil, please!).`;

const ARTICLE2_TITLE = "Busted! Common Heart Disease Myths That Could Literally Break Your Heart";
const ARTICLE2_BODY = `Hey there, my fellow warriors with sensitive little hearts!
 Today, let's bust some urban legends about heart disease that sound convincing... but could actually backfire big time!
1. "I'm strong like an ox — no heart problems for me!"
The truth: Heart disease doesn't care how many push-ups you can do. If you chase it down with three bowls of beef noodle soup at midnight... well, good luck, buddy.

2. "Heart disease only happens to old people."
The truth: Not anymore! Thanks to stress, late nights, boba tea, and fried everything, heart disease is getting disturbingly younger.

3. "As long as I take my meds, I can eat anything!"
The truth: Meds help, sure — but if your diet is a daily double of fried chicken + double topping milk tea... even your doctor will run out of prayers.
4. "No symptoms = No problem."
The truth: 50% of heart attacks come with zero warning signs. It's like getting ghosted by your crush — no notice, just... pain.

🌟 Moral of the story:
Don't wait for your heart to scream before you start caring.

Good food + regular exercise = the secret potion for a heart that stays young and happy!`;

const YOUTUBE_URL = "https://youtu.be/XprmCVflDTY";

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [showArticle, setShowArticle] = useState<{title: string, body: string} | null>(null);
  const carePlanRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const [riskScore, setRiskScore] = useState(42); // Default risk score
  const [riskFactors, setRiskFactors] = useState([
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
  ]);

  // Calculate risk score based on user data
  useEffect(() => {
    if (user) {
      // Get medical conditions from user data
      const conditions = Array.isArray((user as any)?.medicalConditions)
        ? (user as any).medicalConditions
        : [];
      
      // Get hospitalization history from user data
      const hospitalizationData = (user as any)?.hospitalizationHistory || {};
      
      // Get lifestyle data from user data
      const lifestyleData = (user as any)?.lifestyleData || {};

      // Debug logs
      console.log("User in dashboard:", user);
      console.log("User conditions:", conditions);
      console.log("User hospitalizationData:", hospitalizationData);
      console.log("User lifestyleData:", lifestyleData);

      // Calculate risk score
      const calculatedRiskScore = calculateOverallRiskScore(
        conditions,
        hospitalizationData,
        lifestyleData
      );
      console.log("Calculated risk score:", calculatedRiskScore);
      
      setRiskScore(calculatedRiskScore);
      
      // Generate risk factors based on conditions
      const newRiskFactors = [];
      
      // Add risk factors based on medical conditions
      if (conditions.includes("diabetes")) {
        newRiskFactors.push({
          factor: "Diabetes",
          impact: "Medium",
          description: "Diabetes increases your risk of complications and readmission"
        });
      }
      
      if (conditions.includes("heart_disease")) {
        newRiskFactors.push({
          factor: "Heart Disease",
          impact: "High",
          description: "Cardiovascular conditions significantly increase readmission risk"
        });
      }
      
      if (conditions.includes("copd")) {
        newRiskFactors.push({
          factor: "COPD",
          impact: "High",
          description: "Respiratory conditions require careful management to prevent readmission"
        });
      }
      
      // Add risk factor for recent hospitalization if applicable
      if (hospitalizationData.recentHospitalization === "yes") {
        newRiskFactors.push({
          factor: "Recent hospitalization",
          impact: "High",
          description: "You were hospitalized within the last 30 days"
        });
      }
      
      // Add risk factor for lifestyle if applicable
      if (lifestyleData.smokingStatus === "current") {
        newRiskFactors.push({
          factor: "Current smoker",
          impact: "Medium",
          description: "Smoking increases your risk of complications and readmission"
        });
      }
      
      // If no specific risk factors were identified, add a generic one
      if (newRiskFactors.length === 0) {
        newRiskFactors.push({
          factor: "General health assessment",
          impact: getRiskLevel(calculatedRiskScore).level,
          description: "Based on your overall health profile"
        });
      }
      
      setRiskFactors(newRiskFactors);
    }
  }, [user]);
  
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
      title: ARTICLE1_TITLE,
      type: "article" as const,
      description: "A kitchen adventure for your heart!",
      body: ARTICLE1_BODY,
    },
    {
      id: "res2",
      title: ARTICLE2_TITLE,
      type: "guide" as const,
      description: "Busting heart disease myths that could backfire!",
      body: ARTICLE2_BODY,
    },
    {
      id: "res3",
      title: "Heart-Healthy Cooking",
      type: "video" as const,
      description: "Simple cooking demonstrations for heart-healthy meals.",
      body: "",
      url: YOUTUBE_URL,
    }
  ];

  const handleScheduleAppointment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Appointment scheduling will be available in the next update.",
    });
  };

  // Handler to scroll to Care Plan
  const scrollToCarePlan = () => {
    carePlanRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Handler to scroll to Resources
  const scrollToResources = () => {
    resourcesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout isAuthenticated={true} scrollToCarePlan={scrollToCarePlan} scrollToResources={scrollToResources}>
      <div className="nextcare-container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.username || "Patient"}</h1>
          </div>
        </div>
        
        <DailyInsights />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Risk Score */}
          <div className="xl:col-span-1">
            <RiskScoreCard 
              riskScore={riskScore} 
              onViewDetails={() => setShowRiskDetails(true)} 
            />
          </div>
          
          {/* Care Plan */}
          <div className="xl:col-span-1" ref={carePlanRef}>
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
          <div className="md:col-span-2 xl:col-span-3" ref={resourcesRef}>
            <HealthResourceCard resources={resourcesData} onResourceClick={(resource) => {
              if (resource.url) {
                window.open(resource.url, "_blank");
              } else if (resource.body) {
                setShowArticle({title: resource.title, body: resource.body});
              }
            }} />
          </div>
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={!!showArticle} onOpenChange={() => setShowArticle(null)}>
        <DialogContent className="w-full max-w-xl h-[500px] flex flex-col">
          <DialogHeader>
            <DialogTitle>{showArticle?.title}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm overflow-y-auto flex-1">
            {showArticle?.body}
          </div>
        </DialogContent>
      </Dialog>

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
