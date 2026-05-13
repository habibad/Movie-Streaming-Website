import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Live from './pages/Live';
import Movies from './pages/Movies';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/live"        element={<Live />} />
         <Route path="/movies"      element={<Movies />} />
        {/* Future routes — add pages here as you build them:
            <Route path="/movies"      element={<Movies />} />
            <Route path="/movies/:id"  element={<MovieDetail />} />
            <Route path="/shows"       element={<Shows />} />
            <Route path="/interviews"  element={<Interviews />} />
            <Route path="/actors"      element={<Actors />} />
            <Route path="/actors/:id"  element={<ActorDetail />} />
        */}
      </Route>
    </Routes>
  );
}
