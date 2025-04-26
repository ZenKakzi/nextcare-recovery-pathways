
import Layout from "@/components/common/Layout";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <Layout>
      <div className="nextcare-container py-12">
        <div className="max-w-md mx-auto">
          <AuthForm type="login" />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
