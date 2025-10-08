
import React from 'react';
import WaveIcon from './icons/WaveIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-sky-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:px-6 flex items-center justify-center sm:justify-between">
        <div className="flex items-center gap-3">
          <WaveIcon className="h-8 w-8 sm:h-10 sm:w-10 text-sky-300" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Surf na Matemática
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sky-200">
           <img src="https://picsum.photos/id/23/40/40" alt="Avatar de surfista" className="rounded-full border-2 border-sky-300" />
          <span>Para a campeã de Baía Formosa</span>
        </div>
      </div>
    </header>
  );
};

export default Header;