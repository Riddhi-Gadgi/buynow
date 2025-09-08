import React, { useState, useEffect } from "react";

export default function FilterBar({ filters, setFilters }) {
  const [localMin, setLocalMin] = useState(filters.min || 0);
  const [localMax, setLocalMax] = useState(filters.max || 10000);

  useEffect(() => {
    setFilters({ ...filters, min: localMin, max: localMax });
  }, [localMin, localMax]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Type Filter */}
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="All">All</option>
        <option value="Top wear">Top Wear</option>
        <option value="Bottom wear">Bottom Wear</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Price Range */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500">₹</span>
        <input
          type="number"
          min={0}
          max={10000}
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="w-20 px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <span className="font-semibold text-gray-600">-</span>
        <input
          type="number"
          min={0}
          max={10000}
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="w-20 px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>
  );
}
