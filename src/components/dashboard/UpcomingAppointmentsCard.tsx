
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "virtual";
}

interface UpcomingAppointmentsCardProps {
  appointments: Appointment[];
  onSchedule: () => void;
}

const UpcomingAppointmentsCard = ({ 
  appointments,
  onSchedule,
}: UpcomingAppointmentsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled healthcare appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                  <Badge variant={appointment.type === "virtual" ? "outline" : "default"}>
                    {appointment.type === "virtual" ? "Virtual" : "In-person"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-nextcare-primary" />
                    <span>{appointment.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-nextcare-primary" />
                    <span>{appointment.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <MapPin className="h-4 w-4 text-nextcare-primary" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-3 border rounded-md">
            <Calendar className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">No upcoming appointments</p>
              <p className="text-sm text-muted-foreground">
                Schedule your next appointment to stay on track
              </p>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full bg-nextcare-primary hover:bg-nextcare-dark"
          onClick={onSchedule}
        >
          Schedule New Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
