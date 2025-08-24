// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }

    const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(savedRequests);
  }, [navigate]);

  const addRequest = () => {
    if (!newRequest.trim()) return;
    const request = { id: Date.now(), text: newRequest, completed: false };
    const updatedRequests = [...requests, request];
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setNewRequest("");
  };

  const toggleRequest = (id) => {
    const updatedRequests = requests.map((r) =>
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) =>
          filter === "completed" ? r.completed : !r.completed
        );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Client Requests</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
            placeholder="Add new request"
            className="flex-1 border px-3 py-2 rounded mr-2"
          />
          <button
            onClick={addRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded mr-2 ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded mr-2 ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded ${
              filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Pending
          </button>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <ul>
            {filteredRequests.map((r) => (
              <li
                key={r.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span className={r.completed ? "line-through text-gray-400" : ""}>
                  {r.text}
                </span>
                <button
                  onClick={() => toggleRequest(r.id)}
                  className={`px-3 py-1 rounded ${
                    r.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {r.completed ? "Done" : "Pending"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
