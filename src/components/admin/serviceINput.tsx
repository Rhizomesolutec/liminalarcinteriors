"use clinet";
import { Plus } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

export default function ServiceINput({
  addSubService,
  service,
}: {
  addSubService: (newSubService: string, selectedService: string) => void;
  service: string;
}) {
  const [newSubService, setNewSubService] = useState<string>("");

  return (
    <>
      <input
        type="text"
        value={newSubService}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setNewSubService(e.target.value);
        }}
        placeholder="Add sub-service"
        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7F6456]"
      />
      <button
        onClick={() => {
          addSubService(newSubService, service);
          setNewSubService("");
        }}
        className="px-3 py-2 bg-[#7F6456]/30 hover:bg-[#7F6456]/50 rounded-lg text-[#7F6456] text-sm font-medium transition-colors"
      >
        <Plus size={14} />
      </button>
    </>
  );
}
