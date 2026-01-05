import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky left-0 top-0 border-b w-screen border-emerald-200 bg-white m-0 p-0">
      <div className=" px-10 h-16 flex items-center justify-center">
        <div className="flex items-center justify-between gap-5 w-full">
          <div>
            <img src="/src/assets/logo.png" alt="EcoBud" className="h-11 w-auto translate-y-[-4px]"/>
          </div>

          <div className="flex items-center gap-5">
            <NavItem to="/dashboard" active>
              Dashboard
            </NavItem>
            <NavItem to="/learn">Learn</NavItem>
            <NavItem to="/contribute">Contribute</NavItem>
            <NavItem to="/profile">Profile</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}


function NavItem({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium ${
        active
          ? "text-emerald-700"
          : "text-gray-600 hover:text-emerald-700"
      }`}
    >
      {children}
    </Link>
  );
}
