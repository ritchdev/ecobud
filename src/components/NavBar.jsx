export default function NavBar() {
  return (
    <nav className="fixed left-2 top-2 w-[99dvw] flex items-center justify-between mb-0 px-10 py-2 bg-gray-100/80 border-white border-1 rounded-xl z-2">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="src/assets/logo.png" alt="EcoBud" className="h-11 w-auto translate-y-[-4px]" />
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-10 text-gray-600 font-medium text-shadow-md  ">
        <a className="hover:text-gray-400" href="#">Home</a>
        <a className="hover:text-gray-400" href="#">How it Works</a>
        <a className="hover:text-gray-400" href="#">FAQ</a>
        <a className="hover:text-gray-400"  href="#">Contact</a>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-20px">
        <button className="w-[7dvw] p-0 h-min text-emerald-600 rounded-lg bg-white shadow-md hover:shadow-lg">
          Log In
        </button>
        <button className="w-[7dvw] p-0 bg-emerald-600 text-white rounded-lg shadow-lg hover:shadow-xl">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
