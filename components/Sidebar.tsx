import React from 'react';
import type { Week } from '../types';

interface SidebarProps {
  weeks: Week[];
  activeWeek: number;
  onSelectWeek: (week: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ weeks, activeWeek, onSelectWeek }) => {
  return (
    <nav className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Plano de Aulas</h2>
      <ul className="space-y-2">
        {weeks.map((week) => (
          <li key={week.week}>
            <button
              onClick={() => onSelectWeek(week.week)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-4 transform ${
                activeWeek === week.week
                  ? 'bg-sky-500 text-white shadow-md hover:shadow-lg hover:-translate-y-px'
                  : 'hover:bg-sky-100 hover:text-sky-800 text-slate-600 hover:translate-x-1'
              }`}
            >
              <span className={`font-bold text-sm ${activeWeek === week.week ? 'text-white' : 'text-sky-500'}`}>Semana {week.week}</span>
              <span className="flex-1 text-sm">{week.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;