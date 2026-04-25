import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  getNotifications,
  createNotification,
  deleteNotification,
} from '../services/notificationService';

function TnpNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      console.log('Notifications:', data);
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNotification({ title, message });

    setTitle('');
    setMessage('');

    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  return (
    <DashboardLayout role="tnp">
      <div className="max-w-6xl mx-auto">
        {/* PAGE TITLE */}

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            Manage Notifications
          </h1>

          <span className="text-sm text-slate-400">Send placement announcements to students</span>
        </div>

        {/* CREATE FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12 shadow-xl"
        >
          <h2 className="text-lg font-semibold text-indigo-400 mb-6">Create Notification</h2>

          <input
            type="text"
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:border-indigo-500 transition"
            required
          />

          <textarea
            placeholder="Notification Details"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:border-indigo-500 transition"
            required
          />

          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Post Notification
          </button>
        </form>

        {/* EMPTY STATE */}

        {notifications.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-slate-400">
            No notifications created yet.
          </div>
        )}

        {/* NOTIFICATION LIST */}

        <div className="space-y-6">
          {notifications.map((n) => (
            <div
              key={n._id}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-red-400/40 hover:shadow-red-500/20"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-400">{n.title}</h2>

                  <p className="text-slate-300 mt-2">{n.message}</p>
                </div>

                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-4 py-2 rounded-lg text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TnpNotifications;
