import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { CalendarPage } from './pages/CalendarPage';
import { SectionPage } from './pages/SectionPage';
import { UniversityPage } from './pages/UniversityPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { seedStudyPlan } from './db/db';
import { seedMoodleProg3 } from './db/seedMoodleProg3';
import { seedMoodleSOyR } from './db/seedMoodleSOyR';

const App = () => {
  useEffect(() => {
    seedStudyPlan().then(() => seedMoodleProg3()).then(() => seedMoodleSOyR());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="work" element={<SectionPage section="Trabajo" />} />
          <Route path="training" element={<SectionPage section="Entrenamiento" />} />
          <Route path="university" element={<UniversityPage />} />
          <Route path="university/:subjectId" element={<SubjectDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

