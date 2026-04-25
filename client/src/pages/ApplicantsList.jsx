import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getCompanies } from '../services/companyService';
import { getCompanyApplicants } from '../services/applicationService';

function ApplicantsList() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const handleSelectCompany = async (company) => {
    setSelectedCompany(company);

    const applicants = await getCompanyApplicants(company._id);
    setApplications(applicants);
  };

  return (
    <DashboardLayout role="tnp">
      <div className="max-w-7xl mx-auto">
        {/* ===== TITLE ===== */}
        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
          Applicants Record
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ================= LEFT: COMPANY LIST ================= */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6">
            <h2 className="font-semibold text-slate-200 mb-6">Companies</h2>

            <div className="space-y-3">
              {companies.map((company) => (
                <div
                  key={company._id}
                  onClick={() => handleSelectCompany(company)}
                  className={`cursor-pointer px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    selectedCompany?._id === company._id
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }
                `}
                >
                  {company.name}
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT: APPLICANTS ================= */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 overflow-x-auto">
            {!selectedCompany ? (
              <div className="text-slate-400 text-center py-16">
                Select a company to view applicants
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-slate-200 mb-6">
                  Applicants for <span className="text-indigo-400">{selectedCompany.name}</span>
                </h2>

                {applications.length === 0 ? (
                  <div className="text-slate-400 py-8">No applicants yet.</div>
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
                          <td className="p-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ApplicantsList;
