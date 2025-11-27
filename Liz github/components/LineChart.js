function LineChart() {
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
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
              label: 'Usuarios Activos',
              data: [30, 45, 38, 52, 48, 65, 70, 68, 75, 80, 85, 90],
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
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
      <div className="bg-white rounded-xl p-6 border border-gray-200" data-name="line-chart" data-file="components/LineChart.js">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tendencia Anual</h3>
        <div style={{ height: '300px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LineChart component error:', error);
    return null;
  }
}