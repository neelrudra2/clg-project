import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import Navbar from '../components/Navbar';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(formData);

    if (data.token) {
      login(data);
      navigate(data.role === 'tnp' ? '/tnp' : '/student');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN SECTION ================= */}
      <div className="flex flex-1 items-center justify-center relative px-4">
        {/* ===== Background Glow Layers ===== */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-purple-500 opacity-10 rounded-full blur-[120px]" />

        {/* ===== Login Card ===== */}
        <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>

          {/* ===== Form (LOGIC UNCHANGED) ===== */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <p className="text-center mt-8 text-slate-400 text-sm">
            <Link
              to="/forgot-password"
              className="text-indigo-400 font-medium hover:text-violet-400 transition"
            >
              Forgot Password?
            </Link>
          </p>

          {/* Register Link */}
          <p className="text-center mt-8 text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-400 font-medium hover:text-violet-400 transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
