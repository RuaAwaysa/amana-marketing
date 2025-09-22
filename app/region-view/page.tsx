"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../../src/components/ui/navbar";
import { Footer } from "../../src/components/ui/footer";
import BubbleMap from "../../src/components/ui/bubble-map";
import { MarketingData } from "../../src/types/marketing";

export default function RegionView() {
  const [data, setData] = useState<MarketingData | null>(null);

  useEffect(() => {
    fetch("/api/marketing-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const regionalData = data?.campaigns.reduce((acc: any[], campaign) => {
    campaign.regional_performance.forEach((region) => {
      const existingRegion = acc.find((r) => r.region === region.region);
      if (existingRegion) {
        existingRegion.revenue += region.revenue;
        existingRegion.spend += region.spend;
      } else {
        acc.push({
          region: region.region,
          revenue: region.revenue,
          spend: region.spend,
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
              <h1 className="text-3xl md:text-5xl font-bold">Region View</h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regionalData && (
              <>
                <BubbleMap
                  data={regionalData}
                  valueKey="revenue"
                  title="Revenue by Region"
                />
                <BubbleMap
                  data={regionalData}
                  valueKey="spend"
                  title="Spend by Region"
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
