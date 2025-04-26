
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface HospitalizationHistoryFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const formSchema = z.object({
  recentHospitalization: z.string().min(1, "Please select an option"),
  admissionCount: z.string().optional(),
  lastHospitalDate: z.string().optional(),
  reasonForAdmission: z.string().optional(),
  hospitalStayDays: z.string().optional(),
});

const HospitalizationHistoryForm = ({ onNext, onBack }: HospitalizationHistoryFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recentHospitalization: "",
      admissionCount: "",
      lastHospitalDate: "",
      reasonForAdmission: "",
      hospitalStayDays: "",
    },
  });

  const watchRecentHospitalization = form.watch("recentHospitalization");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    try {
      // In a real app, this would connect to an API
      console.log("Form submitted:", values);
      
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Hospitalization history saved",
          description: "Your hospitalization history has been updated.",
        });
        onNext(values);
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hospitalization History</h2>
        <p className="text-muted-foreground">
          Information about your recent hospital stays helps us provide better care recommendations.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="recentHospitalization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you been hospitalized in the past 12 months?</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {watchRecentHospitalization === "yes" && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="admissionCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many times were you admitted in the past 12 months?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastHospitalDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When was your most recent hospital stay?</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reasonForAdmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary reason for your most recent admission</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Heart failure, surgery, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      This helps us understand your specific healthcare needs.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hospitalStayDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length of most recent hospital stay (days)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
      </Form>
    </div>
  );
};

export default HospitalizationHistoryForm;
