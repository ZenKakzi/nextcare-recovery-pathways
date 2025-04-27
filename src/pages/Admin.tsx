import { useEffect, useState } from "react";
import Layout from "@/components/common/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Patient {
  email: string;
  username?: string;
  dateOfBirth?: string;
  gender?: string;
  password?: string;
  isAdmin?: boolean;
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

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Patient>>({});

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/login");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setPatients(users.filter((u: Patient) => !u.isAdmin));
  }, [user, navigate]);

  const handleDelete = (index: number) => {
    const updated = [...patients];
    updated.splice(index, 1);
    setPatients(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(patients[index]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    if (editIndex === null) return;
    const updated = [...patients];
    updated[editIndex] = { ...updated[editIndex], ...editData };
    setPatients(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setEditIndex(null);
    setEditData({});
  };

  return (
    <Layout>
      <div className="nextcare-container py-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administrator Panel</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, idx) => (
                <tr key={idx} className="border-b">
                  {editIndex === idx ? (
                    <>
                      <td className="p-2 border">
                        <input
                          className="border rounded px-2 py-1 w-32"
                          name="username"
                          value={editData.username || ""}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          className="border rounded px-2 py-1 w-48"
                          name="email"
                          value={editData.email || ""}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          className="border rounded px-2 py-1 w-32"
                          type="date"
                          name="dateOfBirth"
                          value={editData.dateOfBirth || ""}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2 border">
                        <select
                          className="border rounded px-2 py-1 w-24"
                          name="gender"
                          value={editData.gender || ""}
                          onChange={handleEditChange}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td className="p-2 border">
                        <Button size="sm" onClick={handleEditSave}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditIndex(null)} className="ml-2">Cancel</Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border">{patient.username}</td>
                      <td className="p-2 border">{patient.email}</td>
                      <td className="p-2 border">{calculateAge(patient.dateOfBirth)}</td>
                      <td className="p-2 border">{patient.gender}</td>
                      <td className="p-2 border">
                        <Button size="sm" onClick={() => handleEdit(idx)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)} className="ml-2">Delete</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Admin; 