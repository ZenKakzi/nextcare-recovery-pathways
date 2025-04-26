
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LifestyleFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const formSchema = z.object({
  smokingStatus: z.string().min(1, "Please select an option"),
  alcoholConsumption: z.string().min(1, "Please select an option"),
  physicalActivity: z.string().min(1, "Please select an option"),
  stressLevel: z.string().min(1, "Please select an option"),
  sleepHours: z.string().optional(),
  dietDescription: z.string().optional(),
});

const LifestyleForm = ({ onNext, onBack }: LifestyleFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smokingStatus: "",
      alcoholConsumption: "",
      physicalActivity: "",
      stressLevel: "",
      sleepHours: "",
      dietDescription: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    try {
      // In a real app, this would connect to an API
      console.log("Form submitted:", values);
      
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Lifestyle information saved",
          description: "Your lifestyle information has been updated.",
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
        <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
        <p className="text-muted-foreground">
          These lifestyle factors help us personalize your care plan recommendations.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="smokingStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Smoking Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="never" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Never smoked
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="former" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Former smoker (quit over 12 months ago)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="current" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Current smoker
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alcoholConsumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alcohol Consumption</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="occasional">Occasional (few times a month)</SelectItem>
                    <SelectItem value="moderate">Moderate (1-2 drinks a few times a week)</SelectItem>
                    <SelectItem value="frequent">Frequent (daily or almost daily)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="physicalActivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Activity Level</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (daily exercise)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stressLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perceived Stress Level</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low (rarely feel stressed)</SelectItem>
                    <SelectItem value="moderate">Moderate (occasionally stressed)</SelectItem>
                    <SelectItem value="high">High (frequently stressed)</SelectItem>
                    <SelectItem value="severe">Severe (constant stress)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sleepHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Sleep (hours per night)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="7" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dietDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Diet Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your typical eating habits (e.g., vegetarian, low-carb, etc.)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This helps us provide appropriate dietary recommendations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default LifestyleForm;
