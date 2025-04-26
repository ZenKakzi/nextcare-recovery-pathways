import React from "react";

const insights = [
  {
    title: "Log your symptoms",
    type: "action",
    color: "bg-white",
    icon: "+",
  },
  {
    title: "Early cycle energy hacks",
    type: "info",
    color: "bg-green-900 text-white",
    icon: "⚡",
  },
  {
    title: "Today's recommended exercises",
    type: "info",
    color: "bg-blue-200",
    icon: "🏃‍♂️",
    description: "Try 30 min walk, 10 min stretching",
  },
  {
    title: "Hydration (5L per day)",
    type: "info",
    color: "bg-cyan-100",
    icon: "💧",
    description: "Keep sipping water throughout the day!",
  },
];

const DailyInsights = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">My daily insights · Today</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`min-w-[180px] rounded-xl p-4 shadow-sm ${insight.color} flex flex-col items-center justify-center border`}
          >
            <div className="text-2xl mb-2">{insight.icon}</div>
            <div className="text-center font-medium">
              {insight.title}
            </div>
            {insight.description && (
              <div className="text-xs text-muted-foreground mt-2 text-center">{insight.description}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyInsights; 