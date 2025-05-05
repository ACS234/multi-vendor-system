import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const dummyEmployees = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", department: "IT" },
  { id: 2, name: "Bob Smith", role: "HR Executive", department: "HR" },
  { id: 3, name: "Charlie Brown", role: "Data Analyst", department: "Analytics" },
  { id: 4, name: "Diana Prince", role: "Backend Developer", department: "IT" },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const filteredEmployees = dummyEmployees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDept = filterDept === "All" || emp.department === filterDept;

    return matchSearch && matchDept;
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Employees</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> Add Employee
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3 flex gap-2">
                      <button className="bg-yellow-400 text-white px-3 py-1 rounded flex items-center gap-1">
                        <FaEdit /> Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1">
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
