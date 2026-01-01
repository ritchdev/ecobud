import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <img src="/logo.png" className="h-8" />
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/contribute">Contribute</Link>
      </div>
      <div className="flex items-center gap-4">
        <button>🔔</button>
        <button>👤</button>
      </div>
    </nav>
  );
}
