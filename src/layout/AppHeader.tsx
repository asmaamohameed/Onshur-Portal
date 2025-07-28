import { useEffect, useRef, useState } from "react";

import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import { Icon } from "../components/common/Icon";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between bg-brand-500 w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:hidden">
          {/* Mobile Sidebar Toggle Button */}
          <button
            className="items-center justify-center w-10 h-10 text-white border-white rounded-lg z-99999 flex lg:hidden"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <Icon set="md" name="MdClose" size={40} />
            ) : (
              <Icon set="md" name="MdMenu" size={40}/>
            )}
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className=""
              src="./images/logo/auth-logo.svg"
              alt="Logo"
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-white rounded-lg z-99999 hover:bg-white lg:hidden"
          >
            <Icon set="md" name="MdMoreHoriz" size={40} />
          </button>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
