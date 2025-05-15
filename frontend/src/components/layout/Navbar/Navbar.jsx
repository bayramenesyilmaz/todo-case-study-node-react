import { useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  TagIcon,
} from "@heroicons/react/24/outline";


import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../../common/Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Yapılacaklar", href: "/todos", icon: ClipboardDocumentListIcon },
    { name: "Kategoriler", href: "/categories", icon: TagIcon },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b dark:bg-gray-800 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopNav navigation={navigation} location={location} />
          <AnimatePresence>
            <MobileNav
              navigation={navigation}
              location={location}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}