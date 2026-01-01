import { Link } from "react-router-dom";

export default function ActionCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-emerald-700">
        {title}
      </h3>
      <p className="text-gray-600 mt-1">{desc}</p>
    </Link>
  );
}
