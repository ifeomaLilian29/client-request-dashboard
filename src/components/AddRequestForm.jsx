import { useState } from "react";

export default function AddRequestForm({ onAdd }) {
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const newRequest = { client, description, priority, status };
    onAdd(newRequest); // send data to parent component
    // Clear the form
    setClient("");
    setDescription("");
    setPriority("Low");
    setStatus("Pending");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Client Name"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Request Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Request</button>
    </form>
  );
}
