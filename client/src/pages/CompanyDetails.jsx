import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { getCompanyById } from '../services/companyService';
import { applyToCompany, getMyApplications } from '../services/applicationService';

function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const companyData = await getCompanyById(id);
      setCompany(companyData);

      const applications = await getMyApplications();
      const alreadyApplied = applications.some((app) => app.company._id === id);

      setApplied(alreadyApplied);
    };

    fetchData();
  }, [id]);

  const handleApply = async () => {
    const data = await applyToCompany(id);

    if (data.message === 'Applied successfully') {
      alert('Applied successfully!');
      setApplied(true);
    } else {
      alert(data.message);
    }
  };

  if (!company) {
    return (
      <DashboardLayout role="student">
        <div className="flex items-center justify-center h-64 text-slate-400">
          Loading company details...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="max-w-4xl mx-auto">
        {/* ===== COMPANY CARD ===== */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            {company.name}
          </h1>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 text-slate-200">
            <div>
              <p className="text-slate-400 text-sm">Role Offered</p>
              <p className="text-lg font-medium">{company.roleOffered}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">CTC</p>
              <p className="text-lg font-medium">{company.ctc}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Location</p>
              <p className="text-lg font-medium">{company.location}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Minimum CGPA</p>
              <p className="text-lg font-medium">{company.minCGPA}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Job Type</p>
              <p className="text-lg font-medium">{company.jobType}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Application Deadline</p>
              <span className="text-lg font-medium">
                {new Date(company.activeTill).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-10">
            {applied ? (
              <button
                disabled
                className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-slate-400 cursor-not-allowed"
              >
                Already Applied
              </button>
            ) : (
              <button
                onClick={handleApply}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanyDetails;
