import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function DesktopNav({ navigation, location }) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`${
              location.pathname === item.href
                ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </div>

      {/* Auth Buttons & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </div>
  );
}
