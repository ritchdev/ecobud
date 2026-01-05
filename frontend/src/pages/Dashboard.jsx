import { useEffect, useState } from "react";
import { auth } from "../auth/firebase.auth.js";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/NavBar";

/* =======================
   MAIN DASHBOARD PAGE
======================= */

export default function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [loginStreak, setloginStreak] = useState(0)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;

      try {
        const token = await firebaseUser.getIdToken();

        const res = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        setCertificates(data.certificates || []);
        setStreak(data.loginStreak ?? 0)

      } catch (err) {
        console.error("Dashboard sync failed:", err);
      }
    });

    return unsub;
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-0 py-6 space-y-10">
        <WelcomeSection />
        <QuickActions />
        <MainGrid certificates={certificates} loginStreak={loginStreak} />
      </main>
    </div>
  );
}

/* =======================
   WELCOME SECTION
======================= */

function WelcomeSection() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-emerald-700">
        Welcome back
      </h1>
      <p className="text-gray-600 mt-1">
        Pick up where you left off on your eco journey
      </p>
    </section>
  );
}

/* =======================
   QUICK ACTIONS
======================= */

function QuickActions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ActionCard
        title="Learn & Earn"
        desc="Explore recycling lessons"
      />
      <ActionCard
        title="Contribute"
        desc="Log your recycling activity"
      />
      <ActionCard
        title="Certificates"
        desc="View earned certificates"
      />
    </section>
  );
}

function ActionCard({ title, desc }) {
  return (
    <div className="border border-emerald-200 rounded-xl p-5 hover:bg-emerald-50 transition">
      <h3 className="font-semibold text-emerald-700">
        {title}
      </h3>
      <p className="text-gray-600 mt-1 text-sm">
        {desc}
      </p>
    </div>
  );
}

/* =======================
   MAIN GRID (REBALANCED)
======================= */

function MainGrid({ certificates, loginStreak }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CertificatesSection certificates={certificates} />
      <StreakSection streak={loginStreak} />
    </section>
  );
}

/* =======================
   CERTIFICATES
======================= */

function CertificatesSection({ certificates }) {
  const ALL_CERTIFICATES = [
    { key: "RECYCLING_BASICS", label: "Recycling Basics" },
    { key: "PLASTIC_&_EWASTE", label: "Plastic & E-Waste" },
    { key: "SUSTAINABLE_LIVING", label: "Sustainable Living" },
  ];

  return (
    <div className="lg:col-span-2 border border-emerald-200 rounded-xl p-6">
      <h2 className="font-semibold text-emerald-700 mb-4">
        Your Certificates
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ALL_CERTIFICATES.map(cert => (
          <Certificate
            key={cert.key}
            title={cert.label}
            unlocked={certificates.includes(cert.key)}
          />
        ))}
      </div>
    </div>
  );
}

function Certificate({ title, unlocked }) {
  return (
    <div
      className={`border rounded-lg p-4 text-center text-sm ${unlocked
          ? "border-emerald-300 text-emerald-700"
          : "border-gray-300 text-gray-400"
        }`}
    >
      {unlocked ? title : "Locked"}
    </div>
  );
}

/* =======================
   STREAK (SIDEBAR CARD)
======================= */

function StreakSection({ streak }) {
  return (
    <div className="border border-emerald-200 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-emerald-700 mb-2">
          Current Streak
        </h2>

        <p className="text-4xl font-bold text-emerald-600">
          {streak}
        </p>

        <p className="text-sm text-gray-600">
          days in a row
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Keep learning daily to grow your streak 🌱
      </p>
    </div>
  );
}
