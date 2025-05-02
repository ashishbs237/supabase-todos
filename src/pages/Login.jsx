import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { AppContext } from "../ContextProvider";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleInput = (key, val) => {
    setUserData({ ...userData, [key]: val });
  };
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (!error) {
      setUser(data.user);
      navigate("/home");
    } else alert(error.message);
  };
  return (
    <div className="w-full max-w-sm bg-white dark:bg-[#1e1e1e] shadow-md rounded-xl p-6 mx-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Login
      </h1>

      <div className="flex flex-col gap-4">
        <input
          value={userData.email}
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2e2e2e] dark:border-gray-600 dark:text-white"
          onChange={({ target: { value } }) => handleInput("email", value)}
        />
        <input
          value={userData.password}
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2e2e2e] dark:border-gray-600 dark:text-white"
          onChange={({ target: { value } }) => handleInput("password", value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 font-medium py-2 rounded-md transition duration-200"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>

      <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
