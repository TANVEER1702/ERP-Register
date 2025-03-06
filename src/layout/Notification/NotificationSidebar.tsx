import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({ isOpen, onClose }: NotificationSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6"
          ref={sidebarRef}
        >
          {/* Close Button */}
          <button className="fixed top-4 right-6" onClick={onClose}>
            <X size={20} />
          </button>

          {/* Notifications Content */}
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul className="space-y-2">
            <li className="p-2 border rounded">New user signed up</li>
            <li className="p-2 border rounded">Order #1234 has been shipped</li>
            <li className="p-2 border rounded">Reminder: Meeting at 3 PM</li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
