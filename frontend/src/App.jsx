import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";

import { ContextProvider } from "./context/GlobalContext";
import { Routes, Route, useNavigate, Router } from "react-router-dom";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
