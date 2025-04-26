import Layout from "@/components/common/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="nextcare-container py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <div className="bg-white rounded-lg shadow p-6 border">
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
            <span className="font-medium text-lg">{user?.age || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="block text-muted-foreground text-sm mb-1">Gender</span>
            <span className="font-medium text-lg">{user?.gender || "-"}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 