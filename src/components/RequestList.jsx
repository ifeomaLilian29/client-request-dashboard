export default function RequestList({ requests }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Client Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req, index) => (
            <li
              key={index}
              className="p-2 border rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{req.client}</strong>: {req.description}
              </div>
              <div className="text-sm text-gray-600">
                {req.priority} | {req.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
