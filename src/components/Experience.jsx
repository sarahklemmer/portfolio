"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Development Intern",
    company: "CGI",
    url: "",
    date: "June 2025 – Present",
    description: (
      <ul className="list-disc ml-5">
        <li>
          Developed automated pod testing framework, creating 20+ comprehensive tests
          across Tanzu Management and Calico cluster environments, catching 15+ bugs
          and enhancing system reliability and performance.
        </li>
        <li>
          Built search bot systems with daily testing cycles for both Tanzu Management
          and Calico clusters within the Managed IP Cloud infrastructure, automating
          network management tasks and improving efficiency.
        </li>
        <li>
          Collaborated with a 10-person global team across 4 time zones in DevOps
          Agile ceremonies, ensuring project alignment, timely delivery of features,
          and effective communication.
        </li>
        <li>
          Documented process for adding new tests to automated pod testing framework,
          ensuring future scalability for test additions; wrote a white paper to help
          team and clients understand importance of different testing strategies.
        </li>
      </ul>
    ),
  },
  {
    title: "Software Engineering Intern",
    company: "Teidore",
    url: "",
    date: "June 2024 – Aug 2024",
    description: (
      <ul className="list-disc ml-5">
        <li>
          Self-taught React.js and built interactive web interfaces within 3 weeks,
          delivering a responsive user experience.
        </li>
        <li>
          Utilized BeautifulSoup to scrape partner websites for data, integrating it
          into site and automating data collection process to enhance site
          functionality and user experience.
        </li>
      </ul>
    ),
  },
  {
    title: "Independent Researcher",
    company: "Michigan Alzheimer’s Disease Center",
    url: "",
    date: "Sept. 2023 – Present",
    description: (
      <ul className="list-disc ml-5">
        <li>
          Conducted statistical analysis on 13,621 patient records with R to explore
          dementia-anxiety-alcohol correlations, identifying key patterns and
          contributing to ongoing research.
        </li>
        <li>
          Presented research findings to 200+ faculty, students, and professionals
          at UROP symposium, receiving positive feedback and securing a faculty
          recommendation for publication.
        </li>
      </ul>
    ),
  },
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  // Calculate which timeline item is closest to the center of the viewport
  useEffect(() => {
    if (experiences.length === 0) return;

    const calculateClosestItem = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    calculateClosestItem();
    window.addEventListener("scroll", calculateClosestItem);
    window.addEventListener("resize", calculateClosestItem);
    return () => {
      window.removeEventListener("scroll", calculateClosestItem);
      window.removeEventListener("resize", calculateClosestItem);
    };
  }, [activeIndex, experiences.length]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-12 text-center">Experience</h2>
      <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-slate-700 dark:bg-slate-600 transform md:-translate-x-1/2 z-0" />
      <div className="space-y-12 relative">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={index}
            experience={experience}
            index={index}
            isActive={index === activeIndex}
            ref={(el) => (itemRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

const TimelineItem = forwardRef(function TimelineItem(
  { experience, index, isActive },
  ref
) {
  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
        }`}
    >
      <motion.div
        className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div
          className={`${isActive
              ? "bg-white dark:bg-slate-900 border-blue-900 dark:border-cyan-300 border-2 scale-[1.02]"
              : "bg-white dark:bg-slate-900 border-neutral-200 dark:border-slate-700 border-2"
            } rounded-lg p-6 shadow-lg transition-all duration-300 relative z-20 text-gray-900 dark:text-white`}
        >
          <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
          <h4 className="text-lg font-semibold text-blue-900 dark:text-cyan-300 mb-1">
            {experience.url ? (
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {experience.company}
              </a>
            ) : (
              experience.company
            )}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {experience.date}
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            {experience.description}
          </p>
        </div>
      </motion.div>
      <div className="flex items-center justify-center z-10">
        <div
          className={`w-8 h-8 rounded-full transition-colors duration-300 border-4 border-neutral-200 dark:border-slate-700 ${isActive
              ? "bg-blue-900 dark:bg-cyan-400"
              : "bg-gray-200 dark:bg-slate-700"
            } flex items-center justify-center`}
        >
          <span
            className={`${isActive
                ? "text-white dark:text-cyan-900"
                : "text-blue-900 dark:text-cyan-300"
              } text-sm font-bold`}
          >
            {index + 1}
          </span>
        </div>
      </div>
      <div className="flex-1 hidden md:block"></div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";
