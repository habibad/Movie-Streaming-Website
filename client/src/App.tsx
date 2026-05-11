import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Future routes — add pages here as you build them:
            <Route path="/live"        element={<Live />} />
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
