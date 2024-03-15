import React from 'react';
import ApexCharts from 'apexcharts';

interface RadialChartProps {
  completionPercentage: number;
  className?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({ completionPercentage, className }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [completionPercentage],
        colors: ["#448D47"],
        chart: {
          type: "radialBar",
          width: 100,
          height: 100,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "40%",
            },
            dataLabels: {
                name: {
                    show: false,
                  },
                  value: {
                    offsetY: 4,
                    formatter: function (val:any) {
                      return completionPercentage.toFixed(1) + "%";
                    },
                  },
              
            },
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [completionPercentage]);

  return <div ref={chartRef} className={className}></div>;
};

export default RadialChart;
