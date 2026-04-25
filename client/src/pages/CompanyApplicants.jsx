import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

function CompanyApplicants() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:5000/api/applications/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const handleStatusChange = async (appId, newStatus) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:5000/api/applications/update/${appId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchApplicants(); // refresh table
  };

  return (
    <DashboardLayout role="tnp">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ===== PAGE TITLE ===== */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
          Applicants
        </h1>

        {/* ===== TABLE CARD ===== */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 overflow-x-auto">
          {applications.length === 0 ? (
            <div className="text-center text-slate-400 py-16">No applicants yet.</div>
          ) : (
            <table className="w-full text-slate-200">
              <thead>
                <tr className="bg-white/10 text-slate-300">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Enrollment</th>
                  <th className="p-3 text-left">Branch</th>
                  <th className="p-3 text-left">CGPA</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <td className="p-3">{app.student.name}</td>
                    <td className="p-3">{app.student.enrollmentNumber}</td>
                    <td className="p-3">{app.student.branch}</td>
                    <td className="p-3">{app.student.cgpa}</td>

                    {/* STATUS DROPDOWN */}
                    <td className="p-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                      >
                        <option value="Applied" className="bg-slate-800 text-white">
                          Applied
                        </option>
                        <option value="Shortlisted" className="bg-slate-800 text-white">
                          Shortlisted
                        </option>
                        <option value="Rejected" className="bg-slate-800 text-white">
                          Rejected
                        </option>
                        <option value="Selected" className="bg-slate-800 text-white">
                          Selected
                        </option>
                      </select>
                    </td>
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

export default CompanyApplicants;
