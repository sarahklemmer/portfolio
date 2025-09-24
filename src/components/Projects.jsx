"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlus, FaMinus } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects";
import { useTheme } from "next-themes";
import Image from "next/image";

function ThemedCard({ children, className = "" }) {
  const { resolvedTheme } = useTheme();
  const bgClass =
    resolvedTheme === "light"
      ? "bg-white border border-neutral-200 hover:border-neutral-300"
      : "bg-slate-800/80 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600";
  return (
    <Card
      className={`h-full transition-all duration-300 shadow-lg cursor-pointer ${bgClass} ${className}`}
    >
      {children}
    </Card>
  );
}

export default function Projects() {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 2);
  const hiddenProjectsCount = projects.length - 2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {visibleProjects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          isExpanded={expandedCardIndex === index}
          setExpandedCardIndex={setExpandedCardIndex}
        />
      ))}

      {!showAllProjects && hiddenProjectsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2 * 0.1 }}
          whileHover={{
            y: -5,
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.25), 0 8px 10px -6px rgba(0,0,0,0.18)",
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          className={`h-full ${visibleProjects.length % 2 === 0
            ? "lg:col-start-1 md:col-start-1 col-span-1"
            : "lg:col-start-2 md:col-start-2 col-span-1"
            }`}
          onClick={() => setShowAllProjects(true)}
        >
          <ThemedCard className="cursor-pointer flex flex-col items-center justify-center">
            <CardHeader className="p-4 text-center">
              <CardTitle>Show {hiddenProjectsCount} More Projects</CardTitle>
              <CardDescription>Click to view all my work</CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-1 flex items-center justify-center">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="rounded-full bg-secondary w-16 h-16 flex items-center justify-center mb-4">
                  <FaPlus className="h-8 w-8 text-secondary-foreground" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Explore {hiddenProjectsCount} additional projects in my
                  portfolio
                </p>
              </div>
            </CardContent>
          </ThemedCard>
        </motion.div>
      )}

      {showAllProjects && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{
            y: -5,
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.25), 0 8px 10px -6px rgba(0,0,0,0.18)",
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          className={`h-full ${projects.length % 2 === 0
            ? "lg:col-start-1 md:col-start-1 col-span-1"
            : "lg:col-start-2 md:col-start-2 col-span-1"
            }`}
          onClick={() => setShowAllProjects(false)}
        >
          <ThemedCard className="cursor-pointer flex flex-col items-center justify-center">
            <CardHeader className="p-4 text-center">
              <CardTitle>Show Fewer Projects</CardTitle>
              <CardDescription>Return to featured work</CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-1 flex items-center justify-center">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="rounded-full bg-secondary w-16 h-16 flex items-center justify-center mb-4">
                  <FaMinus className="h-8 w-8 text-secondary-foreground" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Display only featured projects
                </p>
              </div>
            </CardContent>
          </ThemedCard>
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, isExpanded, setExpandedCardIndex }) {
  const handleInteraction = () => {
    setExpandedCardIndex(isExpanded ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0,0,0,0.25), 0 8px 10px -6px rgba(0,0,0,0.18)",
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="h-full min-h-[360px] group"
      onClick={handleInteraction}
    >
      <ThemedCard className="h-full">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-extrabold text-2xl">
              {project.title}
            </CardTitle>
            <div className="transform transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <CardDescription className="h-[48px] flex items-end">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {project.image && (
            <div className="w-full h-56 flex items-center justify-center overflow-hidden rounded-md mb-4 bg-white/5">
              <Image
                src={project.image}
                alt="Sarah Klemmer"
                className="object-contain max-h-full max-w-full"
                width={400 * (project.imageScale || 1)}
                height={300 * (project.imageScale || 1)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzY3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzb/2wBDAR0dHh4eHRoaHSQtJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {project.github && (
                <Button
                  className="h-9 rounded-md px-3 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.github) {
                      window.open(project.github, "_blank");
                    }
                  }}
                >
                  <FaGithub className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              )}

              {project.live && (
                <Button
                  className="h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.live) {
                      window.open(project.live, "_blank");
                    }
                  }}
                >
                  <FaExternalLinkAlt className="h-4 w-4 mr-2" />
                  View Project
                </Button>
              )}
              {project.links && project.links.length > 0 && (
                project.links.map((lnk, i) => (
                  <Button
                    key={i}
                    className="h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (lnk.url) window.open(lnk.url, "_blank");
                    }}
                  >
                    <FaExternalLinkAlt className="h-4 w-4 mr-2" />
                    {lnk.label}
                  </Button>
                ))
              )}
            </div>
          </motion.div>
        </CardContent>
      </ThemedCard>
    </motion.div>
  );
}
