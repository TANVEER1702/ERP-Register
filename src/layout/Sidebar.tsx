import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  modules: {
    title: string;
    subPages: { name: string; link: string }[];
  }[];
  clickedMenu: string | null;
  setClickedMenu: (menu: string | null) => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  modules,
  clickedMenu,
  setClickedMenu,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 md:hidden"
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>

          {/* Sidebar Navigation */}
          <ul className="mt-10 space-y-4">
            {modules.map((module) => (
              <li key={module.title}>
                <button
                  className="w-full text-left font-semibold flex items-center justify-between px-4 py-2 hover:bg-gray-200 rounded"
                  onClick={() => setClickedMenu(clickedMenu === module.title ? null : module.title)}
                >
                  {module.title}
                  {clickedMenu === module.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {clickedMenu === module.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-2 space-y-2"
                    >
                      {module.subPages.map((sub) => (
                        <Link key={sub.name} href={sub.link} className="block px-4 py-2 text-sm hover:bg-gray-200 rounded">
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
