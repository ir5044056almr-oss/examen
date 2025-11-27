function LoginBox({ onLogin }) {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        const user = await login(email, password);
        if (user) {
          onLogin(user);
        } else {
          setError('Correo o contraseña incorrectos');
        }
      } catch (err) {
        setError('Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="w-full max-w-md" data-name="login-box" data-file="components/LoginBox.js">
        <div className="glass-effect rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] text-white text-2xl font-bold w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg">
              ALMR
            </div>
            <h1 className="text-2xl font-bold text-white">Bienvenidos</h1>
            <p className="text-gray-300 mt-2">Inicia sesión para continuar</p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-400 text-white px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginBox component error:', error);
    return null;
  }
}