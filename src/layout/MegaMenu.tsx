"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  DollarSign,
  BarChart,
  ClipboardList,
  Package,
  Users,
  ShoppingCart,
  UserCheck,
  CalendarCheck,
  FileSpreadsheet,
  UsersRound,
  ClipboardCheck,
  TrendingUp,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import TodoButton from "./Todo/TodoButton";
import NotificationButton from "./Notification/NotificationButton";

// import { image } from "framer-motion/client";

export default function Navbar() {
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setClickedMenu(null);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Sidebar Close Button
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      };
    
      if (isSidebarOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);
  

  // Modules and Subpages
  const modules = [
    {
      title: "Finance",
      image: "/images/finance.jpeg",
      subPages: [
        { name: "Invoices", link: "/finance/invoices", icon: <FileText size={18} /> },
        { name: "Expenses", link: "/finance/expenses", icon: <DollarSign size={18} /> },
        { name: "Budgeting", link: "/finance/budgeting", icon: <BarChart size={18} /> },
        { name: "Reports", link: "/finance/reports", icon: <ClipboardList size={18} /> },
      ],
    },
    {
      title: "Inventory",
      image: "/images/inventory.jpeg",
      subPages: [
        { name: "Stock Management", link: "/inventory/stock", icon: <Package size={18} /> },
        { name: "Suppliers", link: "/inventory/suppliers", icon: <Users size={18} /> },
        { name: "Purchase Orders", link: "/inventory/purchase-orders", icon: <ShoppingCart size={18} /> },
        { name: "Reports", link: "/inventory/reports", icon: <ClipboardList size={18} /> },
      ],
    },
    {
      title: "HR Management",
      image: "/images/hr.jpeg",
      subPages: [
        { name: "Employees", link: "/hr/employees", icon: <UsersRound size={18} /> },
        { name: "Payroll", link: "/hr/payroll", icon: <DollarSign size={18} /> },
        { name: "Attendance", link: "/hr/attendance", icon: <CalendarCheck size={18} /> },
        { name: "Recruitment", link: "/hr/recruitment", icon: <UserCheck size={18} /> },
      ],
    },
    {
      title: "Sales",
      image: "/images/sales.jpeg",
      subPages: [
        { name: "Orders", link: "/sales/orders", icon: <FileSpreadsheet size={18} /> },
        { name: "Customers", link: "/sales/customers", icon: <UsersRound size={18} /> },
        { name: "Leads", link: "/sales/leads", icon: <ClipboardCheck size={18} /> },
        { name: "Reports", link: "/sales/reports", icon: <TrendingUp size={18} /> },
      ],
    },
  ];

  return (
    <header className="text-black w-full" ref={headerRef}>
      <nav className="container mx-auto h-16 px-6 py-4 flex justify-between items-center">
        {/* Navigation Menu */}
        <ul className="flex gap-4 relative ">
          {modules.map((module) => (
            <li key={module.title} className="relative hidden md:block">
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setClickedMenu(clickedMenu === module.title ? null : module.title);
                }}
              >
                {module.title}

                {clickedMenu === module.title ? (
                  <ChevronUp size={18} className="transition-transform duration-200" />
                ) : (
                  <ChevronDown size={18} className="transition-transform duration-200" />
                )}
              </button>

              {/* Animated Mega Menu */}
              {/* Updated Mega Menu */}
              <AnimatePresence>
                {clickedMenu === module.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 right-0 bg-white text-black text-sm shadow-lg border-t border-gray-200 p-6"
                    style={{ top: headerHeight }}
                  >
                    <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
                      {/* First 3 Columns - Subpages */}
                      <div className="col-span-3 grid grid-cols-3 gap-8">
                        {[0, 1, 2].map((colIndex) => (
                          <div key={colIndex} className="space-y-4">
                            {module.subPages
                              .filter((_, index) => index % 3 === colIndex)
                              .map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.link}
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded"
                                >
                                  {sub.icon}
                                  {sub.name}
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>

                    {/* 4th Column - Image */}
                    <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden group">
                      <Image
                        src={modules.find((module) => module.title === clickedMenu)?.image || "/images/default.jpeg"}
                        alt={`${clickedMenu} Featured`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                      />
                      {/* Optional Image Overlay Text */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-semibold mb-2">{clickedMenu}</h3>
                          <p className="text-sm text-white/80">Explore {clickedMenu} Features</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Notification Button */}
        <div className="flex items-center">
          {/* <CircleCheck size={20} className="cursor-pointer" />
          <Bell size={20} className="cursor-pointer" /> */}
          <TodoButton />
          <NotificationButton />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden absolute" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 md:hidden flex flex-col"
              ref={sidebarRef}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-6"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={24} />
              </button>

              {/* Sidebar Navigation */}
              <ul className="mt-10 space-y-4 flex-1">
                {modules.map((module) => (
                  <li key={module.title}>
                    <button
                      className="w-full text-left font-semibold flex items-center justify-between px-4 py-2 hover:bg-gray-200 rounded"
                      onClick={() =>
                        setClickedMenu(clickedMenu === module.title ? null : module.title)
                      }
                    >
                      {module.title}

                      {clickedMenu === module.title ? (
                        <ChevronUp size={18} className="transition-transform duration-200" />
                      ) : (
                        <ChevronDown size={18} className="transition-transform duration-200" />
                      )}
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
                            <Link
                              key={sub.name}
                              href={sub.link}
                              className="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* Image at the Bottom */}
              <AnimatePresence>
                {clickedMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <Image
                      src={modules.find((module) => module.title === clickedMenu)?.image || "/images/default.jpeg"}
                      alt={`${clickedMenu} Featured`}
                      width={200}
                      height={150}
                      className="w-full h-auto rounded-lg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
