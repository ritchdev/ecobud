import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is EcoBud?",
    a: "EcoBud is a smart recycling and environmental awareness platform that helps users build sustainable habits through education, tracking, and rewards."
  },
  {
    q: "How do I earn points on EcoBud?",
    a: "You earn points by recycling bottles and cans through EcoBud. Each action contributes to your impact and progress."
  },
  {
    q: "Is EcoBud free to use?",
    a: "Yes, EcoBud is completely free. All features including learning resources and certificates are available at no cost."
  },
  {
    q: "How does EcoBud help me learn about recycling?",
    a: "EcoBud provides short educational videos and learning modules focused on practical recycling habits and environmental awareness."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-emerald-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-700">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600">
            Everything you need to know about EcoBud
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((item, i) => {    //For each item in the array, it returns everything below
            const open = openIndex === i; 

            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open ? null : i)}
                  className={`
                    w-full flex justify-between items-center
                    px-6 py-4 text-left font-semibold
                    text-gray-800
                    hover:bg-emerald-50 transition
                    focus:outline-none
                    ${open ? "rounded-t-xl" : "rounded-xl"}
                  `}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 text-emerald-600 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    open ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-gray-600">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
