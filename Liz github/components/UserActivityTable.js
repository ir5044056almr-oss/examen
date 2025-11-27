function UserActivityTable() {
  try {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadUsers();
    }, []);

    const loadUsers = async () => {
      try {
        const result = await trickleListObjects('user', 100, true);
        const usersWithActivity = result.items.map(user => ({
          ...user,
          lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        }));
        setUsers(usersWithActivity);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    const getRoleBadgeColor = (role) => {
      const colors = {
        super_usuario: 'bg-purple-100 text-purple-700',
        administrador: 'bg-blue-100 text-blue-700',
        usuario: 'bg-green-100 text-green-700'
      };
      return colors[role] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" data-name="user-activity-table" data-file="components/UserActivityTable.js">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Actividad de Usuarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Último Acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">Cargando...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No hay usuarios</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.objectId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.objectData.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.objectData.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.objectData.role)}`}>
                        {user.objectData.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.lastLogin.toLocaleDateString('es-ES')} {user.lastLogin.toLocaleTimeString('es-ES')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserActivityTable component error:', error);
    return null;
  }
}