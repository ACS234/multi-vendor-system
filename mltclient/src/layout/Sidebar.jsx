import { FaUserShield, FaStore, FaUser, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white p-5 space-y-6">
      <div className="flex items-center space-x-2 text-xl font-semibold">
        <FaBars />
        <span>Dashboard</span>
      </div>

      <nav className="space-y-4 mt-10">
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaUserShield />
          <span>Admin</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaStore />
          <span>Vendor</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaUser />
          <span>Customer</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaCog />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-red-400">
          <FaSignOutAlt />
          <span>Logout</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
