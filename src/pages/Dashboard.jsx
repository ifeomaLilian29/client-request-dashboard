// src/pages/Dashboard.jsx
import React, { useState } from "react";

const Dashboard = () => {
  const [requests, setRequests] = useState([
    { id: 1, client: "Client A", task: "Schedule meeting", priority: "High", status: "Pending" },
    { id: 2, client: "Client B", task: "Prepare report", priority: "Medium", status: "Completed" },
  ]);

  const [newRequest, setNewRequest] = useState({ client: "", task: "", priority: "Low", status: "Pending" });

  const handleAddRequest = () => {
    if (!newRequest.client || !newRequest.task) return;
    setRequests([
      ...requests,
      { id: Date.now(), ...newRequest }
    ]);
    setNewRequest({ client: "", task: "", priority: "Low", status: "Pending" });
  };

  const toggleStatus = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id
          ? { ...req, status: req.status === "Pending" ? "Completed" : "Pending" }
          : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Client Request Dashboard</h1>

      {/* Add Request Form */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Request</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={newRequest.client}
            onChange={(e) => setNewRequest({ ...newRequest, client: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Task"
            value={newRequest.task}
            onChange={(e) => setNewRequest({ ...newRequest, task: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={newRequest.priority}
            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            onClick={handleAddRequest}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Request
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white p-4 rounded-2xl shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Requests</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Task</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="text-center">
                <td className="p-2 border">{req.client}</td>
                <td className="p-2 border">{req.task}</td>
                <td className="p-2 border">{req.priority}</td>
                <td className={`p-2 border font-semibold ${req.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                  {req.status}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleStatus(req.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">No requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
