import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router";
import { Icon } from "../common/Icon";

// Define the interface for the props
interface HeaderProps {
  onClick?: () => void; // Optional function that takes no arguments and returns void
  onToggle: () => void;
}
const Header: React.FC<HeaderProps> = ({ onClick, onToggle }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="block w-10 h-10 text-gray-500 lg:hidden"
            onClick={onToggle}
          >
            {/* Hamburger Icon */}
            <Icon name="hamburger" />
            {/* Cross Icon */}
          </button>
          <button
            onClick={onClick}
            className="items-center justify-center hidden w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 lg:flex lg:h-11 lg:w-11 lg:border"
          >
            <Icon name="cross" />
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className=""
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 lg:hidden"
          >
            <Icon name="menu" />
          </button>

          <div className="hidden lg:block">
            <form action="https://formbold.com/s/unique_form_id" method="POST">
              <div className="relative">
                <button className="absolute -translate-y-1/2 left-4 top-1/2">
                  <Icon name="search" />
                </button>
                <input
                  type="text"
                  placeholder="Search or type command..."
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 xl:w-[430px]"
                />

                <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500">
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <!-- Dark Mode Toggler --> */}
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

export default Header;
