import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import PostsGrid from "./PostsGrid";
import { useTheme } from "../../context/ThemeContext";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const handleShowPosts = (allPosts) => {
    setShowAllPosts(allPosts);
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Mobile Header */}
      <MobileHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        isDark={isDark}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleTheme={toggleTheme}
          isDark={isDark}
          onShowPosts={handleShowPosts}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 lg:ml-64">
          {/* Header */}
          <Header
            toggleProfileMenu={toggleProfileMenu}
            isProfileMenuOpen={isProfileMenuOpen}
            closeProfileMenu={closeProfileMenu}
          />
          {/* Posts Grid */}
          <PostsGrid showAllPosts={showAllPosts} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
