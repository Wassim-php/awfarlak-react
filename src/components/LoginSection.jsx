import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, TrendingDown } from "lucide-react";
import AuthService from "../services/authService";

const LoginSection = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.login(credentials.username, credentials.password);
      navigate("/home");
    } catch (err) {
      const msg = err.message || "Invalid credentials. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. BACKGROUND: Deep Professional Gradient (The "Trust" Vibe)
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden font-sans">
      
      {/* 2. AMBIENT GLOW EFFECTS (Subtle background movement) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* 3. THE GLASS CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10 mx-4">
        
        {/* Top Decorative Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

        <div className="p-8 md:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-blue-200 mt-2 text-sm">
              Sign in to track prices & deliveries
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-3 backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-300 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full relative flex justify-center items-center py-4 px-4 border border-transparent rounded-xl text-white font-bold text-md uppercase tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all shadow-lg shadow-blue-600/20 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Sign In to Platform
                  <LogIn className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-white hover:text-blue-300 transition-colors underline decoration-blue-500/50 hover:decoration-blue-300">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;