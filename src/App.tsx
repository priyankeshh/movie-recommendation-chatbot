import React from 'react';
import Chat from './components/Chat';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { Popcorn } from 'lucide-react';

function App() {
  const theme = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-cozy bg-cozy-soft-white transition-all duration-500 relative overflow-hidden">
      {/* Soft background texture */}
      <div className="absolute inset-0 bg-soft-texture bg-texture opacity-20 pointer-events-none"></div>

      {/* Living room blur effect */}
      <div className="absolute inset-0 bg-living-room-blur opacity-30 pointer-events-none"></div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-warm-overlay pointer-events-none animate-breathe opacity-30"></div>

      {/* Header with theme toggle */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <Popcorn className="text-cozy-caramel mr-3 animate-soft-bounce" size={28} />
          <h1 className="text-cozy-brown text-3xl font-title font-bold tracking-wide">Movie<span className="text-cozy-coral">Buddy</span></h1>
        </div>
        <ThemeToggle theme={theme} />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden relative z-10 px-6 py-4">
        <div className="h-full max-w-4xl mx-auto">
          <div className="h-full bg-cozy-cream dark:bg-cozy-sand overflow-hidden flex flex-col
                          border border-cozy-tan dark:border-cozy-caramel shadow-cozy-lg
                          transition-all duration-300 rounded-xl animate-fade-in">
            <Chat />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-sm text-cozy-coffee dark:text-cozy-caramel relative z-10">
        

        {/* Decorative popcorn bucket */}
        <div className="absolute bottom-2 right-4 w-16 h-16 opacity-70 pointer-events-none">
          <div className="w-full h-full bg-cozy-red rounded-b-lg relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-3 bg-cozy-cream flex">
              <div className="flex-1 border-r border-cozy-red/20"></div>
              <div className="flex-1 border-r border-cozy-red/20"></div>
              <div className="flex-1"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-cozy-cream rounded-full animate-float-slow"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
