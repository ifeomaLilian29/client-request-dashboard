// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const BADGE = {
  High:   "bg-red-50 text-red-700 border border-red-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Low:    "bg-green-50 text-green-700 border border-green-200",
};

const STATUS = {
  true:  "bg-green-50 text-green-700 border border-green-200",   // completed
  false: "bg-amber-50 text-amber-700 border border-amber-200",   // pending
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [newText, setNewText] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const [filter, setFilter] = useState("all"); // all | pending | completed
  const [search, setSearch] = useState("");

  // --- Load session + data (no blinking) ---
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(saved);
  }, [navigate]);

  // --- Helpers to persist ---
  const save = (next) => {
    setRequests(next);
    localStorage.setItem("requests", JSON.stringify(next));
  };

  // --- Actions ---
  const addRequest = (e) => {
    e?.preventDefault?.();
    if (!newText.trim()) return;

    const item = {
      id: Date.now(),
      text: newText.trim(),
      client: newClient.trim() || "",     // keep optional to not break old data
      priority: newPriority || "Medium",  // default
      completed: false,
      createdAt: Date.now(),
    };
    const next = [...requests, item];
    save(next);
    setNewText("");
    setNewClient("");
    setNewPriority("Medium");
  };

  const toggleRequest = (id) => {
    const next = requests.map((r) =>
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    save(next);
  };

  const deleteRequest = (id) => {
    const next = requests.filter((r) => r.id !== id);
    save(next);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // --- Derived (filter + search) ---
  const filtered = useMemo(() => {
    let list = [...requests];

    if (filter !== "all") {
      const wantCompleted = filter === "completed";
      list = list.filter((r) => !!r.completed === wantCompleted);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => {
        const t = (r.text || "").toLowerCase();
        const c = (r.client || "").toLowerCase();
        return t.includes(q) || c.includes(q);
      });
    }

    // newest first
    list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return list;
  }, [requests, filter, search]);

  const total = requests.length;
  const done = requests.filter((r) => r.completed).length;
  const pending = total - done;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Client Request Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 transition rounded-lg px-3 py-2 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-sm rounded-xl p-4">
            <p className="text-slate-500 text-sm">Total</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4">
            <p className="text-slate-500 text-sm">Pending</p>
            <p className="text-2xl font-semibold text-amber-600">{pending}</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4">
            <p className="text-slate-500 text-sm">Completed</p>
            <p className="text-2xl font-semibold text-green-600">{done}</p>
          </div>
        </section>

        {/* Add form */}
        <section className="bg-white shadow-sm rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Add New Request</h2>
          <form
            onSubmit={addRequest}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="text"
              placeholder="Client (optional)"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              className="w-full sm:max-w-[220px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Describe the request…"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full sm:w-auto border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-medium transition"
            >
              Add
            </button>
          </form>
        </section>

        {/* Toolbar: filters + search */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="inline-flex rounded-lg overflow-hidden border bg-white shadow-sm">
            {["all", "pending", "completed"].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 text-sm capitalize ${
                  filter === key
                    ? "bg-slate-100 font-semibold"
                    : "hover:bg-slate-50"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search client or request…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 border rounded-lg pl-3 pr-10 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Clear"
              >
                ×
              </button>
            )}
          </div>
        </section>

        {/* Table */}
        <section className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Client</th>
                  <th className="text-left font-semibold px-4 py-3">Request</th>
                  <th className="text-left font-semibold px-4 py-3">Priority</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-left font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                      No matching requests.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => {
                    const priority = r.priority || "Medium";
                    const client = r.client || "—";
                    return (
                      <tr key={r.id} className="border-t">
                        <td className="px-4 py-3">{client}</td>
                        <td className="px-4 py-3">
                          <span className="block max-w-xl truncate" title={r.text}>
                            {r.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${BADGE[priority] || BADGE.Medium}`}>
                            {priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${STATUS[r.completed]}`}>
                            {r.completed ? "Completed" : "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleRequest(r.id)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                                r.completed
                                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                                  : "bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white"
                              }`}
                              title="Toggle status"
                            >
                              {r.completed ? "Undo" : "Mark Done"}
                            </button>
                            <button
                              onClick={() => deleteRequest(r.id)}
                              className="px-3 py-1 rounded-lg text-xs font-medium border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
                              title="Delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
