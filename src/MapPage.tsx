import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchEmployeeData, type Employee as ApiEmployee } from "./apiService";

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Employee {
  name: string;
  city: string;
  position: string;
  salary: string;
}

interface CityData {
  city: string;
  employees: Employee[];
  coordinates: { lat: number; lng: number };
}

const MapPage: React.FC = () => {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
    Edinburgh: { lat: 55.9533, lng: -3.1883 },
    Tokyo: { lat: 35.6762, lng: 139.6503 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "New York": { lat: 40.7128, lng: -74.006 },
    London: { lat: 51.5074, lng: -0.1278 },
    Sidney: { lat: -33.8688, lng: 151.2093 },
    Singapore: { lat: 1.3521, lng: 103.8198 },
  };

  const createCustomIcon = (count: number) => {
    const color = count >= 10 ? "#dc2626" : count >= 5 ? "#ea580c" : "#2563eb";
    const size = count >= 10 ? 44 : count >= 5 ? 38 : 32;

    return L.divIcon({
      html: `<div style="
        background: linear-gradient(145deg, ${color}, ${color}dd);
        color: white;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${size > 40 ? "15px" : size > 35 ? "13px" : "11px"};
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">${count}</div>`,
      className: "custom-div-icon",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

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

      const employeesByCity: { [key: string]: Employee[] } = {};

      apiEmployees.forEach((apiEmployee: ApiEmployee) => {
        const employee: Employee = {
          name: apiEmployee.name,
          position: apiEmployee.position,
          city: apiEmployee.city,
          salary: apiEmployee.salary,
        };

        if (!employeesByCity[employee.city]) {
          employeesByCity[employee.city] = [];
        }
        employeesByCity[employee.city].push(employee);
      });

      const cityDataArray: CityData[] = Object.keys(employeesByCity)
        .map((city) => ({
          city,
          employees: employeesByCity[city],
          coordinates: cityCoordinates[city] || { lat: 0, lng: 0 },
        }))
        .filter((city) => city.coordinates.lat !== 0);

      setCityData(cityDataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    navigate("/list");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-700 font-medium">
            Loading map data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Employee Locations
                </h1>
                <p className="text-sm text-gray-600">
                  Global office distribution
                </p>
              </div>
            </div>
            <button
              onClick={handleBackToList}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-lg font-medium"
            >
              ← Back to List
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Interactive Map */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Interactive World Map
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Click on markers to explore employee details
                </p>
              </div>

              <div className="h-[500px] relative">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {cityData.map((city) => (
                    <Marker
                      key={city.city}
                      position={[city.coordinates.lat, city.coordinates.lng]}
                      icon={createCustomIcon(city.employees.length)}
                      eventHandlers={{
                        click: () =>
                          setSelectedCity(
                            selectedCity === city.city ? null : city.city,
                          ),
                      }}
                    >
                      <Popup className="custom-popup" maxWidth={300}>
                        <div className="p-2">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-lg text-gray-800">
                              {city.city}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {city.employees.length} employees
                            </span>
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {city.employees.slice(0, 6).map((emp, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 rounded-lg p-2"
                              >
                                <div className="font-medium text-sm text-gray-800">
                                  {emp.name}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {emp.position}
                                </div>
                                <div className="text-xs font-medium text-green-600">
                                  {emp.salary}
                                </div>
                              </div>
                            ))}
                            {city.employees.length > 6 && (
                              <div className="text-xs text-gray-500 text-center py-1 bg-gray-100 rounded">
                                +{city.employees.length - 6} more employees...
                              </div>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Legend */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
                    <span className="text-gray-700">1-4 employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-600 rounded-full shadow-sm"></div>
                    <span className="text-gray-700">5-9 employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded-full shadow-sm"></div>
                    <span className="text-gray-700">10+ employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City Information Panel */}
          <div className="space-y-6">
            {/* Cities Overview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Office Locations
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {cityData.length} cities worldwide
                </p>
              </div>

              <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                {cityData
                  .sort((a, b) => b.employees.length - a.employees.length)
                  .map((city) => (
                    <div
                      key={city.city}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedCity === city.city
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                      onClick={() =>
                        setSelectedCity(
                          selectedCity === city.city ? null : city.city,
                        )
                      }
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">
                            {city.city}
                          </div>
                          <div className="text-sm text-gray-600">
                            {city.employees.length} employee
                            {city.employees.length !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                            city.employees.length >= 10
                              ? "bg-red-600"
                              : city.employees.length >= 5
                                ? "bg-orange-600"
                                : "bg-blue-600"
                          }`}
                        >
                          {city.employees.length}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Selected City Details */}
            {selectedCity && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedCity} Team
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {
                      cityData.find((city) => city.city === selectedCity)
                        ?.employees.length
                    }{" "}
                    team members
                  </p>
                </div>

                <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                  {cityData
                    .find((city) => city.city === selectedCity)
                    ?.employees.map((employee, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow"
                      >
                        <div className="font-medium text-gray-800">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {employee.position}
                        </div>
                        <div className="text-sm font-semibold text-green-600 mt-1">
                          {employee.salary}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Global Statistics
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {cityData.length}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Total Cities
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {cityData.reduce(
                    (sum, city) => sum + city.employees.length,
                    0,
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Total Employees
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.max(...cityData.map((c) => c.employees.length))}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Largest Office
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Math.round(
                    cityData.reduce(
                      (sum, city) => sum + city.employees.length,
                      0,
                    ) / cityData.length,
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Avg per City
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
