import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardManager from "./pages/DashboardManager";
import DashboardLearner from "./pages/DashboardLearner";
import ProfileSettings from "./components/ProfileSettings";

import SessionReport from "./components/SessionReport";
import UserReports from "./components/UserReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin-dashboard" element={<DashboardAdmin />}>
            <Route path="my-dashboard" element={<SessionReport />} />
            <Route path="user-report" element={<UserReports />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>

          <Route path="/manager-dashboard" element={<DashboardManager />}>
            <Route path="my-dashboard" element={<SessionReport />} />
            <Route path="user-report" element={<UserReports />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>

          <Route path="/learner-dashboard/*" element={<DashboardLearner />}>
            <Route path="my-dashboard" element={<SessionReport />} />
            <Route path="user-report" element={<UserReports />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
