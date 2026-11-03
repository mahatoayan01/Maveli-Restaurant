import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: "bg-kerala-900 text-cream-50 border-gold-500",
    error: "bg-terracotta-700 text-white border-terracotta-400",
    info: "bg-kerala-800 text-cream-50 border-kerala-600",
  }[type] || "bg-kerala-900 text-white border-gold-500";

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[type] || CheckCircle2;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl max-w-md ${bgStyles}`}>
        <Icon className="w-5 h-5 text-gold-400 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-1 hover:opacity-75 transition-opacity ml-auto"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
