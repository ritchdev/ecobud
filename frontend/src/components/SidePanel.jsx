export default function SidePanel({ open }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-green-600 to-green-800 text-white transition-transform duration-500 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-center text-xl py-6 text-yellow-300">GreenDrop</h2>

      <ul className="space-y-4 text-center">
        {["Profile", "Home", "Points", "Redeem", "Vending", "FAQ", "Logout"].map(
          (item) => (
            <li key={item} className="hover:bg-white/20 py-2 rounded">
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
