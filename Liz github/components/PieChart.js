function PieChart() {
  try {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Super Usuarios', 'Administradores', 'Usuarios'],
            datasets: [{
              data: [2, 2, 152],
              backgroundColor: ['#6366f1', '#ec4899', '#8b5cf6'],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, []);

    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200" data-name="pie-chart" data-file="components/PieChart.js">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Usuarios</h3>
        <div style={{ height: '300px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PieChart component error:', error);
    return null;
  }
}