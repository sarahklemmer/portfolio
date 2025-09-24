import Image from "next/image";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
} from "react-icons/fa";
import { motion } from "framer-motion";

const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function HeroSection() {
  const [showArrow, setShowArrow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowArrow(window.scrollY < window.innerHeight / 2);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleArrowClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate parallax effect based on device
  const getParallaxStyle = (multiplier) => {
    if (isMobile) {
      return { y: 0 }; // No parallax on mobile
    }
    return { y: scrollY * multiplier };
  };

  return (
    <section className="container pt-24 min-h-[85vh] md:min-h-screen flex flex-col md:flex-row gap-12 items-center max-w-4xl relative overflow-hidden pb-16">
      <motion.div
        className="flex-1 order-2 md:order-1 flex flex-col justify-center"
        style={getParallaxStyle(0.2)}
      >
        <FloatingElement delay={0.2}>
          <div className="flex items-center gap-3 mb-8">
            <TextGenerateEffect
              words="Hi, I'm Sarah Klemmer 👋"
              className="text-5xl sm:text-6xl font-bold"
            />
          </div>
        </FloatingElement>

        <FloatingElement delay={0.4}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            I'm a third-year at <strong>University of Michigan</strong>, majoring in{" "}
            <strong>Computer Science</strong> and <strong>Cognitive Science</strong>{" "}
            and minoring in <strong>Economics</strong>. As an active member of{" "}
            <i>Triton Unmanned Aerial Systems</i> (TUAS) and{" "}
            <i>Triton Consulting Group</i> (TCG), I collaborate with fellow
            students to deliver real-world projects while gaining hands-on
            experience in full-stack development and technical consulting.
          </p>
        </FloatingElement>

        <FloatingElement delay={0.6}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            In my free time, I enjoy discovering new music, playing basketball,
            and expanding my vinyl collection. I'd love to connect and chat
            about any of these interests or tech in general, so feel free to
            reach out!
          </p>
        </FloatingElement>

        <FloatingElement delay={0.8}>
          <div className="flex flex-col gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:sarahmklemmer@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <FaEnvelope className="h-5 w-5" />
              Contact Me
            </motion.a>

            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/sarahklemmer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/sarahklemmer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/Sarah_Klemmer_CV_9_25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-transparent dark:border-gray-700 bg-gray-900 dark:bg-gray-800 text-white rounded-lg py-2 px-4 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 transition-colors"
                aria-label="Download Resume"
              >
                <FaFileDownload className="h-4 w-4" />
                <span className="hidden sm:inline">Download Resume</span>
              </motion.a>
            </div>
          </div>
        </FloatingElement>
      </motion.div>

      <motion.div
        className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-md mt-16 order-1 md:order-2"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.21, 1.11, 0.81, 0.99],
        }}
        style={getParallaxStyle(-0.2)}
      >
        <Image
          src="/assets/new-profile-picture.jpg"
          alt="Sarah Klemmer"
          fill
          sizes="(max-width: 768px) 256px, 256px"
          quality={95}
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
          priority
        />
      </motion.div>

      {showArrow && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to projects"
          onClick={handleArrowClick}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-md p-2 z-20 animate-bounce border border-gray-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <FaChevronDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </motion.button>
      )}
    </section>
  );
}
