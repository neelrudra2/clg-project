import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getCompanies, createCompany } from '../services/companyService';
import { useNavigate } from 'react-router-dom';

function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    roleOffered: '',
    ctc: '',
    location: '',
    hiringModel: '',
    jobType: '',
    mode: '',
    minCGPA: '',
    activeFrom: '',
    activeTill: '',
  });

  const fetchCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createCompany(formData);

    if (data._id) {
      alert('Company added successfully!');
      setShowForm(false);
      setFormData({
        name: '',
        roleOffered: '',
        ctc: '',
        location: '',
        hiringModel: '',
        jobType: '',
        mode: '',
        minCGPA: '',
        activeFrom: '',
        activeTill: '',
      });
      fetchCompanies();
    } else {
      alert(data.message);
    }
  };

  return (
    <DashboardLayout role="tnp">
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            Manage Companies
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {showForm ? 'Close' : 'Add Company'}
          </button>
        </div>

        {/* ===== ADD COMPANY FORM ===== */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl mb-10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                className="input-style"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="roleOffered"
                placeholder="Role Offered"
                className="input-style"
                value={formData.roleOffered}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="ctc"
                placeholder="CTC"
                className="input-style"
                value={formData.ctc}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input-style"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="hiringModel"
                placeholder="Hiring Model (2M / 6M / 12M)"
                className="input-style"
                value={formData.hiringModel}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="jobType"
                placeholder="Job Type (Full-Time / Intern / Intern + PPO)"
                className="input-style"
                value={formData.jobType}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="mode"
                placeholder="Mode (Onsite / Hybrid / Remote)"
                className="input-style"
                value={formData.mode}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="minCGPA"
                placeholder="Minimum CGPA"
                className="input-style"
                value={formData.minCGPA}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="activeFrom"
                className="input-style"
                value={formData.activeFrom}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="activeTill"
                className="input-style"
                value={formData.activeTill}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Save Company
            </button>
          </form>
        )}

        {/* ===== COMPANY TABLE ===== */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 overflow-x-auto">
          {companies.length === 0 ? (
            <p className="text-slate-400">No companies found.</p>
          ) : (
            <table className="w-full text-slate-200">
              <thead>
                <tr className="bg-white/10 text-slate-300">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">CTC</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Job Type</th>
                  <th className="p-3 text-left">Mode</th>
                  <th className="p-3 text-left">Min. CGPA</th>
                </tr>
              </thead>

              <tbody>
                {companies.map((company) => (
                  <tr
                    key={company._id}
                    className="cursor-pointer border-t border-white/10 hover:bg-white/10 transition-all duration-200"
                    onClick={() => navigate(`/company-applicants/${company._id}`)}
                  >
                    <td className="p-3">{company.name}</td>
                    <td className="p-3">{company.roleOffered}</td>
                    <td className="p-3">{company.ctc}</td>
                    <td className="p-3">{company.location}</td>
                    <td className="p-3">{company.jobType}</td>
                    <td className="p-3">{company.mode}</td>
                    <td className="p-3">{company.minCGPA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageCompanies;
