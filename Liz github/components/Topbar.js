function Topbar({ user }) {
  try {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="bg-white border-b border-gray-200 px-6 py-4" data-name="topbar" data-file="components/Topbar.js">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="dashboard.html" className="text-[var(--primary-color)] font-semibold hover:underline">Inicio</a>
            <a href="#messages" className="text-gray-600 hover:text-[var(--primary-color)] font-medium">Mensajes</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">{currentTime.toLocaleDateString('es-ES')}</p>
              <p className="text-xs text-gray-500">{currentTime.toLocaleTimeString('es-ES')}</p>
            </div>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <div className="icon-bell text-xl text-gray-700"></div>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] flex items-center justify-center text-white font-bold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Topbar component error:', error);
    return null;
  }
}