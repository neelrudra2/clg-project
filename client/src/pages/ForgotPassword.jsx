import { useState } from 'react';
import { forgotPassword } from '../services/authService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await forgotPassword(email);

    if (data.resetToken) {
      navigate(`/reset-password/${data.resetToken}`);
    } else {
      setMessage(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-hidden">
      <Navbar />

      <div className="flex flex-1 items-center justify-center relative px-4">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-purple-500 opacity-10 rounded-full blur-[120px]" />

        <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Send Reset Link
            </button>
          </form>

          {message && <p className="text-center mt-6 text-indigo-400 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
