import { useState } from "react";
import AddRequestForm from "./components/AddRequestForm";
import RequestList from "./components/RequestList";

export default function App() {
  const [requests, setRequests] = useState([]);

  const handleAddRequest = (newRequest) => {
    setRequests([...requests, newRequest]);
  };

  return (
      <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Client Request Dashboard
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Track and manage all client requests
      </p>

      {/* Add Request Form */}
      <div className="mb-6">
        <AddRequestForm onAddRequest={handleAddRequest} />
      </div>

      {/* Request List */}
      <RequestList requests={requests} />
   
    </div>
  );
}
