function StatsCard({ title, value, icon, color }) {
  try {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200" data-name="stats-card" data-file="components/StatsCard.js">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <div className={`icon-${icon} text-xl`}></div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    );
  } catch (error) {
    console.error('StatsCard component error:', error);
    return null;
  }
}