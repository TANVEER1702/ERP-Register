"use client";
import  Image  from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if(profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
    
  return (
    // @ts-expect-error: Type issue with external library
    <div className="relative" ref={profileRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Image
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
          width={50}
          height={50}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 bg-white border shadow-lg rounded-lg overflow-hidden"
          >
            
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-emerald-500">
                    <User size={16} />
                    Profile
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-emerald-500">
                    <Settings size={16} />
                    Settings
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-600">
                    <LogOut size={16} />
                    Logout
                </button>
           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
