import Head from "next/head";
import { Eye, EyeOff, LockKeyholeIcon, UserCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Credentials, Login } from "@/services/auth";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Toast state (consistent with dashboard)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>(
    { show: false, message: "", type: "success" }
  );
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function showToast(message: string, type: "success" | "error" = "success") {
      console.log("Toast triggered:", message, type); // Debug
    setToast({ show: true, message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  }
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const togglePassword = () => setShowPassword((curr) => !curr);

  const validateForm = () => {};

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log("Current credentials:", credentials);

    e.preventDefault();
    // manual validation to ensure our toast can show even if fields are empty
    if (!credentials?.email || !credentials?.password) {
      showToast("Please enter email and password", "error");
      return;
    }
    setIsLoading(true);
    try {
      const data = await Login(credentials);

      // Save the token
      const token = data.access_token;
      localStorage.setItem("token", token);

      // Show success and give it time to display before redirect
      showToast("Login successful", "success");
      if (token) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        router.replace("/admin/dashboard");
      }
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Login failed", "error");
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
          <form onSubmit={handleLogin} noValidate>
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
                    setCredentials((curr) => ({ ...(curr || {}), email: e.target.value } as Credentials))
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
                    setCredentials((curr) => ({ ...(curr || {}), password: e.target.value } as Credentials))
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

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[50]">
          <div
            className={`px-4 py-3 rounded-md shadow-lg border ${
              toast.type === "success"
                ? "bg-black/70 border-emerald-500/40 text-emerald-300"
                : "bg-black/70 border-rose-500/40 text-rose-300"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;