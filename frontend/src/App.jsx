import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import PostForm from "./pages/Dashboard/PostForm";
import { GlobalProvider } from "./context/GlobalContext";
import { PostsProvider } from "./context/PostsContext";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GlobalProvider>
      <PostsProvider>
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
          <Route
            path="/dashboard/post/new"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </PostsProvider>
    </GlobalProvider>
  );
}

export default App;
