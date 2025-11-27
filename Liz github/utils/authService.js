const USER_OBJECT_TYPE = 'user';

async function initializeUsers() {
  const users = await trickleListObjects(USER_OBJECT_TYPE, 100, true);
  
  if (users.items.length === 0) {
    const defaultUsers = [
      { email: 'juan@example.com', password: 'user123', role: 'usuario', name: 'Juan' },
      { email: 'maria@example.com', password: 'user456', role: 'usuario', name: 'María' },
      { email: 'carlos@example.com', password: 'super123', role: 'super_usuario', name: 'Carlos' },
      { email: 'ana@example.com', password: 'super456', role: 'super_usuario', name: 'Ana' },
      { email: 'roberto@example.com', password: 'admin123', role: 'administrador', name: 'Roberto' },
      { email: 'laura@example.com', password: 'admin456', role: 'administrador', name: 'Laura' }
    ];

    for (const user of defaultUsers) {
      await trickleCreateObject(USER_OBJECT_TYPE, user);
    }
  }
}

async function login(email, password) {
  await initializeUsers();
  
  const users = await trickleListObjects(USER_OBJECT_TYPE, 100, true);
  const user = users.items.find(u => 
    u.objectData.email === email && u.objectData.password === password
  );

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.objectId,
      email: user.objectData.email,
      role: user.objectData.role,
      name: user.objectData.name
    }));
    return user.objectData;
  }
  
  return null;
}

function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}