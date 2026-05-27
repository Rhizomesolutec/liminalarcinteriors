"use client";

import { useEffect, useState, useRef } from "react";
import {
  FolderOpen,
  Users,
  X,
  Home,
  Settings,
  LogOut,
  Mail,
  Bell,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface InitialData {
  count: number;
}

interface DashboardNavbarProps {
  initialData: InitialData;
}

// interface ContactMessage {
//   id: string;
//   fullname: string;
//   email: string;
//   phone: string;
//   message: string;
//   is_readed: boolean;
//   action_status: string;
// }

// interface SupabasePayload {
//   new: ContactMessage;
//   old: ContactMessage;
// }

import { motion, AnimatePresence } from "framer-motion";
import LogoutModal from "../LogoutModal";
import { handleLogout } from "./logutServarside";

interface SidebarItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  href: string;
}

interface DashboardNavbarProps {
  initialData: {
    count: number;
  };
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ initialData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [messageCount, setMessageCount] = useState<number>(initialData.count);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/mixkit-software-interface-start-2574.mp3");
    audioRef.current.preload = "auto";
  }, []);

  const sidebarItems: SidebarItem[] = [
    { icon: Users, label: "Service", href: "/admin/dashboard/services" },
    { icon: FolderOpen, label: "Project", href: "/admin/dashboard/projects" },
    { icon: Star, label: "Review", href: "/admin/dashboard/review" },
    { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
  ];

  // Supabase real-time subscription
  supabase
    .channel("global-message-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "contact_messages",
      },
      (payload) => {
        if (payload.new) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
          }
          toast(`New message ${payload.new.fullname}`);
          setMessageCount((pre) => pre + 1);
        }
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "contact_messages",
      },
      (payload) => {
        console.log(payload);
        if (
          payload.new &&
          payload.new.is_readed &&
          payload.new.action_status === payload.old.action_status
        ) {
          setMessageCount((pre) => pre - 1);
        }
      }
    )
    .subscribe();

  const handleNavigation = (href: string): void => {
    setSidebarOpen(false);
    router.push(href);
  };
  
  const handleSidebarToggle = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const getButtonClasses = (href: string): string => {
    return `w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/10 ${isActiveRoute(href) ? "bg-[#7F6456]/20 border border-[#7F6456]/30" : ""
      }`;
  };

  const getTextClasses = (href: string): string => {
    return isActiveRoute(href) ? "text-[#7F6456]" : "text-gray-300";
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  } as const;

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  } as const;

  const headerVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
    },
  } as const;

  const badgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.2,
      },
    },
  } as const;

  const bellVariants = {
    idle: { rotate: 0 },
    ring: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation menu"
        className="relative z-50 p-5 "
      >
        <svg
          className="block size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <motion.div
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className={`fixed inset-y-0 left-0 z-50 w-64 lg:translate-x-0`}
        >
          <div className="h-full backdrop-blur-xl bg-white/10 border-r border-white/20 shadow-2xl">
            <motion.div
              variants={headerVariants}
              className="flex items-center justify-between p-6 border-b border-white/20"
            >
              <motion.h2
                className="text-xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Admin Panel
              </motion.h2>
              <motion.button
                onClick={handleSidebarToggle}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white "
                aria-label="Toggle sidebar"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            <nav className="p-4 space-y-2">
              {/* Dashboard Button */}
              <motion.button
                variants={itemVariants}
                onClick={() => handleNavigation("/admin/dashboard")}
                className={getButtonClasses("/admin/dashboard")}
                aria-label="Navigate to Dashboard"
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={
                    isActiveRoute("/admin/dashboard")
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Home
                    size={20}
                    className={getTextClasses("/admin/dashboard")}
                  />
                </motion.div>
                <span className={getTextClasses("/admin/dashboard")}>
                  Dashboard
                </span>
              </motion.button>

              {/* Messages Button with Notification Badge */}
              <motion.button
                variants={itemVariants}
                onClick={() => handleNavigation("/admin/dashboard/messages")}
                className={getButtonClasses("/admin/dashboard/messages")}
                aria-label="Navigate to Messages"
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={
                    isActiveRoute("/admin/dashboard/messages")
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Mail
                    size={20}
                    className={getTextClasses("/admin/dashboard/messages")}
                  />
                </motion.div>
                <span className={getTextClasses("/admin/dashboard/messages")}>
                  Messages
                </span>
                <AnimatePresence>
                  {messageCount > 0 && (
                    <motion.div
                      className="relative ml-auto p-2 rounded-xl hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        variants={bellVariants}
                        animate="ring"
                        whileHover="ring"
                      >
                        <Bell size={20} className="text-gray-300" />
                      </motion.div>
                      <motion.span
                        variants={badgeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      >
                        {messageCount > 99 ? "99+" : messageCount}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Dynamic Sidebar Items */}
              {sidebarItems.map((item: SidebarItem, index: number) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  onClick={() => handleNavigation(item.href)}
                  className={getButtonClasses(item.href)}
                  aria-label={`Navigate to ${item.label}`}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  custom={index}
                >
                  <motion.div
                    animate={
                      isActiveRoute(item.href) ? { rotate: 360 } : { rotate: 0 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon
                      size={20}
                      className={getTextClasses(item.href)}
                    />
                  </motion.div>
                  <span className={getTextClasses(item.href)}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Logout Button */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-4 left-4 right-4"
            >
              <motion.button
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/20 transition-colors text-red-400"
                aria-label="Logout"
                onClick={() => {
                  // Add logout logic here
                  // console.log("Logout clicked");
                  setLogoutOpen(true)
                }}
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <LogOut size={20} />
                </motion.div>
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <LogoutModal open={logoutOpen} onClose={setLogoutOpen} onLogout={handleLogout} />
    </>
  );
};

export default DashboardNavbar;
