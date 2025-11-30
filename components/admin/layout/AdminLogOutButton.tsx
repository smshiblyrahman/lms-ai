"use client";

import { useLogOut } from "@sanity/sdk-react";

function AdminLogOutButton() {
  const logout = useLogOut();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
    >
      Logout
    </button>
  );
}

export default AdminLogOutButton;
