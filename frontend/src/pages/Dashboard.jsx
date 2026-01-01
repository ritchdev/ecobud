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
        
        {/* Welcome */}
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

        {/* Quick Actions */}
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

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Certificates */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              Your Certificates
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* <Certificate />
              <Certificate />
              <Certificate locked /> */}
            </div>
          </div>

          {/* Streak */}
          

          {/* Achievements */}
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

          {/* Impact */}
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
