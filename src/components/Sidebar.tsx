import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold">Note App by Jay</div>
        <nav className="mt-10">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Notes
          </a>
        </nav>
      </div>
      <div className="p-4">
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="/profile.jpg"
              alt="User Profile"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">User Name</p>
              <button className="text-xs text-gray-400 hover:underline">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
