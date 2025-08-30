// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    client: "",
    description: "",
    priority: "Low",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(storedRequests);
  }, []);

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedRequests = [...requests];
      updatedRequests[editingIndex] = formData;
      setRequests(updatedRequests);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setRequests([...requests, formData]);
    }
    setFormData({ client: "", description: "", priority: "Low", status: "Pending" });
  };

  const handleDelete = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
  };

  const handleEdit = (index) => {
    setFormData(requests[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const filteredRequests = requests
    .filter((req) => (filterClient ? req.client.toLowerCase().includes(filterClient.toLowerCase()) : true))
    .filter((req) => (filterStatus ? req.status === filterStatus : true));

  const sortedRequests = filteredRequests.sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Client Request Dashboard</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Client Name</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Request Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold ${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Update Request" : "Add Request"}
        </button>
      </form>

      {/* Filters */}
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by client"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="max-w-3xl mx-auto grid gap-4">
        {sortedRequests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found.</p>
        ) : (
          sortedRequests.map((req, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-2 md:mb-0">
                <h2 className="font-semibold text-lg">{req.client}</h2>
                <p className="text-gray-600">{req.description}</p>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    req.priority === "High" ? "bg-red-500" :
                    req.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"
                  }`}>
                    {req.priority}
                  </span>
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    req.status === "Pending" ? "bg-gray-500" :
                    req.status === "In Progress" ? "bg-blue-500" : "bg-green-600"
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
