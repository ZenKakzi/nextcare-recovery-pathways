
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nextcare-light dark:bg-nextcare-dark mt-auto">
      <div className="nextcare-container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nextcare-primary">
                <span className="text-lg font-bold text-white">NC</span>
              </div>
              <span className="text-xl font-semibold text-nextcare-primary dark:text-white">
                NextCare
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Personalized care plans and readmission risk prediction for better patient outcomes.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Button>
              <Button size="icon" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              <Button size="icon" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Button>
              <Button size="icon" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-nextcare-primary dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/care-plan" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Care Plans
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-bold text-nextcare-primary dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/education" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Education Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="font-bold text-nextcare-primary dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-nextcare-primary" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Healthcare Avenue<br />
                  Riga, Latvia
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-nextcare-primary" />
                <a href="tel:+37112345678" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  +371 1234 5678
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-nextcare-primary" />
                <a href="mailto:info@nextcare-app.com" className="text-gray-600 dark:text-gray-300 hover:text-nextcare-primary dark:hover:text-white">
                  info@nextcare-app.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {currentYear} NextCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
