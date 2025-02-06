import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import PostsGrid from "./PostsGrid";
import ProfileEdit from "../../Components/ProfileEdit";
import { useTheme } from "../../context/ThemeContext";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };
  // Efecto para cerrar el menú de perfil cuando se cierra el sidebar
  useEffect(() => {
    if (!isSidebarOpen) {
      setIsProfileMenuOpen(false);
    }
  }, [isSidebarOpen]);

  const handleShowPosts = (allPosts) => {
    setShowAllPosts(allPosts);
  };

  const handlePostDeleted = (deletedPostId) => {
    // Actualizar el estado de posts eliminando el post específico
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== deletedPostId)
    );
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
          setIsEditProfileOpen={setIsEditProfileOpen}
          isProfileMenuOpen={isProfileMenuOpen}
          toggleProfileMenu={toggleProfileMenu}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 lg:ml-64">
          {/* Header */}
          <Header
            toggleProfileMenu={toggleProfileMenu}
            isProfileMenuOpen={isProfileMenuOpen}
            closeProfileMenu={closeProfileMenu}
            setIsEditProfileOpen={setIsEditProfileOpen}
          />
          {/* Posts Grid */}
          <PostsGrid
            showAllPosts={showAllPosts}
            posts={posts}
            handlePostDeleted={handlePostDeleted}
          />
        </main>
      </div>

      {/* Profile Edit Modal */}
      {isEditProfileOpen && (
        <ProfileEdit onClose={() => setIsEditProfileOpen(false)} />
      )}
    </div>
  );
}

export default Dashboard;
