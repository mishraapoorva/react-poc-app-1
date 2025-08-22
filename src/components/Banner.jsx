import React, { useState } from "react";
import { Bell, ChevronDown, User } from "lucide-react";

export default function Banner() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-blue-600" />
          <h1 className="text-xl font-bold">SEN Platform</h1>
          <span className="ml-2 inline-flex items-center rounded-full border border-blue-200 px-2 py-0.5 text-xs text-blue-700">POC</span>
        </div>

        <div className="flex gap-3 items-center">
          <button className="relative h-10 w-10 flex items-center justify-center border rounded-xl bg-white hover:shadow">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 border rounded-xl bg-white hover:shadow"
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Apoorva</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Profile</button>
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Settings</button>
                <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
