import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const APIBASEURL = import.meta.env.VITE_APIBASEURL;

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${APIBASEURL}login`, formData);

      console.log("ADMIN LOGIN RESPONSE:", response.data);

      if (response.data._status) {
        // Store JWT token
        Cookies.set("admin_login", response.data.token);

        // Store admin data
        localStorage.setItem(
          "adminData",
          JSON.stringify(response.data.adminData),
        );

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(response.data._message);
      }
    } catch (error) {
      console.log("ADMIN LOGIN ERROR:", error);

      if (error.response?.data?._message) {
        setError(error.response.data._message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[950px] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[42%_58%]">
          {/* LEFT SIDE */}
          <div className="relative bg-[#3B82F6] px-8 py-12 md:px-10 md:py-16 text-white overflow-hidden">
            {/* Background circles */}
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>

            <div className="relative z-10 h-full flex flex-col">
              {/* Logo */}
              <div>

                <div className="w-12 h-1 bg-white mt-3 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="mt-16">
                <h2 className="text-3xl font-semibold leading-tight">
                  Welcome Back!
                </h2>

                <p className="mt-5 text-blue-100 leading-7">
                  Login to your admin account and manage your website, products,
                  orders and customers from one place.
                </p>
              </div>

              {/* Features */}
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-blue-50">Manage your products</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-blue-50">Manage customer orders</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-blue-50">Control your website</span>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-auto pt-16">
                <p className="text-sm text-blue-100">Secure Admin Panel</p>

                <p className="text-xs text-blue-200 mt-2">
                  © 2026 K-WD. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="px-7 py-10 sm:px-10 md:px-12 md:py-14">
            <div className="max-w-[500px] mx-auto">
              {/* Heading */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Admin Login
                </h2>

                <p className="text-gray-500 mt-2">
                  Sign in to access your admin dashboard.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="mt-7">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Password */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm text-[#3B82F6] hover:underline"
                      onClick={() => {
                        // Forgot password will be implemented later
                        alert("Forgot password will be added later.");
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-[#3B82F6]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center mt-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-[#3B82F6]"
                  />

                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember Me
                  </label>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 rounded-lg transition duration-200"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-7">
                  <div className="flex-1 h-px bg-gray-200"></div>

                  <span className="text-sm text-gray-400">OR</span>

                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Google */}
                <button
                  type="button"
                  className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <span className="mr-2">G</span>
                  Continue with Google
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="w-full mt-3 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <span className="mr-2">f</span>
                  Continue with Facebook
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-400 mt-8">
                By continuing, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
