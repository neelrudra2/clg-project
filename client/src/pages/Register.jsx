import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import Navbar from '../components/Navbar';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    role: 'student',
    enrollmentNumber: '',
    branch: '',
    batch: '',
    cgpa: '',
    department: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'role') {
        return {
          ...prev,
          role: value,
          enrollmentNumber: '',
          branch: '',
          batch: '',
          cgpa: '',
          department: '',
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    const data = await registerUser(dataToSend);

    if (data.message === 'User registered successfully') {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN SECTION ================= */}
      <div className="flex flex-1 items-center justify-center relative px-4 py-12">
        {/* ===== Background Glow Layers ===== */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600 opacity-20 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-1/3 w-[350px] h-[350px] bg-purple-500 opacity-10 rounded-full blur-[120px]" />

        {/* ===== Register Card ===== */}
        <div className="relative w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            Create Account
          </h2>

          {/* ===== FORM (LOGIC UNCHANGED) ===== */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ROLE FIRST */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="md:col-span-2 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
            >
              <option value="student" className="bg-slate-900 text-white">
                Student
              </option>
              <option value="tnp" className="bg-slate-900 text-white">
                Placement Coordinator
              </option>
            </select>

            {/* FULL NAME */}
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />

            {/* ENROLLMENT NUMBER */}
            <input
              name="enrollmentNumber"
              placeholder="Enrollment Number"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              required={formData.role === 'student'}
              disabled={formData.role === 'tnp'}
              className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300
      ${
        formData.role === 'tnp'
          ? 'bg-white/5 border-white/10 cursor-not-allowed'
          : 'bg-white/10 border-white/20 focus:ring-indigo-400'
      }`}
            />

            {/* BRANCH */}
            <input
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              required={formData.role === 'student'}
              disabled={formData.role === 'tnp'}
              className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300
      ${
        formData.role === 'tnp'
          ? 'bg-white/5 border-white/10 cursor-not-allowed'
          : 'bg-white/10 border-white/20 focus:ring-indigo-400'
      }`}
            />

            {/* BATCH */}
            <input
              type="number"
              name="batch"
              placeholder="Batch (e.g., 2023)"
              value={formData.batch}
              onChange={handleChange}
              required={formData.role === 'student'}
              disabled={formData.role === 'tnp'}
              className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300
      ${
        formData.role === 'tnp'
          ? 'bg-white/5 border-white/10 cursor-not-allowed'
          : 'bg-white/10 border-white/20 focus:ring-indigo-400'
      }`}
            />

            {/* CGPA */}
            <input
              type="number"
              step="0.01"
              name="cgpa"
              placeholder="CGPA"
              value={formData.cgpa}
              onChange={handleChange}
              required={formData.role === 'student'}
              disabled={formData.role === 'tnp'}
              className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300
      ${
        formData.role === 'tnp'
          ? 'bg-white/5 border-white/10 cursor-not-allowed'
          : 'bg-white/10 border-white/20 focus:ring-indigo-400'
      }`}
            />

            {/* DEPARTMENT */}
            <input
              name="department"
              placeholder="Department (for Training and Placement)"
              value={formData.department}
              onChange={handleChange}
              required={formData.role === 'tnp'}
              disabled={formData.role === 'student'}
              className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300
      ${
        formData.role === 'student'
          ? 'bg-white/5 border-white/10 cursor-not-allowed'
          : 'bg-white/10 border-white/20 focus:ring-violet-400'
      }`}
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
            />

            {/* PHONE */}
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-slate-400 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-400 font-medium hover:text-violet-400 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
