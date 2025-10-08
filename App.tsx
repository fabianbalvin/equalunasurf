
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LessonContent from './components/LessonContent';
import { LESSON_PLAN } from './constants';
import type { Lesson } from './types';

const App: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeDay, setActiveDay] = useState(1);

  const currentWeekData = LESSON_PLAN.find(w => w.week === activeWeek);
  const currentLessonData = currentWeekData?.lessons.find(l => l.day === activeDay);

  const handleSelectWeek = (week: number) => {
    setActiveWeek(week);
    setActiveDay(1); // Reset to day 1 when changing week
  };

  const handleSelectDay = (day: number) => {
    setActiveDay(day);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      <Header />
      <div className="flex flex-col md:flex-row container mx-auto p-4 md:p-8 gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <Sidebar
            weeks={LESSON_PLAN}
            activeWeek={activeWeek}
            onSelectWeek={handleSelectWeek}
          />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {currentWeekData && currentLessonData && (
            <LessonContent
              weekTitle={currentWeekData.title}
              lessons={currentWeekData.lessons}
              activeDay={activeDay}
              onSelectDay={handleSelectDay}
              lesson={currentLessonData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
