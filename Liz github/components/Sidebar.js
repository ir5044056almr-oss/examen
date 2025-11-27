function Sidebar({ user }) {
  try {
    const [expandedMenu, setExpandedMenu] = React.useState('dashboard');

    const toggleMenu = (menu) => {
      setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    return (
      <div className="fixed left-0 top-0 h-full w-[var(--sidebar-width)] bg-white border-r border-gray-200 flex flex-col overflow-y-auto" data-name="sidebar" data-file="components/Sidebar.js">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] text-white text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center">
              ALMR
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Sistema</h2>
              <p className="text-xs text-gray-500">Gestión</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div>
            <button onClick={() => toggleMenu('dashboard')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[var(--primary-color)] text-white">
              <div className="flex items-center gap-3">
                <div className="icon-home text-lg"></div>
                <span className="font-medium">Dashboard</span>
              </div>
              <div className={`icon-chevron-down text-sm transition-transform ${expandedMenu === 'dashboard' ? 'rotate-180' : ''}`}></div>
            </button>
            {expandedMenu === 'dashboard' && (
              <div className="ml-4 mt-2 space-y-1">
                <a href="#stats" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Estadísticas</a>
                <a href="#charts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Gráficos</a>
                <a href="#users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Usuarios</a>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleMenu('messages')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="icon-mail text-lg"></div>
                <span className="font-medium">Mensajes</span>
              </div>
              <div className={`icon-chevron-down text-sm transition-transform ${expandedMenu === 'messages' ? 'rotate-180' : ''}`}></div>
            </button>
            {expandedMenu === 'messages' && (
              <div className="ml-4 mt-2 space-y-1">
                <a href="#inbox" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Bandeja</a>
                <a href="#sent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Enviados</a>
              </div>
            )}
          </div>

          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <div className="icon-settings text-lg"></div>
            <span className="font-medium">Configuración</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--secondary-color)] flex items-center justify-center">
              <div className="icon-user text-lg text-[var(--primary-color)]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
            <div className="icon-log-out text-base"></div>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}