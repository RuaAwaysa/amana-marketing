interface AgeGroupMetrics {
  ageGroup: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

interface BarGraphByAgeProps {
  data: AgeGroupMetrics[];
  title: string;
  metric: 'spend' | 'revenue';
  className?: string;
}

export function BarGraphByAge({ data, title, metric, className = "" }: BarGraphByAgeProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-gray-400">
          No age group data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item[metric]));
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const formatValue = (value: number) => {
    return metric === 'spend' || metric === 'revenue' 
      ? `$${value.toLocaleString()}` 
      : value.toLocaleString();
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="relative h-80">
        <div className="flex items-end justify-between h-full gap-3">
          {data.map((item, index) => {
            const barHeight = maxValue > 0 ? (item[metric] / maxValue) * 260 : 0;
            const color = colors[index % colors.length];
            
            return (
              <div key={item.ageGroup} className="flex flex-col items-center flex-1 min-w-0">
                {/* Value label on top */}
                <div className="text-xs text-gray-300 mb-2 text-center">
                  {formatValue(item[metric])}
                </div>
                
                {/* Bar */}
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-full max-w-20 rounded-t transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: color,
                      minHeight: item[metric] > 0 ? '8px' : '0px'
                    }}
                  />
                </div>
                
                {/* Age Group Label */}
                <div className="text-xs text-gray-400 mt-3 text-center">
                  {item.ageGroup}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis reference lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[0.25, 0.5, 0.75].map((ratio) => (
            <div
              key={ratio}
              className="absolute w-full border-t border-gray-700 opacity-30"
              style={{ bottom: `${60 + ratio * 260}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}