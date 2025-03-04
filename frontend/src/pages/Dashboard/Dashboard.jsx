import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import PostsGrid from "./PostsGrid";
import ProfileEdit from "../../Components/ProfileEdit";
import { useTheme } from "../../context/ThemeContext";
import { usePosts } from "../../hooks/usePosts";
import { ChatDrawer } from "../../Components/chat/ChatDrawer";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const chatDrawerRef = useRef(null);
  const [view, setView] = useState("all");
  const { posts } = usePosts();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsProfileMenuOpen(false);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div
        className={`min-h-screen ${
          isDark ? "dark bg-gray-900" : "bg-gray-50"
        } relative`}
      >
        {/* Header móvil */}
        <MobileHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDark={isDark}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Sidebar fijo para escritorio y overlay para móvil */}
        <div>
          {/* Para escritorio: Sidebar fijo */}
          <div className="hidden lg:block fixed inset-y-0 left-0 w-72">
            <Sidebar
              isSidebarOpen={true}
              setIsSidebarOpen={setIsSidebarOpen}
              toggleTheme={toggleTheme}
              isDark={isDark}
              setIsEditProfileOpen={setIsEditProfileOpen}
              isProfileMenuOpen={isProfileMenuOpen}
              toggleProfileMenu={toggleProfileMenu}
              view={view}
              setView={setView}
            />
          </div>
          {/* Para móvil: Sidebar overlay */}
          {isSidebarOpen && (
            <div className="lg:hidden">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleTheme={toggleTheme}
                isDark={isDark}
                setIsEditProfileOpen={setIsEditProfileOpen}
                isProfileMenuOpen={isProfileMenuOpen}
                toggleProfileMenu={toggleProfileMenu}
                view={view}
                setView={setView}
              />
            </div>
          )}
        </div>

        {/* Header de escritorio */}
        <Header
          toggleProfileMenu={toggleProfileMenu}
          isProfileMenuOpen={isProfileMenuOpen}
          closeProfileMenu={closeProfileMenu}
          setIsEditProfileOpen={setIsEditProfileOpen}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="pt-24 lg:ml-72">
            <PostsGrid
              posts={posts}
              onPostClick={handlePostClick}
              selectedPost={selectedPost}
              onClosePostModal={handleClosePostModal}
              view={view}
            />
            {/* Contenido principal de tu dashboard */}
          </div>
        </main>

        {selectedPost && (
          <PostCardModal post={selectedPost} onClose={handleClosePostModal} />
        )}

        {isEditProfileOpen && (
          <div>
            <ProfileEdit onClose={() => setIsEditProfileOpen(false)} />
          </div>
        )}
      </div>

      <ChatDrawer ref={chatDrawerRef} showFloatingButton={true} />
    </>
  );
}

export default Dashboard;
