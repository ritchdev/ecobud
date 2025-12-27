import { useState } from "react";

const faqs = [
  ["What is EcoBud?",
    "EcoBud is a smart recycling and environmental awareness platform designed to help users build sustainable habits. It combines education, tracking, and rewards to encourage responsible recycling and positive environmental action."],
  ["How do I earn points on EcoBud?",
    "You can earn points by actively recycling items such as bottles and cans through EcoBud. Each recycling action contributes to your points, helping you track your impact while staying motivated to recycle consistently."],
  ["Is EcoBud free to use?",
    "Yes, EcoBud is completely free to use. All features, including educational content, recycling tracking, and rewards, are available at no cost to users."],
  ["How does EcoBud help me learn about recycling?", "EcoBud offers curated videos and educational content to help you understand how recycling protects the environment. As you progress, you can earn certificates to showcase your learning and impact."]
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-10 px-7 w-full mx-auto">
      <h2 className="font-semibold text-3xl text-green-700 text-center mb-6">FAQ</h2>
      {faqs.map(([q, a], i) => (
        <div key={i} className="border-b-1 border-neutral-500 rounded-b-lg">
          <button
            onClick={() => setActive(active === i ? null : i)}
            className={`w-full flex justify-between py-4 font-semibold text-gray-100 ${active==i ? "rounded-t-xl" : "rounded-xl"}`}
          >
            {q}
            <span>{active === i ? "−" : "+"}</span>
          </button>

          {active === i && <p className="py-4 px-10 text-gray-300 bg-neutral-900 rounded-b-xl">{a}</p>}
        </div>
      ))}
    </section>
  );
}
