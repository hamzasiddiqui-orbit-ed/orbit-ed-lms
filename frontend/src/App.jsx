import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardManager from "./pages/DashboardManager";
import DashboardLearner from "./pages/DashboardLearner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin_dashboard" element={<DashboardAdmin />} />
          <Route path="/manager_dashboard" element={<DashboardManager />} />
          <Route path="/learner_dashboard" element={<DashboardLearner />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
