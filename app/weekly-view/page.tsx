"use client";
import { useEffect, useState } from "react";
import { Navbar } from '../../src/components/ui/navbar';
import { Footer } from '../../src/components/ui/footer';
import CustomLineChart from '../../src/components/ui/line-chart';
import { MarketingData } from '../../src/types/marketing';

export default function WeeklyView() {
  const [data, setData] = useState<MarketingData | null>(null);

  useEffect(() => {
    fetch('/api/marketing-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const weeklyData = data?.campaigns.reduce((acc: any[], campaign) => {
    campaign.weekly_performance.forEach(week => {
      const weekIdentifier = `${week.week_start.split('-')[2]}-${week.week_end.split('-')[2]}`
      const existingWeek = acc.find(w => w.week_start === weekIdentifier);
      if (existingWeek) {
        existingWeek.revenue += week.revenue;
        existingWeek.spend += week.spend;
      } else {
        acc.push({
          week_start: weekIdentifier,
          revenue: week.revenue,
          spend: week.spend
        });
      }
    });
    return acc;
  }, []);

  return (
    <div className="flex h-screen bg-gray-900">
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">
                Weekly View
              </h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {weeklyData && (
              <>
                <CustomLineChart
                  data={weeklyData}
                  xAxisKey="week_start"
                  yAxisKey="revenue"
                  title="Weekly Revenue"
                />
                <CustomLineChart
                  data={weeklyData}
                  xAxisKey="week_start"
                  yAxisKey="spend"
                  title="Weekly Spend"
                />
              </>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
