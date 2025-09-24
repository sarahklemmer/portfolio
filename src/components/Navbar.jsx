"use client";

import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "header", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "interests", label: "Interests" },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("Home");
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show navbar when scrolling down
      if (scrollPosition > viewportHeight / 2) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      // Skip section detection if user just clicked a navigation item
      if (isManualNavigation) return;

      // Update current section based on scroll position
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
        label: item.label,
      }));

      // Check if we're near the bottom of the page
      const isNearBottom =
        window.innerHeight + window.scrollY >= documentHeight - 200;

      if (isNearBottom) {
        setCurrentSection("Interests");
        return;
      }

      const current = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        // For experience section, use a larger threshold
        if (section.id === "experience") {
          return rect.top <= 200 && rect.bottom >= 100;
        }
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setCurrentSection(current.label);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualNavigation]);

  const scrollToSection = (sectionId) => {
    if (sectionId === "header") {
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setCurrentSection("Home");
      setIsDropdownOpen(false);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const navItem = navItems.find((item) => item.id === sectionId);
      if (navItem) {
        setCurrentSection(navItem.label);
      }

      setIsManualNavigation(true);

      const navbarHeight = document.querySelector("nav")?.clientHeight || 0;
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: sectionPosition - navbarHeight,
        behavior: "smooth",
      });

      // Reset the flag after the scroll animation is likely complete
      setTimeout(() => {
        setIsManualNavigation(false);
      }, 2000);

      setIsDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showNavbar
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Mobile Dropdown */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span
                className={`font-semibold ${currentSection === "Home"
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                {currentSection}
              </span>
              <FaChevronDown
                className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="py-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-2 text-sm 
                        ${currentSection === item.label
                          ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/10"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors
                    ${currentSection === item.label
                      ? "text-pink-600 dark:text-pink-400 font-semibold"
                      : showNavbar
                        ? "text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                        : "text-gray-600/80 dark:text-gray-300/80 hover:text-pink-600 dark:hover:text-pink-400"
                    }`}
                >
                  {item.label}
                </button>

                <AnimatePresence>
                  {currentSection === item.label && (
                    <motion.div
                      className="absolute bottom-[-8px] h-0.5 bg-pink-600 dark:bg-pink-400 rounded-full w-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
