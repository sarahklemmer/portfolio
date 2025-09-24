"use client";

import { useEffect, useRef, useState } from "react";

interface BaseGoal {
  name: string;
  emoji: string;
  color: string;
}

interface QuantityGoal extends BaseGoal {
  type: "quantity";
  current: number;
  target: number;
}

interface TimelineGoal extends BaseGoal {
  type: "timeline";
  startDate: string;
  endDate: string;
}

type Goal = QuantityGoal | TimelineGoal;

const goals: Goal[] = [
  {
    type: "timeline",
    name: "Half Marathon",
    emoji: "🏃‍♂️",
    color: "from-pink-500 to-pink-600",
    startDate: "2025-04-01",
    endDate: "2025-10-04",
  },
  {
    type: "quantity",
    name: "Reading Goal",
    current: 2,
    target: 10,
    emoji: "📚",
    color: "from-purple-500 to-purple-600",
  },
  {
    type: "timeline",
    name: "TritonMan 2026",
    startDate: "2025-04-01",
    endDate: "2026-03-01",
    emoji: "🏃‍♂️",
    color: "from-pink-500 to-pink-600",
  },
  {
    type: "quantity",
    name: "Hackathon Wins",
    current: 1,
    target: 3,
    emoji: "🏆",
    color: "from-green-500 to-green-600",
  },
];

function calculateTimelineProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (now < start) return 0;
  if (now >= end) return 100;

  const total = end - start;
  const elapsed = now - start;
  return (elapsed / total) * 100;
}

function formatDate(date: string): string {
  // Create a date object and adjust for timezone
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GoalsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-2xl mx-auto py-8">
      <div className="space-y-6">
        {goals.map((goal, index) => {
          const percentage =
            goal.type === "quantity"
              ? (goal.current / goal.target) * 100
              : calculateTimelineProgress(goal.startDate, goal.endDate);

          const progressText =
            goal.type === "quantity"
              ? `${goal.current} / ${goal.target}`
              : `${formatDate(goal.startDate)} → ${formatDate(goal.endDate)}`;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">
                  {goal.emoji} {goal.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {progressText}
                </span>
              </div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                <div
                  className={`h-full bg-gradient-to-r ${goal.color
                    } transition-all duration-1000 ease-out ${isVisible ? "hover:brightness-110" : ""
                    }`}
                  style={{
                    width: isVisible ? `${percentage}%` : "0%",
                  }}
                >
                  <div className="h-full flex items-center justify-end pr-2">
                    <span className="text-xs text-white font-medium">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
