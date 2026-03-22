import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import HomePage from './pages/HomePage';
import HomesPage from './pages/HomesPage';
import HomeDetailsPage from './pages/HomeDetailsPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HostHomesPage from './pages/HostHomesPage';
import AddHomePage from './pages/AddHomePage';
import EditHomePage from './pages/EditHomePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Standard routes wrapped with Navbar Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
          <Route path="/verify-otp" element={<PublicRoute><VerifyOtpPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

          <Route path="/homes" element={<ProtectedRoute allowedRole="guest"><HomesPage /></ProtectedRoute>} />
          <Route path="/homes/:id" element={<ProtectedRoute allowedRole="guest"><HomeDetailsPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRole="guest"><WishlistPage /></ProtectedRoute>} />

          <Route path="/host/host-homes" element={<ProtectedRoute allowedRole="host"><HostHomesPage /></ProtectedRoute>} />
          <Route path="/host/add-home" element={<ProtectedRoute allowedRole="host"><AddHomePage /></ProtectedRoute>} />
          <Route path="/host/edit-home/:id" element={<ProtectedRoute allowedRole="host"><EditHomePage /></ProtectedRoute>} />
        </Route>

        {/* Fallback Route without Navbar */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
