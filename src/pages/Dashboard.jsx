// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setUser }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Load requests from localStorage (simulated)
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(savedRequests);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirect to login
  };

  const togglePriority = (index) => {
    const updated = [...requests];
    updated[index].priority =
      updated[index].priority === "High" ? "Low" : "High";
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Client Request Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          Welcome, {JSON.parse(localStorage.getItem("user"))?.email}
        </h2>

        {/* Add new request */}
        <button
          onClick={() => {
            const newRequest = {
              id: Date.now(),
              name: "New Request",
              priority: "Low",
              status: "Pending",
            };
            const updated = [...requests, newRequest];
            setRequests(updated);
            localStorage.setItem("requests", JSON.stringify(updated));
          }}
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Client Request
        </button>

        {/* Requests Table */}
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-purple-100">
              <th className="p-2 text-left">Request</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id} className="border-b">
                <td className="p-2">{req.name}</td>
                <td className="p-2">{req.priority}</td>
                <td className="p-2">{req.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => togglePriority(index)}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 mr-2"
                  >
                    Toggle Priority
                  </button>
                  <button
                    onClick={() => {
                      const updated = requests.filter((_, i) => i !== index);
                      setRequests(updated);
                      localStorage.setItem(
                        "requests",
                        JSON.stringify(updated)
                      );
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No client requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Dashboard;
