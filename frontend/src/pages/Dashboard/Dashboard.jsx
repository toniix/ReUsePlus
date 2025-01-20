import React, { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import PostsGrid from "./PostsGrid";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [selectedPost, setSelectedPost] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // const handlePostClick = (post) => {
  //   setSelectedPost(post);
  // };

  // const closeModal = () => {
  //   setSelectedPost(null);
  // };

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
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <Header />
          {/* Posts Grid */}
          <PostsGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
