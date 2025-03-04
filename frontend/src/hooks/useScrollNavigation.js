import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    navigate(`/#${section}`);
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return { handleNavigation };
};

export default useScrollNavigation;
