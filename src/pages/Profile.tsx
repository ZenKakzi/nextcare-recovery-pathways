import Layout from "@/components/common/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Shield, HeartPulse, Brain, Droplets, Bone, Stethoscope, User, Utensils, Smile } from "lucide-react";

const SYSTEMS = [
  { key: "endocrine", label: "Endocrine system", icon: <Utensils className="h-5 w-5 text-yellow-400" />, color: "bg-yellow-300" },
  { key: "urinary", label: "Urinary and reproductive system", icon: <User className="h-5 w-5 text-pink-400" />, color: "bg-pink-300" },
  { key: "skeletal", label: "Skeletal system", icon: <Bone className="h-5 w-5 text-blue-300" />, color: "bg-blue-300" },
  { key: "immune", label: "Immune system", icon: <Shield className="h-5 w-5 text-yellow-500" />, color: "bg-yellow-200" },
  { key: "digestive", label: "Digestive system", icon: <Utensils className="h-5 w-5 text-green-700" />, color: "bg-green-400" },
  { key: "cardio", label: "Cardiovascular system", icon: <HeartPulse className="h-5 w-5 text-pink-400" />, color: "bg-pink-200" },
  { key: "nervous", label: "Nervous system", icon: <Brain className="h-5 w-5 text-blue-400" />, color: "bg-blue-200" },
  { key: "respiratory", label: "Respiratory system", icon: <Droplets className="h-5 w-5 text-green-700" />, color: "bg-green-300" },
];

// Map conditions to system impact
const CONDITION_MAP = {
  diabetes: { endocrine: -4 },
  hypertension: { cardio: -3 },
  heart_disease: { cardio: -5 },
  asthma: { respiratory: -4 },
  copd: { respiratory: -5 },
  arthritis: { skeletal: -4 },
  cancer: { immune: -3 },
  stroke: { nervous: -4 },
  kidney_disease: { urinary: -4 },
  liver_disease: { digestive: -3 },
  thyroid_disorder: { endocrine: -2 },
  mental_health: { nervous: -3 },
  dementia: { nervous: -5 },
  other: {},
};

function calculateSystemScores(conditions: string[] = []) {
  // Start all at 10, subtract for each condition
  const scores: Record<string, number> = {
    endocrine: 10,
    urinary: 10,
    skeletal: 10,
    immune: 10,
    digestive: 10,
    cardio: 10,
    nervous: 10,
    respiratory: 10,
  };
  conditions.forEach(cond => {
    const impact = CONDITION_MAP[cond] || {};
    Object.entries(impact).forEach(([sys, val]) => {
      if (typeof val === 'number') {
        scores[sys] = Math.max(0, scores[sys] + val);
      }
    });
  });
  return scores;
}

// Utility to calculate age from date string
function calculateAge(dateOfBirth?: string): string | number {
  if (!dateOfBirth) return "-";
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return "-";
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const Profile = () => {
  const { user } = useAuth();
  // Type guard for medicalConditions
  const conditions: string[] = Array.isArray((user as any)?.medicalConditions)
    ? (user as any).medicalConditions
    : ["diabetes", "hypertension", "asthma"];
  const systemScores = calculateSystemScores(conditions);

  return (
    <Layout>
      <div className="nextcare-container py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <div className="bg-white rounded-lg shadow p-6 border mb-8">
          <div className="mb-4">
            <span className="block text-muted-foreground text-sm mb-1">Username</span>
            <span className="font-medium text-lg">{user?.username || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="block text-muted-foreground text-sm mb-1">Email</span>
            <span className="font-medium text-lg">{user?.email || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="block text-muted-foreground text-sm mb-1">Age</span>
            <span className="font-medium text-lg">{calculateAge(user?.dateOfBirth)}</span>
          </div>
          <div className="mb-4">
            <span className="block text-muted-foreground text-sm mb-1">Gender</span>
            <span className="font-medium text-lg">{user?.gender || "-"}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border">
          <h2 className="text-lg font-semibold mb-4">Health systems & general overview</h2>
          <div className="space-y-4">
            {SYSTEMS.map(sys => (
              <div key={sys.key} className="flex items-center gap-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${sys.color}`}>{sys.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{sys.label}</div>
                  <Progress value={systemScores[sys.key]} className="h-2 mt-1" />
                </div>
                <div className="flex items-center gap-1 min-w-[60px] justify-end">
                  <span className="font-bold text-lg">{systemScores[sys.key].toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">of 10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 