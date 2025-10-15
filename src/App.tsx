import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import ListPage from "./components/ListPage";
import DetailsPage from "./components/DetailsPage";
import PhotoResultPage from "./components/PhotoResultPage";
import ChartPage from "./components/ChartPage";
import MapPage from "./components/MapPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/photo-result" element={<PhotoResultPage />} />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
