import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import Navbar from '../components/Navbar';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const data = await resetPassword(token, password);

    if (data.message === 'Password reset successful') {
      alert('Password reset successful. Please login.');
      navigate('/login');
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
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Reset Password
            </button>
          </form>

          {message && <p className="text-center mt-6 text-red-400 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
