"use client";

export function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect
  };

  return (
    <button
      className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
      onClick={handleLogout}>
      Logout
    </button>
  );
}
