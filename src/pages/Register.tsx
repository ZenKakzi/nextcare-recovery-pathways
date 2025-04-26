
import Layout from "@/components/common/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <Layout>
      <div className="nextcare-container py-12">
        <div className="max-w-md mx-auto">
          <AuthForm type="register" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
