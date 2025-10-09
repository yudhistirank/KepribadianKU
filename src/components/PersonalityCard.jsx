import React from "react";
import { Link } from "react-router-dom";

export default function PersonalityCard({ p }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold">
          {p.type}
        </div>
        <div>
          <div className="font-semibold">{p.type} — {p.personality}</div>
          <div className="text-sm text-gray-500 truncate">{p.description}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Link to={`/types/${p.type}`} className="text-indigo-600 hover:underline">Lihat detail</Link>
      </div>
    </div>
  );
}
