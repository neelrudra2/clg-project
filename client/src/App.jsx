import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TnpDashboard from './pages/TnpDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import CompanyDetails from './pages/CompanyDetails';
import Profile from './pages/Profile';
import ManageCompanies from './pages/ManageCompanies';
import CompanyApplicants from './pages/CompanyApplicants';
import AlumniInsights from './pages/AlumniInsights';
import ApplicantsList from './pages/ApplicantsList';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import StudentNotifications from './pages/StudentNotifications';
import TnpNotifications from './pages/TnpNotifications';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:id"
          element={
            <ProtectedRoute role="student">
              <CompanyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute role="student">
              <AlumniInsights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute role="student">
              <StudentNotifications />
            </ProtectedRoute>
          }
        />

        {/* TnP Routes */}
        <Route
          path="/tnp"
          element={
            <ProtectedRoute role="tnp">
              <TnpDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tnp/profile"
          element={
            <ProtectedRoute role="tnp">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-companies"
          element={
            <ProtectedRoute role="tnp">
              <ManageCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tnp/applicants"
          element={
            <ProtectedRoute role="tnp">
              <ApplicantsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-applicants/:id"
          element={
            <ProtectedRoute role="tnp">
              <CompanyApplicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tnp/notifications"
          element={
            <ProtectedRoute role="tnp">
              <TnpNotifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
