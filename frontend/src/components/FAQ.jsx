// import { useState } from "react";

// const faqs = [
//   ["What is EcoBud?",
//     "EcoBud is a smart recycling and environmental awareness platform designed to help users build sustainable habits. It combines education, tracking, and rewards to encourage responsible recycling and positive environmental action."],
//   ["How do I earn points on EcoBud?",
//     "You can earn points by actively recycling items such as bottles and cans through EcoBud. Each recycling action contributes to your points, helping you track your impact while staying motivated to recycle consistently."],
//   ["Is EcoBud free to use?",
//     "Yes, EcoBud is completely free to use. All features, including educational content, recycling tracking, and rewards, are available at no cost to users."],
//   ["How does EcoBud help me learn about recycling?", "EcoBud offers curated videos and educational content to help you understand how recycling protects the environment. As you progress, you can earn certificates to showcase your learning and impact."]
// ];

// export default function FAQ() {
//   const [active, setActive] = useState(null);

//   return (
//     <section className="py-10 px-7 w-full mx-auto">
//       <h2 className="font-semibold text-3xl text-green-700 text-center mb-6">FAQ</h2>
//       {faqs.map(([q, a], i) => (
//         <div key={i} className="border-b-1 border-neutral-500 rounded-b-lg">
//           <button
//             onClick={() => setActive(active === i ? null : i)}
//             className={`w-full bg-slate-600 flex justify-between py-4 font-semibold text-gray-100 ${active==i ? "rounded-t-xl" : "rounded-xl"}`}
//           >
//             {q}
//             <span>{active === i ? "−" : "+"}</span>
//           </button>

//           {active === i && <p className="py-4 px-10 text-gray-300 bg-neutral-900 rounded-b-xl">{a}</p>}
//         </div>
//       ))}
//     </section>
//   );
// }

import { useState } from "react";
import { Plus } from "lucide-react";

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
    <section id="faq" className="scroll-mt-22">
      <section className="bg-emerald-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-700 text-shadow-lg/30 text-shadow-emerald-300">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-600">
              Everything you need to know about EcoBud
            </p>
          </div>
          {/* FAQ items */}
          <div className="space-y-4">
            {faqs.map((item, i) => {    //For each item in the array, it returns everything below
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`
                      w-full flex justify-between items-center
                      px-6 py-4 text-left font-semibold
                      text-gray-800
                      hover:bg-emerald-50 transition
                      focus:outline-none
                      ${isOpen ? "rounded-t-xl" : "rounded-xl"}
                    `}
                  >
                    {item.q}
                    <Plus
                      className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                        }`}
                    />
                  </button>
                  {/* Answer */}
                  {openIndex === i &&
                    <div
                      className={`transition-all duration-300 overflow-hidden pb-2`}
                    >
                      <p className="px-5 py-4 text-gray-600">
                        {item.a}
                      </p>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="h-24 w-full bg-[linear-gradient(to_bottom,#ecfdf5_0%,#d1fae5_60%,#a7f3d0_85%)]" />
    </section>
    
  );
}

