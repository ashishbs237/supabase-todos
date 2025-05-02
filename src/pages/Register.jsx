import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Name" className="border p-2 rounded" />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500  p-2 rounded">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
