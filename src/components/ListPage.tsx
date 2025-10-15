import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchEmployeeData, type Employee } from "../apiService";

const ListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadEmployeeData();
  }, [navigate]);

  const loadEmployeeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const employeeData = await fetchEmployeeData();
      setEmployees(employeeData);
    } catch (err) {
      setError("Failed to load employee data. Please try again.");
      console.error("Error loading employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeClick = (employee: Employee) => {
    navigate(`/details/${employee.id}`, { state: { employee } });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleViewCharts = () => {
    navigate("/charts");
  };

  const handleViewMap = () => {
    navigate("/map");
  };

  const handleRetry = () => {
    loadEmployeeData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-700 font-medium">
            Loading employee data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">🔌</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Connection Issue
          </h2>
          <div className="text-gray-600 mb-6">
            Unable to load employee data. This might be due to:
            <ul className="text-left mt-2 space-y-1">
              <li>• Network connectivity issues</li>
              <li>• API server maintenance</li>
              <li>• CORS policy restrictions</li>
            </ul>
          </div>
          <div className="text-sm text-gray-500 mb-6">
            The app will try to use backup data if available.
          </div>
          <div className="space-x-4">
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
            >
              🔄 Try Again
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200 font-medium"
            >
              ← Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={handleViewCharts}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              View Charts
            </button>
            <button
              onClick={handleViewMap}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
            >
              View Map
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Employee List ({employees.length} employees)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => handleEmployeeClick(employee)}
                    className="hover:bg-gray-50 cursor-pointer transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {employee.employeeId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {employee.salary}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
