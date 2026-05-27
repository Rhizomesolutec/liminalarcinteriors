"use client";
import React, { useState } from "react";
import { Plus, Trash2, Shield, Mail, Search, X, Calendar } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const AdminUsersDashboard = ({ userData: data }: { userData: User[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(data);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Admin" });
    setIsModalOpen(true);
  };

  const fetchUser = async () => {
    const res = await fetch("/api/adminDashboard/getuser");
    const data = await res.json();
    setUserData(data);
  };
  const handleDeleteUser = (userId: string) => {
    const res = fetch("/api/adminDashboard/deleteUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    toast.promise(res, {
      loading: "Deleting user...",
      success: () => {
        fetchUser(); 
        return "User deleted successfully ";
      },
      error: "Failed to delete user ",
    });
  };

  const handleSubmit = async () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", role: "Admin" });

    const res = fetch("/api/adminDashboard/addnewuser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    toast.promise(res, {
      loading: "Inviting user...",
      success: () => {
        fetchUser();
        return "User invited successfully ";
      },
      error: "Something went wrong ",
    });
  };

  const getRoleColor = (role: string) => {
    return role === "Super Admin"
      ? "bg-purple-500/20 text-purple-300"
      : "bg-blue-500/20 text-blue-300";
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-500/20 text-green-300"
      : "bg-red-500/20 text-red-300";
  };

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Users</h1>
              <p className="text-white/70">Manage your admin team members</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-6 py-3  text-white rounded-xl  shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            Add Admin User
          </button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.map((user) => (
            <div
              key={user.id}
              className="group p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-lg">
                    {/* {user.} */}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {user.user_metadata?.name}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        user.role!
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    user.user_metadata?.email_verified
                  )}`}
                >
                  {user.user_metadata?.email_verified}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-white/70">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Added {user.last_sign_in_at}</span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteUser(user.id)}
                className="flex-1 flex w-full items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-200 hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>

        {userData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No users found
            </h3>
            <p className="text-white/70">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingUser ? "Edit Admin User" : "Add New Admin User"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                >
                  <option value="Admin" className="bg-gray-800">
                    Admin
                  </option>
                  <option value="Super Admin" className="bg-gray-800">
                    Super Admin
                  </option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersDashboard;
