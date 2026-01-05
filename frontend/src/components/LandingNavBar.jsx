import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

export default function LandingNavBar() {
  const navigate = useNavigate()
  
  return (
    <nav className="fixed left-2 top-2 w-[99dvw] flex items-center justify-between mb-0 px-10 py-2 bg-gray-100/80 border-white border-1 rounded-xl z-2">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="EcoBud" className="h-11 w-auto translate-y-[-4px]" />
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-10 text-gray-600 font-medium text-shadow-md  ">
        <Link className="hover:text-gray-400" to="/dashboard">Home</Link>
        <Link className="hover:text-gray-400" href="#">Our Mission</Link>
        <a className="hover:text-gray-400" href="#faq">FAQ</a>
        <a className="hover:text-gray-400"  href="#footer">Contact</a>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-20px">
        <button className="w-[7dvw] px-[0.6em] py-[0.6em] p-0 h-min text-emerald-600 rounded-lg bg-white shadow-md hover:shadow-lg" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="w-[7dvw] px-[0.6em] py-[0.6em] p-0 bg-emerald-600 text-white rounded-lg shadow-lg hover:shadow-xl" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </nav>
  );
}
