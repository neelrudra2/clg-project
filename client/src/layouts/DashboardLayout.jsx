import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationService';

function DashboardLayout({ children, role }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();

        const lastSeen = localStorage.getItem('notificationsLastSeen');

        if (!lastSeen) {
          setNotificationCount(data.length);
        } else {
          const unseen = data.filter((n) => new Date(n.createdAt) > new Date(lastSeen));

          setNotificationCount(unseen.length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkStyle = 'block px-4 py-2 rounded-lg transition font-medium';

  const activeStyle = 'bg-violet-50 text-violet-700 border-l-4 border-violet-600';

  return (
    <div className="flex h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-slate-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white p-6 flex flex-col justify-between shadow-2xl">
        {/* Top Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-12 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            PlacementPro
          </h2>

          <nav className="space-y-3">
            {role === 'student' && (
              <>
                <NavLink
                  to="/student"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/student/profile"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/alumni"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Alumni Insights
                </NavLink>

                <NavLink
                  to="/student/notifications"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  <div className="flex justify-between items-center">
                    <span>Notifications</span>

                    {notificationCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </div>
                </NavLink>
              </>
            )}

            {role === 'tnp' && (
              <>
                <NavLink
                  to="/tnp"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/tnp/profile"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/manage-companies"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Manage Companies
                </NavLink>

                <NavLink
                  to="/tnp/applicants"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Applicants List
                </NavLink>

                <NavLink
                  to="/tnp/notifications"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : 'hover:bg-white/10 hover:text-white'}`
                  }
                >
                  Notifications
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOP NAVBAR ===== */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-5 flex justify-between items-center shadow-md">
          <h1 className="text-lg font-semibold text-slate-200">Welcome to PlacementPro</h1>
          <div className="text-sm text-slate-200 font-bold">NIT Agartala Placement Cell</div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-10 flex-1 overflow-x-hidden overflow-y-auto relative">
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-slate-500 opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-600 opacity-10 rounded-full blur-[120px]" />

          <div className="relative z-10">{children}</div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-white/5 border-t border-white/10 text-center py-4 text-sm text-slate-400">
          © 2026 NITA PlacementPro — Built for Centralized Campus Recruitment
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
