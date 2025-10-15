import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchEmployeeData, type Employee as ApiEmployee } from "../apiService";

interface Employee {
  name: string;
  salary: number;
}

const ChartPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
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
      const apiEmployees = await fetchEmployeeData();

      const topEmployees = apiEmployees
        .slice(0, 10)
        .map((employee: ApiEmployee) => ({
          name: employee.name,
          salary: parseInt(employee.salary.replace(/[$,]/g, "")),
        }))
        .sort((a: Employee, b: Employee) => b.salary - a.salary);

      setEmployees(topEmployees);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const maxSalary = Math.max(...employees.map((emp) => emp.salary));

  const handleBackToList = () => {
    navigate("/list");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Salary Chart</h1>
          <button
            onClick={handleBackToList}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top 10 Employee Salaries
          </h2>

          <div className="space-y-4">
            {employees.map((employee, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700 truncate">
                  {employee.name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out"
                    style={{
                      width: `${(employee.salary / maxSalary) * 100}%`,
                      minWidth: "60px",
                    }}
                  >
                    <span className="text-white text-xs font-bold">
                      ${employee.salary.toLocaleString()}
                    </span>
                  </div>
                </div>
                {/*<div className="w-16 text-xs text-gray-500 text-right">
                  #{index + 1}
                </div>*/}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                $
                {Math.max(
                  ...employees.map((emp) => emp.salary),
                ).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Highest Salary</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                $
                {Math.round(
                  employees.reduce((sum, emp) => sum + emp.salary, 0) /
                    employees.length,
                ).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Average Salary</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                $
                {Math.min(
                  ...employees.map((emp) => emp.salary),
                ).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Lowest Salary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
