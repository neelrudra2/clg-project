import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getNotifications } from '../services/notificationService';

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        console.log('Notifications:', data);
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
    localStorage.setItem('notificationsLastSeen', new Date().toISOString());
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto">
        {/* PAGE TITLE */}

        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            Notifications
          </h1>

          <span className="text-sm text-slate-400">Stay updated with placement announcements</span>
        </div>

        {/* EMPTY STATE */}

        {notifications.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-slate-400">
            No notifications available right now.
          </div>
        )}

        {/* NOTIFICATION LIST */}

        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/40 hover:shadow-indigo-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-indigo-400">{notification.title}</h2>

                  <p className="text-slate-300 mt-3 leading-relaxed">{notification.message}</p>
                </div>

                <div className="text-xs text-slate-400">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="text-xs text-slate-500 mt-4">
                {new Date(notification.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentNotifications;
