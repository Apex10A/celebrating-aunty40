import { label } from "framer-motion/client";
import { Eye, EyeOff, LockKeyholeIcon, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Credentials, Login } from "@/services/auth";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((curr) => !curr);
  };

  const validateForm = () => {};

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!credentials) return;
      const data = await Login(credentials);
      console.log(data);

      // Save the token
      const token = data.access_token;
      localStorage.setItem("token", token);

      // Redirect after login
      if (token) router.replace("/admin/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
              <span className="px-3 text-gray-400">
                <UserCircle className="h-5 w-5" />
              </span>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={credentials ? credentials.email : ""}
                className="w-full py-2 px-2 outline-none text-sm"
                onChange={(e) =>
                  setCredentials(
                    (curr) =>
                      ({
                        ...curr,
                        email: e.target.value,
                      } as Credentials)
                  )
                }
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
              <span className="px-3 text-gray-400">
                <LockKeyholeIcon className="h-5 w-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="w-full py-2 px-2 outline-none text-sm"
                required
                value={credentials ? credentials.password : ""}
                onChange={(e) =>
                  setCredentials(
                    (curr) =>
                      ({
                        ...curr,
                        password: e.target.value,
                      } as Credentials)
                  )
                }
              />
              <button
                type="button"
                onClick={togglePassword}
                className="px-3 text-gray-400 hover:text-yellow-500 focus:outline-none">
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-md shadow-md active:scale-95 transition-all duration-500 ease-in-out gradient-button">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
