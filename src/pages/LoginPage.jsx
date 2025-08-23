// src/pages/LoginPage.jsx
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Client Work Organizer</h1>
        <p className="text-gray-600 mb-6">Log in to access your dashboard.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="w-full bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800"
          >
            Log In (placeholder)
          </button>
        </form>
      </div>
    </div>
  );
}
