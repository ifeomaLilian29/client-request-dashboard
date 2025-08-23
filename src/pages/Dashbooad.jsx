// src/pages/Dashboard.jsx
import { useState } from "react";
import AddRequestForm from "../components/AddRequestForm";
import RequestList from "../components/RequestList";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  const handleAddRequest = (newRequest) => {
    setRequests((prev) => [...prev, newRequest]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top purple bar to match your Figma */}
      <header className="bg-purple-700 text-white rounded-xl shadow p-4 mb-6">
        <h1 className="text-2xl font-bold">Client Work Organizer</h1>
        <p className="text-sm text-purple-100">Dashboard</p>
      </header>

      {/* Two-column layout: Add Request (left) + List (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Add Request</h2>
          <AddRequestForm onAdd={handleAddRequest} />
        </section>

        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Requests</h2>
          <RequestList requests={requests} />
        </section>
      </div>
    </div>
  );
}
