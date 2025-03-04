import React from "react";

const Avatar = ({ profile }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center">
      {profile?.avatar && profile.avatar.trim() !== "" ? (
        <img
          src={profile.avatar}
          alt="Profile Avatar"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-lg font-medium text-rose-600 dark:text-rose-400">
          {profile?.full_name?.charAt(0)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
