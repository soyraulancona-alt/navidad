import React from 'react';
import { Snowflake } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 px-4 relative">
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">
            // Magic Studio
        </h2>
        <div className="flex justify-center items-center gap-2">
          <Snowflake className="text-white w-6 h-6" />
          <h1 className="font-christmas text-5xl text-white drop-shadow-md">
            Hoho Studio!
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;