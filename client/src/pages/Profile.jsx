import { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { updateProfile, getMyProfile } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cgpa: '',
    branch: '',
    department: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();

        // Update context
        setUser(data);

        // Update localStorage
        localStorage.setItem('user', JSON.stringify(data));

        // Fill form
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          cgpa: data.cgpa || '',
          branch: data.branch || '',
          department: data.department || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const data = await updateProfile(formData);

    if (data.message === 'Profile updated successfully') {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      alert('Something went wrong.');
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-8">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={user.role}>
      <div className="max-w-4xl mx-auto">
        {/* ===== Page Title ===== */}
        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
          My Profile
        </h1>

        {/* ===== Profile Card ===== */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          {!isEditing ? (
            <>
              {/* ================= VIEW MODE ================= */}
              <div className="grid md:grid-cols-2 gap-6 text-slate-200">
                <div>
                  <p className="text-slate-400 text-sm">Name</p>
                  <p className="text-lg font-medium">{user.name}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-lg font-medium">{user.phone}</p>
                </div>

                {user.role === 'student' && (
                  <>
                    <div>
                      <p className="text-slate-400 text-sm">Branch</p>
                      <p className="text-lg font-medium">{user.branch}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">Enrollment Number</p>
                      <p className="text-lg font-medium">{user.enrollmentNumber}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">CGPA</p>
                      <p className="text-lg font-medium">{user.cgpa}</p>
                    </div>
                  </>
                )}

                {user.role === 'tnp' && (
                  <div>
                    <p className="text-slate-400 text-sm">Department</p>
                    <p className="text-lg font-medium">{user.department}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* ================= EDIT MODE ================= */}
              <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
                />

                {user.role === 'student' && (
                  <>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="Branch"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                    />

                    <input
                      type="number"
                      step="0.01"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      placeholder="CGPA"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
                    />
                  </>
                )}

                {user.role === 'tnp' && (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                  />
                )}

                {/* Buttons Full Width */}
                <div className="md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
