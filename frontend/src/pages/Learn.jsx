import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase.auth";
import { onAuthStateChanged } from "firebase/auth";

/* =====================
   CERTIFICATE MAP (NEW)
===================== */
const CERTIFICATE_MAP = {
  "Recycling Basics": "RECYCLING_BASICS",
  "Plastic & E-Waste": "PLASTIC_&_EWASTE",
  "Sustainable Living": "SUSTAINABLE_LIVING",
};

// --------------------
// MAIN PAGE
// --------------------
export default function Learn() {
  const [items, setItems] = useState([]);
  const [certificates, setCertificates] = useState([]); // NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const token = await user.getIdToken();

        // Fetch learning items
        const itemsRes = await fetch("/api/learning", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const itemsData = await itemsRes.json();
        setItems(itemsData);

        // Fetch user profile (certificates)  ✅ NEW
        const profileRes = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileRes.json();
        setCertificates(profileData.certificates || []);

      } catch (err) {
        console.error("Failed to load learn page data:", err);
      } finally {
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  async function toggleItem(itemId) {
    try {
      const token = await auth.currentUser.getIdToken();

      await fetch("/api/learning/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      setItems(items =>
        items.map(item =>
          item._id === itemId
            ? { ...item, completed: !item.completed }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to toggle item:", err);
    }
  }

  if (loading) {
    return (
      <div className="w-screen bg-emerald-50">
        <Navbar />
        <div className="px-10 py-5">Loading learning content...</div>
      </div>
    );
  }

  return (
    <div className="w-screen bg-emerald-50">
      <Navbar />
      <div className="px-10 py-5">
        <h2 className="text-emerald-700 font-semibold text-1xl pl-2">
          Explore a library of resources to help you educate yourself about being more eco-friendly
        </h2>
        <h3 className="text-emerald-700 text-md pl-2 pb-5">
          Take the tests at the end of each section to earn a Certificate!
        </h3>

        <LearnSection
          title="Recycling Basics"
          description="Understand what recycling is and why it matters."
          items={items.filter(i => i.section === "Recycling Basics")}
          certificates={certificates}       /* NEW */
          onToggle={toggleItem}
        />

        <LearnSection
          title="Plastic & E-Waste"
          description="Learn how plastics and electronics affect the planet."
          items={items.filter(i => i.section === "Plastic & E-Waste")}
          certificates={certificates}       /* NEW */
          onToggle={toggleItem}
        />

        <LearnSection
          title="Sustainable Living"
          description="Everyday habits that reduce your environmental footprint."
          items={items.filter(i => i.section === "Sustainable Living")}
          certificates={certificates}       /* NEW */
          onToggle={toggleItem}
        />
      </div>
    </div>
  );
}

// --------------------
// SECTION
// --------------------
function LearnSection({ title, description, items, certificates, onToggle }) {
  const navigate = useNavigate();

  const allCompleted = items.length > 0 && items.every(item => item.completed);

  /* =====================
     CERT CHECK (NEW)
  ===================== */
  const sectionCertificate = CERTIFICATE_MAP[title];
  const alreadyCertified = certificates.includes(sectionCertificate);

  const canTakeTest = allCompleted && !alreadyCertified;

  return (
    <section className="border border-emerald-400 rounded-xl bg-white mb-10">

      <div className="border-b border-emerald-200 p-6">
        <h2 className="text-xl font-semibold text-emerald-700">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {description}
        </p>
      </div>

      <LearningFlow
        items={items}
        onToggle={onToggle}
      />

      <div className="border-t border-emerald-200 p-6 flex justify-end">
        <button
          disabled={!canTakeTest}
          className={`border px-5 py-2 rounded-lg text-sm font-medium
            ${
              alreadyCertified
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : canTakeTest
                ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          onClick={() => {
            if (!canTakeTest) return;
            let uriComp = title === "Recycling Basics" ? "recycling-basics" : title === "Sustainable Living" ? "sustainable-living" : "plastic-and-e-waste"
            navigate(`/quiz/${encodeURIComponent(uriComp)}`);
          }}
        >
          {alreadyCertified ? "Certificate Earned" : "Take The Test"}
        </button>
      </div>
    </section>
  );
}

// --------------------
// FLOW
// --------------------
function LearningFlow({ items, onToggle }) {
  return (
    <div className="p-6 space-y-4">
      {items.map((item, index) => (
        <FlowItem
          key={item._id}
          item={item}
          link={item.url}
          index={index}
          isLast={index === items.length - 1}
          onToggle={() => onToggle(item._id)}
        />
      ))}
    </div>
  );
}

// --------------------
// ITEM
// --------------------
function FlowItem({ item, index, link, onToggle, isLast }) {
  return (
    <div className="flex gap-4 items-start">
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

        {!isLast && <div className="w-px h-10 bg-gray-300" />}
      </div>

      <div className={`flex-1 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between ${item.completed ? "bg-emerald-100" : "bg-white"}`}>
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <p className="text-sm text-gray-700">{item.title}</p>
          </a>
          <span className="text-xs text-gray-500">
            {item.type === "video" ? "Video" : "Article"}
          </span>
        </div>

        <button
          onClick={onToggle}
          className={`text-xs px-3 py-1 rounded-md border transition
            ${item.completed
              ? "border-gray-300 text-gray-400"
              : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            }`}
        >
          {item.completed
            ? item.type === "video" ? "Seen" : "Read"
            : item.type === "video" ? "Mark Seen" : "Mark Read"}
        </button>
      </div>
    </div>
  );
}
