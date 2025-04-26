
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MedicalConditionsFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const conditions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "heart_disease", label: "Heart Disease" },
  { id: "asthma", label: "Asthma" },
  { id: "copd", label: "COPD" },
  { id: "arthritis", label: "Arthritis" },
  { id: "cancer", label: "Cancer (Past or Present)" },
  { id: "stroke", label: "Stroke History" },
  { id: "kidney_disease", label: "Kidney Disease" },
  { id: "liver_disease", label: "Liver Disease" },
  { id: "thyroid_disorder", label: "Thyroid Disorder" },
  { id: "mental_health", label: "Mental Health Condition" },
  { id: "dementia", label: "Dementia/Alzheimer's" },
  { id: "other", label: "Other Chronic Condition" },
];

const MedicalConditionsForm = ({ onNext, onBack }: MedicalConditionsFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev => 
      prev.includes(conditionId)
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would connect to an API
      console.log("Selected conditions:", selectedConditions);
      
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Medical conditions saved",
          description: "Your medical information has been updated.",
        });
        onNext({ conditions: selectedConditions });
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Medical Conditions</h2>
        <p className="text-muted-foreground">
          Select any conditions that have been diagnosed by a healthcare provider.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditions.map((condition) => (
            <div 
              key={condition.id}
              className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCondition(condition.id)}
            >
              <Checkbox 
                id={condition.id}
                checked={selectedConditions.includes(condition.id)}
                onCheckedChange={() => toggleCondition(condition.id)}
              />
              <Label 
                htmlFor={condition.id}
                className="flex-1 cursor-pointer"
              >
                {condition.label}
              </Label>
              {selectedConditions.includes(condition.id) && (
                <CheckCircle2 className="h-5 w-5 text-nextcare-primary" />
              )}
            </div>
          ))}
        </div>

        {selectedConditions.length === 0 && (
          <div className="text-center p-4 bg-muted/50 rounded-md">
            <p className="text-muted-foreground">
              If you don't have any medical conditions, you can proceed to the next step.
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          
          <Button 
            type="submit" 
            className="bg-nextcare-primary hover:bg-nextcare-dark"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicalConditionsForm;
