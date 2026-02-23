"use client";

import { Trash2 } from "lucide-react";
import { deleteService } from "./actions/services";
import { useState } from "react";

export function DeleteServiceButton({
  serviceId,
  serviceTitle,
}: {
  serviceId: number;
  serviceTitle: string;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-400">Delete?</span>
        <button
          onClick={() => deleteService(serviceId)}
          className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs rounded bg-white/5 text-white/50 hover:bg-white/10 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 rounded-lg hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
