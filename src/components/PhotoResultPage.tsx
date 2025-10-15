import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

interface Employee {
  id: string;
  name: string;
  position: string;
  city: string;
  employeeId: string;
  startDate: string;
  salary: string;
}

const PhotoResultPage: React.FC = () => {
  const [imageData, setImageData] = useState<string>("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (location.state?.imageData && location.state?.employee) {
      setImageData(location.state.imageData);
      setEmployee(location.state.employee);
    } else {
      navigate("/list");
    }
  }, [navigate, location.state]);

  const handleRetakePhoto = () => {
    if (employee) {
      navigate(`/details/${employee.id}`, { state: { employee } });
    }
  };

  const handleBackToDetails = () => {
    if (employee) {
      navigate(`/details/${employee.id}`, { state: { employee } });
    }
  };

  const handleBackToList = () => {
    navigate("/list");
  };

  const handleDownloadPhoto = () => {
    if (imageData) {
      const link = document.createElement("a");
      link.download = `${employee?.name || "employee"}-photo.png`;
      link.href = imageData;
      link.click();
    }
  };

  if (!imageData || !employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading photo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Photo Captured</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleBackToDetails}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Back to Details
            </button>
            <button
              onClick={handleBackToList}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Photo for {employee.name}
            </h2>
            <p className="text-gray-600">{employee.position}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src={imageData}
                alt={`Photo of ${employee.name}`}
                className="max-w-full h-auto block"
                style={{ maxHeight: "600px", maxWidth: "800px" }}
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRetakePhoto}
              className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Retake Photo
            </button>
            <button
              onClick={handleDownloadPhoto}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
            >
              Download Photo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Employee Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{employee.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Employee ID:</span>
              <span className="ml-2 font-medium">{employee.employeeId}</span>
            </div>
            <div>
              <span className="text-gray-600">Position:</span>
              <span className="ml-2 font-medium">{employee.position}</span>
            </div>
            <div>
              <span className="text-gray-600">City:</span>
              <span className="ml-2 font-medium">{employee.city}</span>
            </div>
            <div>
              <span className="text-gray-600">Start Date:</span>
              <span className="ml-2 font-medium">{employee.startDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Salary:</span>
              <span className="ml-2 font-medium text-green-600">
                {employee.salary}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoResultPage;
