import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Add prop types
interface HeaderProps {
  scrollToCarePlan?: () => void;
  scrollToResources?: () => void;
}

const Header = ({ scrollToCarePlan, scrollToResources }: HeaderProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="nextcare-container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nextcare-primary">
            <span className="text-lg font-bold text-white">NC</span>
          </div>
          <span className="hidden md:block text-xl font-semibold text-nextcare-primary">
            NextCare
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="font-medium"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="font-medium"
                onClick={scrollToCarePlan ? scrollToCarePlan : () => navigate("/care-plan")}
              >
                Care Plan
              </Button>
              <Button
                variant="ghost"
                className="font-medium"
                onClick={scrollToResources ? scrollToResources : () => navigate("/education")}
              >
                Resources
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => navigate("/about")}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => navigate("/contact")}
              >
                Contact
              </Button>
            </>
          )}
        </nav>

        {/* User Actions & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                {language === "en" ? "English" : "Latviešu"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("lv")}>Latviešu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-4 text-sm text-muted-foreground">
                    No new notifications
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-nextcare-primary text-white">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/register")} className="bg-nextcare-primary hover:bg-nextcare-dark">
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavigate("/")}
            >
              Home
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={scrollToCarePlan ? scrollToCarePlan : () => handleNavigate("/care-plan")}
                >
                  Care Plan
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={scrollToResources ? scrollToResources : () => handleNavigate("/education")}
                >
                  Resources
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/profile")}
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={logout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/about")}
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/contact")}
                >
                  Contact
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/login")}
                >
                  Log in
                </Button>
                <Button
                  className="justify-start bg-nextcare-primary hover:bg-nextcare-dark"
                  onClick={() => handleNavigate("/register")}
                >
                  Sign up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
