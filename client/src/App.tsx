import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/auth/AuthLayout';

import Home         from '@/pages/Home';
import AboutUs      from '@/pages/AboutUs';
import Live         from '@/pages/Live';
import Movies       from '@/pages/Movies';
import MovieDetails from '@/pages/MovieDetails';
import Interviews   from '@/pages/Interviews';
import Actors       from '@/pages/Actors';
import ActorDetail  from '@/pages/ActorDetail';

import SignIn          from '@/pages/auth/SignIn';
import SignUp          from '@/pages/auth/SignUp';
import ForgotPassword  from '@/pages/auth/ForgotPassword';
import VerifyCode      from '@/pages/auth/VerifyCode';
import ResetPassword   from '@/pages/auth/ResetPassword';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        {/* Main app — Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<AboutUs />} />
          <Route path="/live"       element={<Live />} />
          <Route path="/movies"     element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/actors"     element={<Actors />} />
          <Route path="/actors/:id" element={<ActorDetail />} />
        </Route>

        {/* Auth pages — centered layout, no Navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/signin"         element={<SignIn />} />
          <Route path="/signup"         element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code"    element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}