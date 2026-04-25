import { Link } from 'react-router-dom';
import logo from '../assets/clglogo.jpeg';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="NIT Agartala Logo"
          className="w-10 h-10 object-contain rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            PlacementPro
          </h1>
          <p className="text-xs text-white -mt-1">NIT Agartala</p>
        </div>
      </div>

      <div className="space-x-8 hidden md:flex text-white font-bold items-center">
        <a href="/" className="hover:text-indigo-400 transition">
          Home
        </a>

        <a href="/#about" className="hover:text-indigo-400 transition">
          About NIT Agartala
        </a>

        {/* PLACEMENTS DROPDOWN */}
        <div className="relative group">
          <button className="hover:text-indigo-400 transition flex items-center gap-1">
            Placements
            <span className="text-sm">▾</span>
          </button>

          <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-slate-900 border border-white/10 rounded-xl shadow-xl backdrop-blur-xl py-2 w-52">
            <a href="/#stats" className="block px-4 py-2 hover:bg-indigo-500/20 transition">
              Statistics
            </a>

            <a href="/#recruiters" className="block px-4 py-2 hover:bg-indigo-500/20 transition">
              Recruiters
            </a>

            <a href="/#procedure" className="block px-4 py-2 hover:bg-indigo-500/20 transition">
              Placement Procedure
            </a>
          </div>
        </div>

        <a href="/#demographics" className="hover:text-indigo-400 transition">
          Demographics
        </a>

        <a href="/#reach" className="hover:text-indigo-400 transition">
          Reach NIT Agartala
        </a>
      </div>

      <div className="space-x-4">
        <Link to="/login" className="text-white font-bold hover:text-indigo-400">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
