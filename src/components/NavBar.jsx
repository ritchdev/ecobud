import { useState, useRef, useEffect } from "react";
import SidePanel from "./SidePanel";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-black shadow z-50 px-6 py-3 flex justify-between items-center">
      <img src="/images/logo1-removebg-preview.png" className="w-14" />

      <div className="flex items-center gap-4" ref={panelRef}>
        <div className="relative group">
          <input
            className="w-0 group-hover:w-40 transition-all px-3 py-1 rounded-full outline-none"
            placeholder="Search..."
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-1 bg-white rounded"></span>
          <span className="w-6 h-1 bg-white rounded"></span>
          <span className="w-6 h-1 bg-white rounded"></span>
        </button>

        <SidePanel open={open} />
      </div>
    </nav>
  );
}
