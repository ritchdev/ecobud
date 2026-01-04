import { useState } from "react";
import Navbar from "../components/NavBar";

export default function Learn() {
  return (
    <div className="w-screen bg-emerald-50">
      <Navbar />
      <div className="px-10 py-5">
        <h2 className="text-emerald-700 font-semibold text-1xl pl-2">Explore a library of resources to help you educate yourself about being more eco-friendly</h2>
        <h3 className="text-emerald-700 text-md pl-2 pb-5">Take the tests at the end of each section to earn a Certificate!</h3>
        <LearnSection
          title="Recycling Basics"
          description="Understand what recycling is and why it matters."
        />
        <LearnSection
          title="Plastic & E-Waste"
          description="Learn how plastics and electronics affect the planet."
        />
        <LearnSection
          title="Sustainable Living"
          description="Everyday habits that reduce your environmental footprint."
        />
      </div>
    </div>
  );
}


function LearnSection({ title, description, }) {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      type: i % 2 === 0 ? "video" : "article",
      title:
        i % 2 === 0
          ? `Watch: Recycling Basics ${i + 1}`
          : `Read: Recycling Guide ${i + 1}`,
      completed: false,
    }))
  );

  const allCompleted = items.every(item => item.completed);

  function toggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }
  return (
    <section className="border border-emerald-400 rounded-xl bg-white mb-10">

      {/* Header */}
      <div className="border-b border-emerald-200 p-6">
        <h2 className="text-xl font-semibold text-emerald-700">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {description}
        </p>
      </div>

      {/* Learning Flow */}
      <LearningFlow
        items={items}
        onToggle={toggleItem}
      />

      {/* Footer */}
      <div className="border-t border-emerald-200 p-6 flex justify-end">
        <button 
        disabled={!allCompleted} 
        className={`border px-5 py-2 rounded-lg text-sm font-medium ${allCompleted ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50" : "border-gray-300 text-gray-400 cursor-not-allowed"} `}
        onClick={() => {
          //Open Quiz
        }}
        >
          Take The Test
        </button>
      </div>
    </section>
  );
}


function LearningFlow({ items, onToggle }) {
  return (
    <div className="p-6 space-y-4">
      {items.map((item, index) => (
        <FlowItem
          key={item.id}
          item={item}
          index={index}
          isLast={index === items.length - 1}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}


function FlowItem({ item, index, onToggle, isLast }) {
  return (
    <div className="flex gap-4 items-start">

      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium
            ${item.completed
              ? "border-emerald-600 text-emerald-700"
              : "border-gray-300 text-gray-400"
            }`}
        >
          {index + 1}
        </div>

        {!isLast && (
          <div className="w-px h-10 bg-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between ${item.completed ? "bg-emerald-100" : "bg-white"}`}>
        <div>
          <p className="text-sm text-gray-700">
            {item.title}
          </p>
          <span className="text-xs text-gray-500">
            {item.type === "video" ? "Video" : "Article"}
          </span>
        </div>

        <button
          onClick={onToggle}
          className={`text-xs px-3 py-1 rounded-md border transition ${item.completed
              ? "border-gray-300 text-gray-400"
              : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            }`}
        >
          {item.completed
            ? item.type === "video"
              ? "Seen"
              : "Read"
            : item.type === "video"
              ? "Mark Seen"
              : "Mark Read"}
        </button>
      </div>
    </div>
  );
}

