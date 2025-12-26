import { useState } from "react";

const faqs = [
  ["What is GreenDrop?", "Smart recycling platform with rewards"],
  ["How do I earn points?", "Recycle bottles and cans"],
  ["Is it free?", "Yes, completely free"],
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-10 max-w-3xl mx-auto">
      <h2 className="text-3xl text-green-700 text-center mb-6">FAQ</h2>

      {faqs.map(([q, a], i) => (
        <div key={i} className="border-b">
          <button
            onClick={() => setActive(active === i ? null : i)}
            className="w-full flex justify-between py-4 font-semibold text-green-700"
          >
            {q}
            <span>{active === i ? "−" : "+"}</span>
          </button>

          {active === i && <p className="pb-4 text-gray-600">{a}</p>}
        </div>
      ))}
    </section>
  );
}
