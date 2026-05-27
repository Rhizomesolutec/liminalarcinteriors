"use client";
import React, { useState } from "react";
import {
  Eye,
  Mail,
  Phone,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import CountryFlag from "./countryFlag";

type ActionStatus = "new" | "in_progress" | "resolved";

interface ContactMessage {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  submitted_at: string;
  is_readed: boolean;
  action_status: ActionStatus;
  ip_address: {
    ip: string;
    region?: string;
    country?: string;
    regionName?: string;
    countryCode?: string;
  };
}

interface StatusConfig {
  color: string;
  bg: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface MessageAdminPanelProps {
  inistalData: ContactMessage[];
}

const MessageAdminPanel: React.FC<MessageAdminPanelProps> = ({
  inistalData,
}) => {
  const [messages, setMessages] = useState<ContactMessage[]>(inistalData);

  // Supabase real-time subscription
  supabase
    .channel("contact-admin-panel-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "contact_messages",
      },
      (payload) => {
        if (payload.new) {
          console.log(payload.new);
          setMessages((prevMessages) => [
            payload.new as ContactMessage,
            ...prevMessages,
          ]);
        }
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "contact_messages",
      },
      (payload) => {
        if (payload.new) {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === payload.new.id ? (payload.new as ContactMessage) : msg
            )
          );
        }
      }
    )
    .subscribe();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<ActionStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const statusConfig: Record<ActionStatus, StatusConfig> = {
    new: {
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      icon: Clock,
      label: "New",
    },
    in_progress: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      icon: AlertCircle,
      label: "In Progress",
    },
    resolved: {
      color: "text-green-400",
      bg: "bg-green-500/20",
      icon: CheckCircle,
      label: "Resolved",
    },
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || message.action_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const handleStatusChange = async (
    messageId: string,
    newStatus: ActionStatus
  ): Promise<void> => {
    try {
      await fetch("/api/messages/updateMessageActionstatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId, action_status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update message status:", error);
    }
  };

  const openModal = async (message: ContactMessage): Promise<void> => {
    setSelectedMessage(message);
    setShowModal(true);
    if (!message.is_readed) {
      try {
        await fetch("/api/messages/updateMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: message.id }),
        });
      } catch (error) {
        console.error("Failed to mark message as read:", error);
      }
    }
  };

  const unreadCount = messages.filter((msg) => !msg.is_readed).length;
  const newCount = messages.filter((msg) => msg.action_status === "new").length;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Contact Messages
              </h1>
              <div className="flex gap-4 text-sm">
                <span className="text-blue-400">Total: {messages.length}</span>
                <span className="text-yellow-400">New: {newCount}</span>
                <span className="text-red-400">Unread: {unreadCount}</span>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="md:flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                />
              </div>

              <div className="relative md:mt-0 mt-3 ">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFilterStatus(e.target.value as ActionStatus | "all")
                  }
                  className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-lg">No messages found</div>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredMessages.map((message) => {
                const StatusIcon = statusConfig[message.action_status].icon;

                return (
                  <div
                    key={message.id}
                    className={`p-6 hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                      !message.is_readed
                        ? "bg-blue-500/5 border-l-2 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          statusConfig[message.action_status].bg
                        }`}
                      >
                        <StatusIcon
                          className={`w-5 h-5 ${
                            statusConfig[message.action_status].color
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className={`font-semibold ${
                              !message.is_readed
                                ? "text-white"
                                : "text-gray-200"
                            }`}
                          >
                            {message.fullname}
                          </h3>
                          {!message.is_readed && (
                            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                              New
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              statusConfig[message.action_status].bg
                            } ${statusConfig[message.action_status].color}`}
                          >
                            {statusConfig[message.action_status].label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {message.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {message.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(message.submitted_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <CountryFlag
                              code={message.ip_address?.countryCode}
                            />
                            {/* <Flag
                              countryCode={
                                message.ip_address?.countryCode || ""
                              }
                            /> */}
                            {message.ip_address?.country},
                            {message.ip_address?.regionName}
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm line-clamp-2">
                          {message.message}
                        </p>
                      </div>

                      <div className="flex gap-2 text-black">
                        <select
                          value={message.action_status}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            e.stopPropagation();
                            handleStatusChange(
                              message.id,
                              e.target.value as ActionStatus
                            );
                          }}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>

                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            openModal(message);
                          }}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Message Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                    <label className="text-gray-400 text-sm">Full Name</label>
                    <p className="text-white font-medium">
                      {selectedMessage.fullname}
                    </p>
                  </div>

                  <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                    <label className="text-gray-400 text-sm">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          statusConfig[selectedMessage.action_status].bg
                        } ${statusConfig[selectedMessage.action_status].color}`}
                      >
                        {statusConfig[selectedMessage.action_status].label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white font-medium">
                    {selectedMessage.email}
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <label className="text-gray-400 text-sm">Phone</label>
                  <p className="text-white font-medium">
                    {selectedMessage.phone}
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <label className="text-gray-400 text-sm">Submitted At</label>
                  <p className="text-white font-medium">
                    {formatDate(selectedMessage.submitted_at)}
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
                  <label className="text-gray-400 text-sm">Message</label>
                  <p className="text-white mt-2 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <select
                    value={selectedMessage.action_status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleStatusChange(
                        selectedMessage.id,
                        e.target.value as ActionStatus
                      )
                    }
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors backdrop-blur-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageAdminPanel;
