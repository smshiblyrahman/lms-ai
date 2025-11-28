"use client";

import AdminLogOutButton from "./AdminLogOutButton";

function AdminHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Admin Header</h1>
      <AdminLogOutButton />
    </header>
  );
}

export default AdminHeader;
