import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { addDays, isSameDay, parseISO } from "date-fns";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "virtual";
  image: string;
  room: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  available: boolean;
}

interface UpcomingAppointmentsCardProps {
  appointments: Appointment[];
  onSchedule: () => void;
}

const sampleDoctors: Doctor[] = [
  {
    id: "doc1",
    name: "Alina",
    specialty: "Focuses on emotional support through music",
    image: "https://imgs.search.brave.com/Ncpm9NKsiST09aV1tpDr73N9AkgBF7h6R7uTYLm-clM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDc5/Mzc4Nzk4L3Bob3Rv/L3BvcnRyYWl0LW9m/LWZlbWFsZS1kb2N0/b3IuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVAtVzhLU0pC/WWhZajJSU3gxWmhm/ZjZGQ0d2dFJEQzNB/QXpveDhkZU1tZXc9",
    available: true,
  },
  {
    id: "doc2",
    name: "David Tune",
    specialty: "Expert in sound therapy for anxiety reduction",
    image: "https://media.istockphoto.com/id/1327024466/photo/portrait-of-male-doctor-in-white-coat-and-stethoscope-standing-in-clinic-hall.jpg?s=612x612&w=0&k=20&c=49wqOwwuonk9f8NACL7M_5RosqQPFwJ8-dpmeo9AvQw=",
    available: true,
  },
  {
    id: "doc3",
    name: "LAURA HARMON",
    specialty: "Specialist in postpartum stress relief",
    image: "https://img.freepik.com/free-photo/portrait-young-female-doctor-hospital_1303-17839.jpg",
    available: false,
  },
];

const DoctorProfileDialog = ({ doctor, open, onClose, onBook }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const availableDates = ["2025-05-18", "2025-05-19", "2025-05-20", "2025-05-21", "2025-05-22"].map(d => parseISO(d));
  const availableTimes = ["09:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM"];

  const isDayAvailable = (date: Date) => availableDates.some(d => isSameDay(d, date));

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onBook({
        id: `apt-${doctor.id}`,
        doctor: doctor.name,
        specialty: doctor.specialty,
        date: selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        time: selectedTime,
        location: "Central Hospital, Room 302",
        type: "in-person",
        image: doctor.image,
        room: "302",
      });
      onClose();
      setSelectedDate(undefined);
      setSelectedTime("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{doctor.name}</DialogTitle>
          <DialogDescription>{doctor.specialty}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border mb-2" />
          <div className="mb-2">Select a date:</div>
          <DateCalendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => !isDayAvailable(date)}
            modifiers={{ unavailable: (date) => !isDayAvailable(date) }}
            modifiersClassNames={{ unavailable: "bg-gray-200 text-gray-400 cursor-not-allowed" }}
          />
          {selectedDate && (
            <>
              <div className="mb-2">Select a time:</div>
              <div className="flex gap-2 mb-2">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    className={`px-3 py-1 rounded border ${selectedTime === time ? 'bg-nextcare-primary text-white' : 'bg-white'}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}
          <button
            className="w-full mt-4 bg-nextcare-primary text-white py-2 rounded disabled:opacity-50"
            disabled={!selectedDate || !selectedTime}
            onClick={handleBook}
          >
            Make Appointment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UpcomingAppointmentsCard = ({ appointments, onSchedule }: UpcomingAppointmentsCardProps) => {
  const [booked, setBooked] = useState<Appointment | null>(null);
  const [showDoctors, setShowDoctors] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleBook = (doctor: Doctor) => {
    const newAppointment: Appointment = {
      id: `apt-${doctor.id}`,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: "May 10, 2025",
      time: "11:00 AM",
      location: "Central Hospital, Room 302",
      type: "in-person",
      image: doctor.image,
      room: "302",
    };
    setBooked(newAppointment);
    setShowDoctors(false);
  };

  const handleCancel = () => {
    setBooked(null);
    setShowDoctors(true);
  };

  const handleOpenDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDialog(true);
  };

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        <CardDescription>
          {booked ? "Your scheduled healthcare appointment" : "Book an appointment with an available doctor"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {showDoctors ? (
          <div className="space-y-4">
            <div className="text-center font-medium mb-2">Available Doctors</div>
            {sampleDoctors.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 border rounded-lg p-4 mb-2 bg-white">
                <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border" />
                <div className="flex-1">
                  <div className="font-semibold text-base">{doc.name}</div>
                  <div className="text-sm text-muted-foreground">{doc.specialty}</div>
                </div>
                <Button
                  disabled={!doc.available}
                  className="bg-nextcare-primary hover:bg-nextcare-dark"
                  onClick={() => handleOpenDialog(doc)}
                >
                  {doc.available ? "Book" : "Unavailable"}
                </Button>
              </div>
            ))}
          </div>
        ) : booked ? (
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-4">
              <img src={booked.image} alt={booked.doctor} className="w-16 h-16 rounded-full object-cover border" />
              <div>
                <p className="font-medium">{booked.doctor}</p>
                <p className="text-sm text-muted-foreground">{booked.specialty}</p>
              </div>
              <Badge variant={booked.type === "virtual" ? "outline" : "default"}>
                {booked.type === "virtual" ? "Virtual" : "In-person"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-nextcare-primary" />
                <span>{booked.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-nextcare-primary" />
                <span>{booked.time}</span>
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-nextcare-primary" />
                <span>{booked.location} (Room {booked.room})</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={onSchedule}>
                Reschedule
              </Button>
              <Button variant="destructive" size="sm" className="flex-1" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}
        <Button 
          className="w-full bg-nextcare-primary hover:bg-nextcare-dark"
          onClick={() => setShowDoctors(true)}
        >
          Schedule New Appointment
        </Button>
        {/* Doctor booking dialog */}
        {selectedDoctor && (
          <DoctorProfileDialog
            doctor={selectedDoctor}
            open={showDialog}
            onClose={handleCloseDialog}
            onBook={(appointment) => {
              setBooked(appointment);
              setShowDoctors(false);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
