function LoginPage({ onLogin }) {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Client Request Dashboard
        </h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          onClick={onLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

