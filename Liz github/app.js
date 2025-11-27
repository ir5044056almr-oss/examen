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
            <p className="text-gray-600 mb-4">Lo sentimos, ocurrió un error inesperado.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      const user = getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        window.location.href = 'dashboard.html';
      }
    }, []);

    const handleLogin = (user) => {
      setIsAuthenticated(true);
      window.location.href = 'dashboard.html';
    };

    return (
      <div className="min-h-screen relative overflow-hidden bg-[var(--bg-dark)]" data-name="app" data-file="app.js">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--primary-color)] rounded-full blur-3xl opacity-20 glow-effect"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 glow-effect" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 glow-effect" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <LoginBox onLogin={handleLogin} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);