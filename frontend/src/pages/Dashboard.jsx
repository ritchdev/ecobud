{/*
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ActionCard from "../components/ActionCard";

function getGreeting(){
    const currentTime = new Date()
    const hours = currentTime.getHours()
    const greeting = hours < 12 ? "Morning" : hours < 16 ?  "Afternoon" : "Evening"
    return greeting
}

export default function Dashboard() {
  return (
    <div className="min-h-screen w-screen bg-emerald-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        <section className="bg-white rounded-2xl p-6 shadow flex items-center justify-between">
          <div className="flex-1 bg-yellow-500">
              <h1 className="text-2xl font-semibold text-emerald-700">
                {`Good ${getGreeting()}!` }
              </h1>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">
              Streak
            </h2>
            <p className="text-4xl font-bold text-emerald-600">
              7 🔥
            </p>
            <p className="text-gray-500 mt-1">
              days in a row
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Learn & Earn"
            desc="Explore recycling lessons"
            to="/learn"
          />
          <ActionCard
            title="Contribute"
            desc="Log your recycling activity"
            to="/contribute"
          />
          <ActionCard
            title="Certificates"
            desc="View your earned certificates"
            to="/certificates"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              Your Certificates
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              Achievements
            </h2>
            <ul className="space-y-3">
              <li>♻️ First Recycle</li>
              <li>🔥 7-Day Streak</li>
              <li>📚 Learning Starter</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">
              Your Impact
            </h2>
            <p className="text-gray-600">
              You’ve helped recycle <strong>23 items</strong> 🌍
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}
*/}

import { useEffect, useState } from "react";
import { auth } from "../auth/firebase.auth.js";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

/* =======================
   MAIN DASHBOARD PAGE
======================= */

export default function Dashboard() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();

        const res = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Backend error");

        // const data = await res.json();
        console.log(res);

      } catch (err) {
        console.error("Dashboard sync failed:", err);
      }
    });

    return unsub;
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-0 py-5 space-y-8">
        <WelcomeSection />
        <QuickActions />
        <MainGrid />
      </main>
    </div>
  );
}

/* =======================
   WELCOME SECTION
======================= */

function WelcomeSection() {
  return (
    <section className="rounded-xl p-0 bg-white">
      <h1 className="text-2xl font-semibold text-emerald-700">
        Welcome back
      </h1>
      <p className="text-gray-600 mt-1">
        You’re on a 7-day login streak
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
   MAIN GRID
======================= */

function MainGrid() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CertificatesSection />
      <StreakSection />
      <AchievementsSection />
      <ImpactSection />
    </section>
  );
}

/* =======================
   CERTIFICATES
======================= */

function CertificatesSection() {
  return (
    <div className="lg:col-span-2 border border-emerald-200 rounded-xl p-6">
      <h2 className="font-semibold text-emerald-700 mb-4">
        Your Certificates
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Certificate title="Recycling Basics" />
        <Certificate title="Plastic Awareness" />
        <Certificate locked />
      </div>
    </div>
  );
}

function Certificate({ title, locked }) {
  return (
    <div
      className={`border rounded-lg p-4 text-center text-sm ${locked
        ? "border-gray-300 text-gray-400"
        : "border-emerald-300 text-emerald-700"
        }`}
    >
      {locked ? "Locked" : title}
    </div>
  );
}

/* =======================
   STREAK
======================= */

function StreakSection() {
  return (
    <div className="border border-emerald-200 rounded-xl p-6">
      <h2 className="font-semibold text-emerald-700 mb-2">
        Current Streak
      </h2>

      <p className="text-4xl font-bold text-emerald-600">
        7
      </p>

      <p className="text-sm text-gray-600">
        days in a row
      </p>
    </div>
  );
}

/* =======================
   ACHIEVEMENTS
======================= */

function AchievementsSection() {
  return (
    <div className="border border-emerald-200 rounded-xl p-6">
      <h2 className="font-semibold text-emerald-700 mb-4">
        Achievements
      </h2>

      <ul className="space-y-2 text-sm">
        <Achievement label="♻️ First Recycle" unlocked />
        <Achievement label="🔥 7-Day Streak" unlocked />
        <Achievement label="🌍 Eco Champion" />
      </ul>
    </div>
  );
}

function Achievement({ label, unlocked }) {
  return (
    <li
      className={`flex justify-between ${unlocked ? "text-gray-700" : "text-gray-400"
        }`}
    >
      <span>{label}</span>
      <span>{unlocked ? "Unlocked" : "Locked"}</span>
    </li>
  );
}

/* =======================
   IMPACT
======================= */

function ImpactSection() {
  return (
    <div className="border border-emerald-200 rounded-xl p-6">
      <h2 className="font-semibold text-emerald-700 mb-2">
        Your Impact
      </h2>

      <p className="text-gray-600 text-sm">
        You’ve helped recycle <strong>23 items</strong> so far.
      </p>
    </div>
  );
}
