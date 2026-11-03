import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const { login, isOwner } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOwner) {
      navigate("/owner");
    }
  }, [isOwner, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate("/owner");
    } catch (err) {
      setErrorMessage(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("owner@mavelirestaurant.in");
    setPassword("maveli123");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-kerala-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream-300 hover:text-gold-300 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Customer Site
        </Link>

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto shadow-lg shadow-black/40 text-kerala-950">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-serif font-bold text-3xl text-cream-50 tracking-tight">
            Maveli Management
          </h1>
          <p className="text-xs sm:text-sm text-cream-300">
            Private Portal for Restaurant Owner & Kitchen Staff
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-kerala-900 py-8 px-6 sm:px-10 rounded-3xl border border-kerala-800 shadow-2xl space-y-6">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cream-200 mb-1.5">
                Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-kerala-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@mavelirestaurant.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-kerala-700 bg-kerala-950 text-cream-50 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cream-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-kerala-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-kerala-700 bg-kerala-950 text-cream-50 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-kerala-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-kerala-800 text-center space-y-3">
            <span className="text-[11px] text-cream-400 block">
              Evaluating or testing the owner console?
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 bg-kerala-800/80 hover:bg-kerala-800 text-gold-300 border border-gold-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Fill Demo Owner Credentials
            </button>
            <p className="text-[10px] text-cream-400 italic">
              Email: owner@mavelirestaurant.in &bull; Pass: maveli123
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

