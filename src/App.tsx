import { Routes, Route, Navigate } from "react-router";
import Login from "./Login";
import ListPage from "./ListPage";
import DetailsPage from "./DetailsPage";
import PhotoResultPage from "./PhotoResultPage";
import ChartPage from "./ChartPage";
import MapPage from "./MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/photo-result" element={<PhotoResultPage />} />
      <Route path="/charts" element={<ChartPage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
