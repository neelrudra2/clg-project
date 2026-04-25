import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getDashboardStats } from '../services/analyticsService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

function TnpDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats)
    return (
      <DashboardLayout role="tnp">
        <div className="p-8">Loading analytics...</div>
      </DashboardLayout>
    );

  // -------- DATA --------

  const companiesTrend = [
    { year: '2023', companies: 120 },
    { year: '2024', companies: 150 },
    { year: '2025', companies: 170 },
  ];

  const branchPlacement = [
    { branch: 'CSE', placed: 150 },
    { branch: 'ECE', placed: 85 },
    { branch: 'EE', placed: 70 },
    { branch: 'EIE', placed: 65 },
    { branch: 'ME', placed: 90 },
    { branch: 'CE', placed: 95 },
    { branch: 'CME', placed: 40 },
  ];

  const monthlyTrend = [
    { month: 'Jul', placed: 20 },
    { month: 'Aug', placed: 35 },
    { month: 'Sep', placed: 50 },
    { month: 'Oct', placed: 70 },
    { month: 'Nov', placed: 90 },
    { month: 'Dec', placed: 80 },
    { month: 'Jan', placed: 75 },
    { month: 'Feb', placed: 85 },
    { month: 'Mar', placed: 95 },
    { month: 'Apr', placed: 100 },
    { month: 'May', placed: 108 },
    { month: 'Jun', placed: 120 },
  ];

  const placementPie = [
    { name: 'Selected', value: stats.totalSelected },
    {
      name: 'Others',
      value: stats.totalApplications - stats.totalSelected,
    },
  ];

  const colors = ['#6366F1', '#E5E7EB'];

  return (
    <DashboardLayout role="tnp">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            Placement Analytics
          </h1>
          <p className="text-slate-400 mt-2">Comprehensive insights into recruitment performance</p>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            gradient="from-indigo-500 via-indigo-600 to-blue-600"
          />

          <StatCard
            title="Companies"
            value={stats.totalCompanies}
            gradient="from-violet-500 via-violet-600 to-indigo-600"
          />

          <StatCard
            title="Applications"
            value={stats.totalApplications}
            gradient="from-cyan-500 via-blue-600 to-indigo-600"
          />

          <StatCard
            title="Selected"
            value={stats.totalSelected}
            gradient="from-emerald-500 via-emerald-600 to-green-600"
          />
        </div>

        {/* ===== CHART GRID ===== */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Companies Trend */}
          <ModernCard title="Companies Growth Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={companiesTrend}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'white',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="companies"
                  stroke="#6366F1"
                  fill="url(#colorTrend)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ModernCard>

          {/* Branch Placement */}
          <ModernCard title="Branch-wise Placements">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchPlacement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="branch" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'white',
                  }}
                />
                <Bar dataKey="placed" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ModernCard>

          {/* Monthly Trend */}
          <ModernCard title="Monthly Placement Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="placed"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ModernCard>

          {/* Donut Chart */}
          <ModernCard title="Placement Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={placementPie}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                >
                  {placementPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === 'Selected' ? '#10B981' : '#334155'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '12px',
                    border: '1px solid #374151',
                  }}
                  labelStyle={{ color: '#e5e7eb', fontWeight: 600 }}
                  itemStyle={{ color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ModernCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---- Reusable UI Components ---- */

function StatCard({ title, value, gradient }) {
  return (
    <div
      className={`relative p-6 rounded-3xl bg-gradient-to-br ${gradient} 
      text-white shadow-2xl border border-white/10 
      hover:scale-[1.04] hover:shadow-indigo-500/30 
      transition-all duration-300 overflow-hidden`}
    >
      {/* Soft Glow Layer */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <p className="text-m text-white font-bold tracking-wide">{title}</p>

      <h2 className="text-3xl font-bold mt-3 tracking-tight">{value}</h2>
    </div>
  );
}

function ModernCard({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
      <h2 className="text-lg font-semibold text-slate-200 mb-6">{title}</h2>
      {children}
    </div>
  );
}

export default TnpDashboard;
