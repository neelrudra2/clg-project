import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import googleLogo from '../assets/logos/google.svg';
import amazonLogo from '../assets/logos/amazon.svg';
import microsoftLogo from '../assets/logos/microsoft.svg';
import tcsLogo from '../assets/logos/tcs.svg';
import infosysLogo from '../assets/logos/infosys.svg';

import wiproLogo from '../assets/logos/wipro.svg';
import dellLogo from '../assets/logos/dell.svg';
import accentureLogo from '../assets/logos/accenture.svg';
import intelLogo from '../assets/logos/intel.svg';
import qualcommLogo from '../assets/logos/qualcomm.svg';

import flipkartLogo from '../assets/logos/flipkart.svg';
import zomatoLogo from '../assets/logos/zomato.svg';
import visaLogo from '../assets/logos/visa.svg';
import paypalLogo from '../assets/logos/paypal.svg';

function RecruiterCard({ logo, alt, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[220px] h-[120px]
      flex items-center justify-center
      bg-white backdrop-blur-xl
      border border-white/10
      rounded-2xl
      shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-indigo-500/20"
    >
      <img
        src={logo}
        alt={alt}
        className="max-h-12 object-contain opacity-80 hover:opacity-100 transition duration-300"
      />
    </a>
  );
}

function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const row1 = [
    { logo: googleLogo, alt: 'Google', link: 'https://www.google.co.in' },
    { logo: amazonLogo, alt: 'Amazon', link: 'https://www.amazon.in' },
    { logo: microsoftLogo, alt: 'Microsoft', link: 'https://www.microsoft.com/en-in' },
    { logo: tcsLogo, alt: 'TCS', link: 'https://www.tcs.com' },
    { logo: infosysLogo, alt: 'Infosys', link: 'https://www.infosys.com' },
  ];

  const row2 = [
    { logo: wiproLogo, alt: 'Wipro', link: 'https://www.wipro.com' },
    { logo: zomatoLogo, alt: 'Zomato', link: 'https://www.zomato.com' },
    { logo: accentureLogo, alt: 'Accenture', link: 'https://www.accenture.com/in-en' },
    { logo: flipkartLogo, alt: 'Flipkart', link: 'https://www.flipkart.com' },
    { logo: visaLogo, alt: 'VISA', link: 'https://www.visa.co.in' },
  ];

  const row3 = [
    { logo: intelLogo, alt: 'Intel', link: 'https://www.intel.in' },
    { logo: dellLogo, alt: 'Dell', link: 'https://www.dell.com/en-in' },
    { logo: qualcommLogo, alt: 'Qualcomm', link: 'https://www.qualcomm.com' },
    { logo: paypalLogo, alt: 'PayPal', link: 'https://www.paypal.com/in' },
    { logo: infosysLogo, alt: 'Infosys', link: 'https://www.infosys.com' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex items-center justify-between px-10 py-32 bg-gradient-to-br from-amber-600 via-violet-700 to-indigo-800 text-white overflow-hidden">
        {/* Glow Layers */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-400 opacity-20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-400 opacity-20 rounded-full blur-[120px]"></div>

        {/* LEFT CONTENT */}
        <div className="max-w-3xl z-10 text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
            Empowering Campus Placements
          </h2>

          <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed">
            A centralized digital ecosystem connecting students, recruiters, and placement
            coordinators at NIT Agartala.
          </p>

          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Join Platform
            </Link>

            <a
              href="#stats"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition"
            >
              View Statistics
            </a>
          </div>
        </div>

        {/* RIGHT LOGO */}
        <div className="hidden md:flex items-center justify-center z-10">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <img
              src="../assets/newclglogo.png"
              alt="NIT Agartala"
              className="w-44 hover:scale-110 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ================================ */}
      <section
        id="about"
        className="px-12 py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-white">About NIT Agartala</h3>

        <p className="max-w-5xl mx-auto text-lg text-white leading-relaxed text-center">
          National Institute of Technology Agartala (NITA) is one of India's premier engineering
          institutions and is recognized as an Institute of National Importance. Established in 1965
          and upgraded to NIT status in 2006, the institute offers undergraduate, postgraduate, and
          doctoral programs across engineering, sciences, and management disciplines.
          <br />
          <br />
          The institute has built a strong reputation for academic excellence, innovation, and
          industry collaboration. With state-of-the-art laboratories, research centers, and a
          vibrant student community, NIT Agartala prepares students to become global technology
          leaders.
        </p>
      </section>

      {/* ================= RECRUITERS ================= */}
      <section
        id="recruiters"
        className="px-12 py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950"
      >
        <h3 className="text-4xl font-bold text-center mb-16 text-white">Top Recruiters</h3>

        <div className="space-y-12">
          {/* ROW 1 */}
          <div className="marquee-wrapper overflow-hidden relative">
            <div className="marquee-row flex items-center gap-12">
              {[...row1, ...row1].map((company, index) => (
                <RecruiterCard
                  key={index}
                  logo={company.logo}
                  alt={company.alt}
                  link={company.link}
                />
              ))}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="marquee-wrapper">
            <div className="marquee-row">
              {[...row2, ...row2].map((company, index) => (
                <RecruiterCard
                  key={index}
                  logo={company.logo}
                  alt={company.alt}
                  link={company.link}
                />
              ))}
            </div>
          </div>

          {/* ROW 3 */}
          <div className="marquee-wrapper">
            <div className="marquee-row">
              {[...row3, ...row3].map((company, index) => (
                <RecruiterCard
                  key={index}
                  logo={company.logo}
                  alt={company.alt}
                  link={company.link}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================== PLACEMENT PROCEDURE ============================= */}
      <section
        id="procedure"
        className="px-12 py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-hidden"
      >
        {/* glow background */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-violet-500 opacity-20 blur-[140px] rounded-full"></div>

        <h3 className="text-4xl font-bold text-center mb-20 text-white">Placement Procedure</h3>

        <div className="grid md:grid-cols-4 gap-12 text-center">
          {[
            {
              step: '1',
              title: 'Company Registration',
              desc: 'Companies register and share job profiles, eligibility, and recruitment details.',
              color: 'from-indigo-500 to-violet-500',
            },
            {
              step: '2',
              title: 'Student Application',
              desc: 'Eligible students apply through the centralized placement portal.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              step: '3',
              title: 'Selection Process',
              desc: 'Companies conduct tests, interviews, and technical rounds.',
              color: 'from-amber-500 to-orange-500',
            },
            {
              step: '4',
              title: 'Final Offers',
              desc: 'Selected candidates receive offer letters through the placement cell.',
              color: 'from-pink-500 to-rose-500',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-slate-800 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full text-2xl font-bold bg-gradient-to-r ${item.color}`}
              >
                {item.step}
              </div>

              <h4 className="text-lg font-semibold mb-3">{item.title}</h4>

              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLACEMENT ANALYTICS ================= */}
      <section
        id="stats"
        className="px-12 py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950"
      >
        <h3 className="text-4xl font-bold text-center mb-20 text-white">
          Placement Performance Insights
        </h3>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Placement Growth Trend */}
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold text-indigo-600 mb-6">
              Placement Growth Trend (2020-2025)
            </h4>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { year: '2019', placed: 300 },
                  { year: '2020', placed: 320 },
                  { year: '2021', placed: 380 },
                  { year: '2022', placed: 360 },
                  { year: '2023', placed: 480 },
                  { year: '2024', placed: 520 },
                  { year: '2025', placed: 610 },
                ]}
              >
                <defs>
                  <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="placed"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorPlaced)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Distribution Donut */}
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold text-indigo-600 mb-6">
              Sector-wise Offers Distribution
            </h4>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'IT & Software', value: 55 },
                    { name: 'Core Engineering', value: 20 },
                    { name: 'Consulting', value: 15 },
                    { name: 'Finance', value: 10 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {['#6366F1', '#10B981', '#F59E0B', '#EF4444'].map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Average Package Growth */}
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold text-indigo-600 mb-6">
              Average Package Trend (LPA)
            </h4>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { year: '2019', avg: 5.8 },
                  { year: '2020', avg: 6 },
                  { year: '2021', avg: 8 },
                  { year: '2022', avg: 7 },
                  { year: '2023', avg: 9 },
                  { year: '2024', avg: 9.6 },
                  { year: '2025', avg: 10.5 },
                ]}
              >
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Placement Rate Comparison */}
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold text-indigo-600 mb-6">
              Placement Rate Comparison
            </h4>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={[
                  { year: '2019', rate: 70 },
                  { year: '2020', rate: 75 },
                  { year: '2021', rate: 82 },
                  { year: '2022', rate: 78 },
                  { year: '2023', rate: 88 },
                  { year: '2024', rate: 90 },
                  { year: '2025', rate: 92 },
                ]}
              >
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ======================== STUDENT DEMOGRAPHICS ========================= */}
      <section
        id="demographics"
        className="relative px-12 py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 overflow-hidden"
      >
        {/* subtle glow */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-500 opacity-10 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-violet-500 opacity-10 blur-[140px] rounded-full"></div>

        <h3 className="text-4xl font-bold text-center mb-16 text-white">Student Demographics</h3>

        <div className="grid md:grid-cols-4 gap-12 text-center">
          {[
            {
              title: 'Total Students',
              value: '4500+',
            },
            {
              title: 'Male Students',
              value: '3000+',
            },
            {
              title: 'Female Students',
              value: '1500+',
            },
            {
              title: 'Engineering Branches',
              value: '10+',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-slate-800 hover:shadow-xl transition duration-300"
            >
              <h4 className="text-5xl font-bold text-indigo-500 mb-4">{item.value}</h4>

              <p className="text-slate-600 font-bold tracking-wide">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY VISIT NIT AGARTALA ================= */}
      <section
        id="why-nita"
        className="px-12 py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950"
      >
        <h3 className="text-4xl font-bold text-center mb-16 text-white">
          Why Recruit from NIT Agartala
        </h3>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: '🎓',
              title: 'Highly Skilled Talent',
              desc: 'Students trained in cutting-edge engineering, data science, electronics, and software technologies.',
              color: 'from-indigo-500 to-violet-500',
            },
            {
              icon: '🚀',
              title: 'Strong Placement Culture',
              desc: 'A dedicated Training & Placement Cell ensures smooth recruitment processes and high placement success.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: '🌏',
              title: 'Diverse Talent Pool',
              desc: 'Students from across India bring diverse perspectives, strong fundamentals, and innovation-driven mindset.',
              color: 'from-amber-500 to-orange-500',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl bg-white backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-2xl`}
              >
                {item.icon}
              </div>

              <h4 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h4>

              <p className="text-slate-700 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================== REACH ===================== */}
      <section
        id="reach"
        className="relative px-12 py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-violet-500 opacity-20 rounded-full blur-[140px]"></div>

        <h3 className="text-4xl font-bold text-center mb-6">Reach NIT Agartala</h3>

        <p className="max-w-3xl mx-auto text-center mb-16 text-lg text-indigo-100">
          NIT Agartala is located in Jirania, approximately 20 km from Agartala city. The campus is
          well connected by air, rail, and road for convenient travel.
        </p>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-stretch">
          {/* LEFT SIDE — TRANSPORT CARDS */}
          <div className="space-y-6">
            {/* AIR */}
            <div className="flex items-start gap-5 bg-white border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20 text-2xl">
                ✈️
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">By Air</h4>
                <p className="text-slate-600 text-sm">
                  Maharaja Bir Bikram Airport, Agartala <br />
                  Approx. 20 km from campus
                </p>
              </div>
            </div>

            {/* RAIL */}
            <div className="flex items-start gap-5 bg-white border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-500/20 text-2xl">
                🚆
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">By Rail</h4>
                <p className="text-slate-600 text-sm">
                  Agartala Railway Station <br />
                  Approx. 15 km from campus
                </p>
              </div>
            </div>

            {/* ROAD */}
            <div className="flex items-start gap-5 bg-white border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                🚗
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">By Road</h4>
                <p className="text-slate-600 text-sm">
                  Connected via NH-8 from Guwahati, Silchar, and other major cities
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — GOOGLE MAP */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-full">
            <iframe
              title="NIT Agartala Map"
              src="https://www.google.com/maps?q=NIT+Agartala&output=embed"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="px-12 py-24 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center">
        <h3 className="text-4xl font-bold mb-6">Ready to Begin Your Placement Journey?</h3>
        <p className="mb-8 text-lg opacity-90">
          Join the official placement management platform of NIT Agartala.
        </p>

        <Link
          to="/register"
          className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Create Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t text-center py-6 text-gray-500">
        © 2026 PlacementPro
      </footer>
    </div>
  );
}

export default Landing;
