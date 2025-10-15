import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { getEmployeeById, type Employee } from "./apiService";

const DetailsPage: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (location.state?.employee) {
      setEmployee(location.state.employee);
      setLoading(false);
    } else {
      loadEmployeeData();
    }
  }, [navigate, location.state, id]);

  const loadEmployeeData = async () => {
    try {
      const employeeData = await getEmployeeById(id!);
      if (employeeData) {
        setEmployee(employeeData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading employee data:", error);
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");

        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
          setShowCamera(false);
        }

        navigate("/photo-result", { state: { imageData, employee } });
      }
    }
  };

  useEffect(() => {
    if (stream && videoRef.current && showCamera) {
      const video = videoRef.current;
      video.srcObject = stream;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          setTimeout(() => {
            video.play().catch(console.error);
          }, 500);
        }
      };

      video.onloadedmetadata = () => {
        playVideo();
      };

      if (video.readyState >= 1) {
        playVideo();
      }
    }
  }, [stream, showCamera]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setShowCamera(false);
    }
  };

  const goBack = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    navigate("/list");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading employee details...</div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600 mb-4">Employee not found</div>
          <button
            onClick={goBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Employee Details</h1>
          <button
            onClick={goBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {employee.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {employee.name}
                </h2>
                <p className="text-gray-600">{employee.position}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <div className="text-lg text-gray-900">
                  {employee.employeeId}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div className="text-lg text-gray-900">{employee.position}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="text-lg text-gray-900">{employee.city}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="text-lg text-gray-900">
                  {employee.startDate}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <div className="text-lg font-semibold text-green-600">
                  {employee.salary}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Capture Photo
          </h3>

          {!showCamera ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Take a photo using your device camera
              </p>
              <button
                onClick={startCamera}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Start Camera
              </button>
              {cameraError && (
                <div className="mt-4 text-red-500 text-sm">{cameraError}</div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="relative bg-gray-900 rounded-lg overflow-hidden mx-auto border-2 border-gray-300"
                style={{ maxWidth: "640px", minHeight: "400px" }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full"
                  style={{ minHeight: "400px", objectFit: "cover" }}
                />
                {stream && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    🔴 Live
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={capturePhoto}
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Stop Camera
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
