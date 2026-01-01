const features = [
  {
    title: "Earn Rewards",
    description: "Recycle bottles and cans to earn points and rewards.",
    icon: "🏆",
  },
  {
    title: "Learn & Track",
    description: "Educate yourself and monitor your eco progress.",
    icon: "📘",
  },
  {
    title: "100% Free",
    description: "Enjoy all our features completely free of charge.",
    icon: "✅",
  },
];

export default function Features() {
  return (
    <section className="bg-emerald-50 py-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-emerald-100/75 bg-white rounded-xl shadow-lg shadow-emerald-200/75 p-8 text-center hover:shadow-xl hover:shadow-emerald-300/75 transition"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-emerald-700">
              {f.title}
            </h3>
            <p className="mt-3 text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
