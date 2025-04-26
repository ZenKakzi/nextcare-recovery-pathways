import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  scrollToCarePlan?: () => void;
  scrollToResources?: () => void;
  isAuthenticated?: boolean;
}

const Layout = ({ children, scrollToCarePlan, scrollToResources, isAuthenticated }: LayoutProps) => {
  const { isAuthenticated: authContext } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        scrollToCarePlan={scrollToCarePlan}
        scrollToResources={scrollToResources}
        isAuthenticated={isAuthenticated ?? authContext}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
