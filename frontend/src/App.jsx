import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";

import { Routes, Route, useNavigate } from "react-router-dom";
import { supabaseClient } from "./supabase/client";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
