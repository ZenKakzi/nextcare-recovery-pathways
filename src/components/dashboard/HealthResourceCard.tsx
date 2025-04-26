
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Video, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "guide";
  description: string;
}

interface HealthResourceCardProps {
  resources: Resource[];
}

const HealthResourceCard = ({ resources }: HealthResourceCardProps) => {
  const navigate = useNavigate();
  
  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return <Book className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "guide":
        return <FileText className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-600";
      case "video":
        return "bg-purple-100 text-purple-600";
      case "guide":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Health Resources</CardTitle>
        <CardDescription>
          Recommended educational materials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-start space-x-4 p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/education/${resource.id}`)}
            >
              <div className={`rounded-full p-2 ${getIconBg(resource.type)}`}>
                {getIcon(resource.type)}
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">{resource.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate("/education")}
        >
          View All Resources <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthResourceCard;
