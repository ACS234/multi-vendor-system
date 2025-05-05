import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import {
  MdDashboard,
  MdApartment,
  MdPeople,
  MdEventAvailable,
  MdBarChart,
  MdSettings,
  MdAccountCircle,
  MdSecurity,
  MdDarkMode,
  MdPerson,
  MdOutlineAppRegistration
} from 'react-icons/md';
import { CiLight } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import { RiLogoutCircleRLine } from "react-icons/ri";
import { useCurrentUser } from '../hooks/useUser';

const Sidebar = ({isCollapsed,toggleCollapse}) => {
  const { pathname } = useLocation();
  const {role} = useCurrentUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem(ACCESS_TOKEN));
  const navigate = useNavigate()
  // const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <MdApartment size={20} /> },
    ...(isAuthenticated || role ? [
      { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard size={20} /> },
      { name: 'Profile', path: '/profile', icon: <MdPerson size={20} /> },
      {
        name: 'Product',
        path: '/products',
        icon: <AiFillProduct size={20} />,
        children: [
          { name: 'Add Product', path: '/products/create' },
          { name: 'Update Product', path: '/products/edit/:id' },
          { name: 'Manage Product', path: '/products/manage-product' },
        ],
      },
      {
        name: 'Employees',
        path: '/employees',
        icon: <MdPeople size={20} />,
        children: [
          { name: 'All Employees', path: '/employees' },
          { name: 'Add New', path: '/employees/new' },
        ],
      },
      { name: 'Product Analytics', path: '/analytics', icon: <MdEventAvailable size={20} /> },
      { name: 'Analytics', path: '/analytics', icon: <MdBarChart size={20} /> },
      {
        name: 'Settings',
        path: '/settings',
        icon: <MdSettings size={20} />,
        children: [
          { name: 'Profile', path: '/settings/updateprofile', icon: <MdAccountCircle size={18} /> },
          { name: 'Security', path: '/settings/security', icon: <MdSecurity size={18} /> },
        ],
      },
    ] : []),
    ...(isAuthenticated ? [] : [
      { name: 'Login', path: '/login', icon: <IoIosLogIn size={20} /> },
      { name: 'Register', path: '/register', icon: <MdOutlineAppRegistration size={20} /> },
    ]),
  ];
  return (
    <div className={`fixed left-0 min-h-screen flex ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-inherit`}>
        <div className="flex justify-between items-center p-2">
          {!isCollapsed && <h2 className="text-xl font-semibold">ACS Plateform</h2>}
          <button onClick={toggleCollapse} className="text-xl">
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <div className="relative px-2">
                <Link
                  to={link.path}
                  onClick={() => link.children && toggleDropdown(link.name)}
                  className={`flex items-center justify-between px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 ${pathname === link.path ? 'bg-green-600 text-white' : 'text-gray-900'}`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {!isCollapsed && <span>{link.name}</span>}
                  </div>
                  {link.children && !isCollapsed && (
                    <span>{openDropdown === link.name ? '▲' : '▼'}</span>
                  )}
                </Link>

                {link.children && openDropdown === link.name && !isCollapsed && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          to={child.path}
                          className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-gray-600 ${pathname === child.path ? 'bg-green-500 text-white' : 'text-gray-500'}`}
                        >
                          {child.icon}
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 p-2 flex flex-col gap-2">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white py-2 px-4 rounded-md w-full text-sm"
            >
              <RiLogoutCircleRLine size={20} />
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            className="bg-gray-600 text-white py-2 px-4 rounded-md w-full text-sm"
          >
            {isDarkMode ? <CiLight size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
