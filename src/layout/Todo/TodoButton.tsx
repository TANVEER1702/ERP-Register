import { useState } from "react";
import { ListTodo } from "lucide-react";
import TodoSidebar from "./TodoSidebar";

export default function TodoButton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Todo Button */}
      <button
        className="relative px-2 py-2 rounded flex items-center"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListTodo size={20} />
      </button>

      {/* Sidebar Component */}
      <TodoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
