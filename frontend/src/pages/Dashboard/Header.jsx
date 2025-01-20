import { Search, Filter, ChevronDown, Plus } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
      <div className="relative w-full lg:w-96">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search donations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
          <Filter className="h-5 w-5" />
          <span className="hidden sm:inline">Filter</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700">
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Donate Item</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
