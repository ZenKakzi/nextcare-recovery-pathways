import React, { useState } from "react";

const initialInsights = [
  {
    title: "Add daily tasks",
    type: "action",
    color: "bg-white",
    icon: "+",
    isTaskManager: true,
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
  const [insights] = useState(initialInsights);
  const [tasks, setTasks] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const handleAddTask = () => {
    setShowInput(true);
    setEditIdx(null);
    setInputValue("");
  };

  const handleSaveTask = () => {
    if (inputValue.trim() === "") return;
    if (editIdx !== null) {
      setTasks(tasks.map((t, i) => (i === editIdx ? inputValue : t)));
    } else {
      setTasks([...tasks, inputValue]);
    }
    setShowInput(false);
    setInputValue("");
    setEditIdx(null);
  };

  const handleEditTask = (idx: number) => {
    setEditIdx(idx);
    setInputValue(tasks[idx]);
    setShowInput(true);
  };

  const handleDeleteTask = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    if (editIdx === idx) {
      setShowInput(false);
      setEditIdx(null);
      setInputValue("");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">My daily insights · Today</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`min-w-[180px] rounded-xl p-4 shadow-sm ${insight.color} flex flex-col items-center justify-center border`}
          >
            <button
              className="text-2xl mb-2 focus:outline-none"
              style={{ background: "none", border: "none", cursor: insight.isTaskManager ? "pointer" : "default" }}
              onClick={insight.isTaskManager ? handleAddTask : undefined}
              aria-label={insight.isTaskManager ? "Add Task" : undefined}
              type="button"
            >
              {insight.icon}
            </button>
            <div className="text-center font-medium">{insight.title}</div>
            {insight.isTaskManager && (
              <div className="w-full mt-2">
                {tasks.length > 0 && (
                  <ul className="space-y-1">
                    {tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
                        <span>{task}</span>
                        <span className="flex gap-1">
                          <button className="text-xs text-blue-500 underline" onClick={() => handleEditTask(tIdx)} type="button">Edit</button>
                          <button className="text-xs text-red-500 underline" onClick={() => handleDeleteTask(tIdx)} type="button">Delete</button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {showInput && (
                  <div className="flex gap-2 mt-2">
                    <input
                      className="border rounded px-2 py-1 text-sm flex-1"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder="Enter task..."
                      autoFocus
                    />
                    <button className="text-xs text-green-600 font-semibold" onClick={handleSaveTask} type="button">
                      {editIdx !== null ? "Update" : "Add"}
                    </button>
                    <button className="text-xs text-gray-500" onClick={() => { setShowInput(false); setInputValue(""); setEditIdx(null); }} type="button">Cancel</button>
                  </div>
                )}
              </div>
            )}
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