import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUserAlt, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col">
      <div className="w-full m-0 flex h-14 text-black text-lg font-semibold justify-center items-center shadow-lg z-10 shrink-0">
        <div className="w-[95%] sm:w-[85%] h-full flex justify-between items-center flex-wrap">
          <div className="w-fit h-full flex items-center p-1 overflow-hidden">
            <NavLink to="/">
            <h1 className="text-2xl font-bold text-indigo-600">Habit Tracker</h1>
            </NavLink>
          </div>

          <div className="hidden w-fit h-full sm:flex items-center">
            <ul className="flex space-x-4">
              <li>
                <NavLink to='/profile' className="bg-indigo-400 hover:bg-indigo-500 p-2 rounded text-white flex items-center">
                  <FaUserAlt className="mr-2" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => (isActive ? { color: "rgb(129 140 248)" } : undefined)}
                  to="/"
                  className="flex items-center text-slate-400 p-2 hover:text-indigo-500"
                >
                  <FaHome className="mr-2" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => (isActive ? { color: "rgb(129 140 248)" } : undefined)}
                  to="/detailspage"
                  className="flex items-center text-slate-400 p-2 hover:text-indigo-500"
                >
                  <FaClipboardList className="mr-2" /> Your Habits
                </NavLink>
              </li>
            </ul>
          </div>

          <button className="sm:hidden" onClick={toggleShowMenu}>
            <img src={require('../Assets/menu.png')} alt="menu-icon" className="w-[25px] h-[25px]" />
          </button>

          {showMenu && (
            <div className="block w-full h-fit bg-white p-1 rounded-b shadow-md border-x-2 border-b-2">
              <ul className="mx-0 px-1">
                <li className="border-b p-1 text-slate-400" onClick={toggleShowMenu}>
                  <NavLink
                    style={({ isActive }) => (isActive ? { color: "rgb(129 140 248)" } : undefined)}
                    to="/"
                    className="flex items-center"
                  >
                    <FaHome className="mr-2" /> Home
                  </NavLink>
                </li>
                <li className="p-1 text-slate-400" onClick={toggleShowMenu}>
                  <NavLink
                    style={({ isActive }) => (isActive ? { color: "rgb(129 140 248)" } : undefined)}
                    to="/detailspage"
                    className="flex items-center"
                  >
                    <FaClipboardList className="mr-2" /> Your Habits
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
