import Head from "next/head";
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
    <>
      <Head>
        <title>Admin Login - 40 & 15 Years Celebration</title>
        <meta name="description" content="Admin login for the celebration CMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#1a1a1a] to-black px-4">
        <div className="w-full max-w-md bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#FFD700]/10">
          <h2 className="font-decorative text-3xl md:text-4xl text-[#FFD700] text-center mb-2">Admin Login</h2>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#FFD700] mb-2 text-sm md:text-base">
                Email
              </label>
              <div className="flex items-center bg-black/50 border border-[#FFD700]/20 rounded-md overflow-hidden focus-within:border-[#FFD700] focus-within:ring-1 focus-within:ring-[#FFD700]">
                <span className="px-3 text-[#FFD700]/70">
                  <UserCircle className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={credentials ? credentials.email : ""}
                  className="w-full py-2 px-2 bg-transparent text-white placeholder:text-[#FFD700]/40 outline-none text-sm md:text-base"
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-[#FFD700] mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="flex items-center bg-black/50 border border-[#FFD700]/20 rounded-md overflow-hidden focus-within:border-[#FFD700] focus-within:ring-1 focus-within:ring-[#FFD700]">
                <span className="px-3 text-[#FFD700]/70">
                  <LockKeyholeIcon className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="w-full py-2 px-2 bg-transparent text-white placeholder:text-[#FFD700]/40 outline-none text-sm md:text-base"
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
                  className="px-3 text-[#FFD700]/70 hover:text-[#FFD700] focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#FFD700] text-black rounded-xl hover:bg-[#FFD700]/90 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-widest uppercase text-sm md:text-base"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
