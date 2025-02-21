import React from "react";
import { Heart } from "lucide-react";
const Title = () => {
  return (
    <div className="flex items-center gap-2">
      <Heart className="h-6 w-6 text-rose-600" />
      <span className="font-semibold text-xl dark:text-white">ReUseHub</span>
    </div>
  );
};

export default Title;
