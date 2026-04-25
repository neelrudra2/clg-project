import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

function AlumniInsights() {
  const [search, setSearch] = useState('');

  const testimonials = [
    {
      company: 'Google',
      name: 'Rahul Sharma',
      role: 'SDE',
      batch: '2023',
      review: 'Focus on DSA and system design. Interview was coding heavy.',
    },
    {
      company: 'Amazon',
      name: 'Priya Verma',
      role: 'Business Analyst',
      batch: '2022',
      review: 'Strong aptitude and case solving skills helped me crack it.',
    },
    {
      company: 'Microsoft',
      name: 'Ankit Gupta',
      role: 'Software Engineer',
      batch: '2021',
      review: 'Prepare core CS subjects along with Leetcode practice.',
    },
    {
      company: 'TCS Digital',
      name: 'Sneha Singh',
      role: 'GET',
      batch: '2023',
      review: 'Communication skills matter in managerial rounds.',
    },
    {
      company: 'Infosys',
      name: 'Arjun Mehta',
      role: 'System Engineer',
      batch: '2022',
      review: 'Revise OOPS, DBMS and practice aptitude regularly. HR round was smooth.',
    },
    {
      company: 'Wipro',
      name: 'Neha Kapoor',
      role: 'Project Engineer',
      batch: '2023',
      review: 'Coding round was moderate. Focus on arrays, strings and basic SQL.',
    },
    {
      company: 'Cognizant',
      name: 'Sourav Banerjee',
      role: 'Programmer Analyst',
      batch: '2021',
      review: 'Prepare well for technical + managerial mix questions.',
    },
    {
      company: 'Accenture',
      name: 'Ritika Jain',
      role: 'Application Development Associate',
      batch: '2022',
      review: 'Communication and scenario-based questions were important.',
    },
    {
      company: 'Capgemini',
      name: 'Aditya Singh',
      role: 'Software Engineer',
      batch: '2023',
      review: 'Pseudocode-based coding and aptitude were key rounds.',
    },
    {
      company: 'IBM',
      name: 'Karan Malhotra',
      role: 'Associate System Engineer',
      batch: '2022',
      review: 'Focus on cloud basics and data structures fundamentals.',
    },
    {
      company: 'Oracle',
      name: 'Meghna Iyer',
      role: 'Software Developer',
      batch: '2021',
      review: 'Strong DBMS and Java knowledge helped me a lot.',
    },
    {
      company: 'Adobe',
      name: 'Vivek Nair',
      role: 'MTS',
      batch: '2023',
      review: 'High-level DSA and problem-solving speed are crucial.',
    },
    {
      company: 'Qualcomm',
      name: 'Rohit Chatterjee',
      role: 'Embedded Engineer',
      batch: '2022',
      review: 'C programming, OS concepts and microcontrollers were deeply tested.',
    },
    {
      company: 'Intel',
      name: 'Pooja Reddy',
      role: 'Hardware Design Engineer',
      batch: '2021',
      review: 'Digital electronics and computer architecture are very important.',
    },
    {
      company: 'Texas Instruments',
      name: 'Abhishek Kumar',
      role: 'Analog Engineer',
      batch: '2023',
      review: 'Strong concepts in analog circuits and semiconductor devices are must.',
    },
    {
      company: 'NVIDIA',
      name: 'Ananya Mehra',
      role: 'GPU Software Engineer',
      batch: '2022',
      review: 'Parallel computing and C++ fundamentals were heavily asked.',
    },
    {
      company: 'Samsung R&D',
      name: 'R Bhattacharyya',
      role: 'Research Engineer',
      batch: '2026',
      review: 'System design and problem-solving skills were tested thoroughly.',
    },
    {
      company: 'Bosch',
      name: 'Debashish Gupta',
      role: 'Embedded Systems Engineer',
      batch: '2023',
      review: 'Focus on CAN protocol, RTOS and automotive basics.',
    },
    {
      company: 'Siemens',
      name: 'Tanvi Desai',
      role: 'Graduate Engineer Trainee',
      batch: '2022',
      review: 'Core ECE fundamentals and PLC basics were asked.',
    },
    {
      company: 'L&T Technology Services',
      name: 'Manish Tiwari',
      role: 'GET',
      batch: '2021',
      review: 'Strong fundamentals in core subjects and confidence mattered.',
    },
    {
      company: 'Tata Elxsi',
      name: 'Shruti Sen',
      role: 'Embedded Developer',
      batch: '2023',
      review: 'C, data structures and automotive domain knowledge helped.',
    },
    {
      company: 'Flipkart',
      name: 'Yash Gupta',
      role: 'SDE-1',
      batch: '2022',
      review: 'Focus on medium-level Leetcode and system design basics.',
    },
    {
      company: 'Paytm',
      name: 'Nikhil Arora',
      role: 'Backend Developer',
      batch: '2021',
      review: 'Backend frameworks and database optimization were key topics.',
    },
    {
      company: 'Goldman Sachs',
      name: 'Ishita Mukherjee',
      role: 'Analyst',
      batch: '2023',
      review: 'Strong DSA and logical reasoning were crucial for selection.',
    },
  ];

  const filtered = testimonials.filter((item) =>
    item.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="student">
      <div className="relative">
        {/* ===== Page Title ===== */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
          Alumni Insights
        </h1>

        {/* ===== Search Bar ===== */}
        <div className="relative mb-10 max-w-md">
          <input
            type="text"
            placeholder="Search by company..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ===== Testimonials Grid ===== */}
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Company Badge */}
                <div className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow">
                  {item.company}
                </div>

                {/* Alumni Info */}
                <p className="text-sm text-slate-400 mb-3">
                  {item.name} • {item.role} • Batch {item.batch}
                </p>

                {/* Review */}
                <p className="text-slate-200 leading-relaxed">"{item.review}"</p>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-slate-400">
              No alumni insights found for that company.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AlumniInsights;
