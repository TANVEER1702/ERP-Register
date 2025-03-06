import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationSidebar from "./NotificationSidebar";

export default function NotificationButton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Example unread notifications

  return (
    <>
      {/* Notification Button */}
      <button
        className="relative px-2 py-2 rounded flex items-center gap-2"
        onClick={() => {
          setIsSidebarOpen(true);
          setUnreadCount(0); // Reset unread count when opened
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[1px] px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Sidebar Component */}
      <NotificationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
