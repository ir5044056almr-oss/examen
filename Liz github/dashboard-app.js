class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function DashboardApp() {
  try {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        window.location.href = 'index.html';
      } else {
        setUser(currentUser);
      }
    }, []);

    if (!user) return null;

    return (
      <div className="flex h-screen bg-gray-50" data-name="dashboard-app" data-file="dashboard-app.js">
        <Sidebar user={user} />
        
        <div className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width)]">
          <Topbar user={user} />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div id="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard title="Usuarios Totales" value="156" icon="users" color="blue" />
              <StatsCard title="Proyectos Activos" value="24" icon="briefcase" color="green" />
              <StatsCard title="Tareas Pendientes" value="48" icon="clipboard-list" color="orange" />
              <StatsCard title="Mensajes" value="12" icon="mail" color="purple" />
            </div>

            <div id="charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <LineChart />
              <PieChart />
            </div>

            <div id="users" className="grid grid-cols-1 gap-6">
              <UserActivityTable />
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);