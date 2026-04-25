import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getCompanies } from '../services/companyService';
import { getMyApplications, applyToCompany } from '../services/applicationService';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const companiesData = await getCompanies();
    const applicationsData = await getMyApplications();

    setCompanies(companiesData);
    setApplications(applicationsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApply = async (e, companyId) => {
    e.stopPropagation();

    const data = await applyToCompany(companyId);

    if (data.message === 'Applied successfully') {
      alert('Applied successfully!');
      fetchData();
    } else {
      alert(data.message);
    }
  };

  const getStatus = (companyId) => {
    const app = applications.find((a) => a.company._id === companyId);
    return app ? app.status : null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'text-blue-600';
      case 'Shortlisted':
        return 'text-yellow-600';
      case 'Rejected':
        return 'text-red-600';
      case 'Selected':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="max-w-7xl mx-auto">
        {/* ===== PAGE TITLE ===== */}
        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
          Available Companies
        </h1>
        <h2 className="text-1xl font-bold mb-10">(Click on company card for more details)</h2>

        {/* ===== COMPANY GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {companies.map((company) => {
            const status = getStatus(company._id);

            return (
              <div
                key={company._id}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 hover:scale-[1.02] hover:shadow-indigo-500/20 transition-all duration-300"
              >
                {/* Clickable Company Section */}
                <div className="cursor-pointer" onClick={() => navigate(`/company/${company._id}`)}>
                  <h2 className="text-xl font-bold mb-4 text-indigo-400">{company.name}</h2>

                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <span className="text-slate-400">Role:</span> {company.roleOffered}
                    </p>
                    <p>
                      <span className="text-slate-400">CTC:</span> {company.ctc}
                    </p>
                    <p>
                      <span className="text-slate-400">Location:</span> {company.location}
                    </p>
                  </div>
                </div>

                {/* ===== STATUS BADGE ===== */}
                <div className="mt-6">
                  {status ? (
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                        status === 'Applied'
                          ? 'bg-blue-500/20 text-blue-300'
                          : status === 'Shortlisted'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : status === 'Rejected'
                              ? 'bg-red-500/20 text-red-300'
                              : status === 'Selected'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {status}
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-1 rounded-full text-xs bg-white/10 text-slate-400">
                      Not Applied
                    </span>
                  )}
                </div>

                {/* ===== APPLY BUTTON ===== */}
                {!status && (
                  <button
                    onClick={(e) => handleApply(e, company._id)}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
