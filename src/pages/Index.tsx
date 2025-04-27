import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/common/Layout";
import { CheckCircle2, ArrowRight, BarChart3, CalendarClock, ShieldCheck } from "lucide-react";
import HealthResourceCard from "@/components/dashboard/HealthResourceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Calendar as DayCalendar } from "@/components/ui/calendar";

const ARTICLE1_TITLE = "Eat for a Happy Heart: Delicious Dishes That Keep Your Ticker Ticking";
const ARTICLE1_BODY = `Hello there, proud owner of a heart that needs a bit of VIP treatment!
 ... (rest of article 1) ...`;
const ARTICLE2_TITLE = "Busted! Common Heart Disease Myths That Could Literally Break Your Heart";
const ARTICLE2_BODY = `Hey there, my fellow warriors with sensitive little hearts!
 ... (rest of article 2) ...`;
const YOUTUBE_URL = "https://youtu.be/XprmCVflDTY";

const dailyTasks = {
  '2025-05-01': 'Walk 3km', // Thursday
  '2025-05-02': 'Yoga session', // Friday
  '2025-05-03': 'Rest day', // Saturday (disabled)
  '2025-05-06': 'Strength training', // Tuesday
  '2025-05-07': 'Cycling 5km', // Wednesday
  '2025-05-08': 'Swim 30min', // Thursday
  '2025-05-09': 'Meditation 20min', // Friday
  '2025-05-13': 'Cardio workout', // Tuesday
  '2025-05-14': 'Pilates', // Wednesday
  '2025-05-15': 'Walk 5km', // Thursday
  '2025-05-16': 'Yoga session', // Friday
};

const Index = () => {
  const navigate = useNavigate();
  const [showArticle, setShowArticle] = useState<{title: string, body: string} | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nextcare-light to-white dark:from-nextcare-dark dark:to-background py-16 md:py-24">
        <div className="nextcare-container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Personalized Post-Hospital <span className="text-nextcare-primary">Recovery Care</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                NextCare uses advanced analytics to create personalized care plans 
                that reduce readmission risk and improve recovery outcomes.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <Button 
                  onClick={() => navigate("/register")} 
                  size="lg"
                  className="bg-nextcare-primary hover:bg-nextcare-dark"
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-nextcare-success" />
                  <span className="text-sm">Personalized Plans</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-nextcare-success" />
                  <span className="text-sm">Risk Assessment</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-nextcare-success" />
                  <span className="text-sm">Daily Monitoring</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md bg-white dark:bg-nextcare-dark rounded-lg shadow-xl overflow-hidden border">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-bold text-xl">Recovery Progress</h3>
                      <p className="text-sm text-muted-foreground">Patient Dashboard</p>
                    </div>
                    <div className="bg-nextcare-light dark:bg-nextcare-primary/20 rounded-full p-3">
                      <BarChart3 className="h-6 w-6 text-nextcare-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Readmission Risk</span>
                        <span className="font-bold text-nextcare-success">Low 12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-nextcare-success h-2.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CalendarClock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Next Follow-up</p>
                          <p className="text-sm text-muted-foreground">May 3, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCalendarOpen(true)}>View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Tasks Completed</p>
                          <p className="text-sm text-muted-foreground">5/7 daily tasks</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="nextcare-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              NextCare combines advanced analytics with personalized care planning to reduce hospital readmissions and improve recovery outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="health-card">
              <div className="rounded-full bg-nextcare-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-nextcare-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
              <p className="text-muted-foreground mb-4">
                Advanced analytics that predict readmission risk based on your personal health data.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-nextcare-primary"
                onClick={() => navigate("/about")}
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="health-card">
              <div className="rounded-full bg-nextcare-secondary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-nextcare-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Care Plans</h3>
              <p className="text-muted-foreground mb-4">
                Customized daily care routines based on your unique health needs and risk factors.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-nextcare-primary"
                onClick={() => navigate("/about")}
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="health-card">
              <div className="rounded-full bg-nextcare-accent/30 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <CalendarClock className="h-8 w-8 text-nextcare-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Follow-up Management</h3>
              <p className="text-muted-foreground mb-4">
                Smart scheduling and reminders for critical follow-up appointments and check-ins.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-nextcare-primary"
                onClick={() => navigate("/about")}
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-nextcare-light dark:bg-nextcare-dark py-16">
        <div className="nextcare-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Recovery Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join NextCare and get personalized care plans designed specifically for your health needs.
            </p>
            <Button 
              onClick={() => navigate("/register")} 
              size="lg"
              className="bg-nextcare-primary hover:bg-nextcare-dark"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials (placeholder for future testimonial section) */}
      <section className="py-16">
        <div className="nextcare-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who NextCare Helps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              NextCare is designed for patients with chronic conditions, recent hospital discharges, and their caregivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="health-card">
              <h3 className="text-xl font-bold mb-2">Chronic Disease Patients</h3>
              <p className="text-muted-foreground">
                Specialized support for managing heart disease, diabetes, dementia and other chronic conditions.
              </p>
            </div>
            
            <div className="health-card">
              <h3 className="text-xl font-bold mb-2">Recently Discharged Patients</h3>
              <p className="text-muted-foreground">
                Tailored guidance for the critical recovery period after hospital discharge.
              </p>
            </div>
            
            <div className="health-card">
              <h3 className="text-xl font-bold mb-2">Family Caregivers</h3>
              <p className="text-muted-foreground">
                Tools and resources to help family members provide effective care and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">All Resources</h2>
        <HealthResourceCard resources={resourcesData} onResourceClick={(resource) => {
          if (resource.url) {
            window.open(resource.url, "_blank");
          } else if (resource.body) {
            setShowArticle({title: resource.title, body: resource.body});
          }
        }} />
      </section>

      <Dialog open={!!showArticle} onOpenChange={() => setShowArticle(null)}>
        <DialogContent className="w-full max-w-xl h-[500px] max-h-[90vh] flex flex-col rounded-lg !fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2">
          <DialogHeader>
            <DialogTitle>{showArticle?.title}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm overflow-y-auto flex-1">
            {showArticle?.body}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Recovery Calendar</DialogTitle>
          </DialogHeader>
          <div className="font-semibold mb-2">Your Recovery Calendar</div>
          <DayCalendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={new Date(2025, 4, 1)} // May 2025
            fromDate={new Date(2025, 4, 1)}
            toDate={new Date(2025, 4, 31)}
            disabled={(date) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends
          />
          {selectedDate && (
            <div className="mt-4 p-3 border rounded bg-muted">
              <span className="font-medium">{selectedDate.toLocaleDateString()}</span>: {dailyTasks[selectedDate.toISOString().slice(0, 10)] || 'No special task for this day.'}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
