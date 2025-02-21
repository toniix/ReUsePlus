import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import PostsGrid from "./PostsGrid";
import ProfileEdit from "../../Components/ProfileEdit";
import { useTheme } from "../../context/ThemeContext";
import { usePostsContext } from "../../context/PostsContext";
import { ChatDrawer } from "../../Components/chat/ChatDrawer";
import { MessageCircle } from "react-feather";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const { posts, setPosts, fetchPosts } = usePostsContext();
  const chatDrawerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
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

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  const handleEditPost = (post) => {
    setSelectedPost(null);
  };

  const handleTogglePostsView = () => {
    setShowAllPosts(!showAllPosts);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsProfileMenuOpen(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchPosts(showAllPosts);
  }, [showAllPosts]);

  return (
    <>
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
            setIsEditProfileOpen={setIsEditProfileOpen}
            isProfileMenuOpen={isProfileMenuOpen}
            toggleProfileMenu={toggleProfileMenu}
            onTogglePostsView={handleTogglePostsView}
            showAllPosts={showAllPosts}
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
              posts={posts}
              onPostClick={handlePostClick}
              selectedPost={selectedPost}
              onClosePostModal={handleClosePostModal}
              onPostDeleted={handlePostDeleted}
              onEditPost={handleEditPost}
              showAllPosts={showAllPosts}
            />
          </main>
        </div>

        {selectedPost && (
          <PostCardModal
            post={selectedPost}
            onClose={handleClosePostModal}
            onPostDeleted={handlePostDeleted}
            onEdit={handleEditPost}
          />
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
