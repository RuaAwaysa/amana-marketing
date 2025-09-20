"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchMarketingData } from "../../src/lib/api";
import { MarketingData, DevicePerformance } from "../../src/types/marketing";
import { Navbar } from "../../src/components/ui/navbar";
import { Footer } from "../../src/components/ui/footer";
import { CardMetric } from "../../src/components/ui/card-metric";
import { BarChart } from "../../src/components/ui/bar-chart";
import { Table } from "../../src/components/ui/table";
import {
  Smartphone,
  Monitor,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Users,
  Eye,
} from "lucide-react";

export default function DeviceView() {
  const [marketingData, setMarketingData] = useState<MarketingData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMarketingData();
        setMarketingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Error loading marketing data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const devicePerformanceData = useMemo(() => {
    if (!marketingData?.campaigns) return [];

    const aggregated: { [key: string]: DevicePerformance } = {};

    marketingData.campaigns.forEach((campaign) => {
      campaign.device_performance.forEach((dp) => {
        if (!aggregated[dp.device]) {
          aggregated[dp.device] = { ...dp };
        } else {
          aggregated[dp.device].impressions += dp.impressions;
          aggregated[dp.device].clicks += dp.clicks;
          aggregated[dp.device].conversions += dp.conversions;
          aggregated[dp.device].spend += dp.spend;
          aggregated[dp.device].revenue += dp.revenue;
          // For CTR and Conversion Rate, we'll re-calculate at the end
        }
      });
    });

    return Object.values(aggregated).map((dp) => ({
      ...dp,
      ctr: dp.impressions > 0 ? (dp.clicks / dp.impressions) * 100 : 0,
      conversion_rate: dp.clicks > 0 ? (dp.conversions / dp.clicks) * 100 : 0,
    }));
  }, [marketingData?.campaigns]);

  const mobileData = devicePerformanceData.find((d) => d.device === "Mobile");
  const desktopData = devicePerformanceData.find((d) => d.device === "Desktop");

  const totalImpressions = devicePerformanceData.reduce(
    (sum, d) => sum + d.impressions,
    0
  );
  const totalClicks = devicePerformanceData.reduce(
    (sum, d) => sum + d.clicks,
    0
  );
  const totalConversions = devicePerformanceData.reduce(
    (sum, d) => sum + d.conversions,
    0
  );
  const totalSpend = devicePerformanceData.reduce((sum, d) => sum + d.spend, 0);
  const totalRevenue = devicePerformanceData.reduce(
    (sum, d) => sum + d.revenue,
    0
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading device data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-400 text-xl">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">
                Device Performance
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Compare marketing campaign performance across mobile and desktop
                devices.
              </p>
            </div>
          </div>
        </section>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CardMetric
              title="Total Impressions"
              value={totalImpressions.toLocaleString()}
              icon={<Eye className="w-5 h-5" />}
              className="border-purple-500/20 hover:border-purple-500/40"
            />
            <CardMetric
              title="Total Clicks"
              value={totalClicks.toLocaleString()}
              icon={<MousePointerClick className="w-5 h-5" />}
              className="border-green-500/20 hover:border-green-500/40"
            />
            <CardMetric
              title="Total Conversions"
              value={totalConversions.toLocaleString()}
              icon={<Users className="w-5 h-5" />}
              className="border-blue-500/20 hover:border-blue-500/40"
            />
            <CardMetric
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`}
              icon={<DollarSign className="w-5 h-5" />}
              className="border-yellow-500/20 hover:border-yellow-500/40"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {mobileData && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Smartphone className="mr-2 text-blue-400" />
                  Mobile Performance
                </h2>
                <CardMetric
                  title="Mobile Impressions"
                  value={mobileData.impressions.toLocaleString()}
                  icon={<Eye className="w-5 h-5" />}
                  className="border-blue-500/20 hover:border-blue-500/40"
                />
                <CardMetric
                  title="Mobile Clicks"
                  value={mobileData.clicks.toLocaleString()}
                  icon={<MousePointerClick className="w-5 h-5" />}
                  className="border-blue-500/20 hover:border-blue-500/40"
                />
                <CardMetric
                  title="Mobile Conversions"
                  value={mobileData.conversions.toLocaleString()}
                  icon={<Users className="w-5 h-5" />}
                  className="border-blue-500/20 hover:border-blue-500/40"
                />
                <CardMetric
                  title="Mobile Spend"
                  value={`$${mobileData.spend.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<DollarSign className="w-5 h-5" />}
                  className="border-blue-500/20 hover:border-blue-500/40"
                />
                <CardMetric
                  title="Mobile Revenue"
                  value={`$${mobileData.revenue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<TrendingUp className="w-5 h-5" />}
                  className="border-blue-500/20 hover:border-blue-500/40"
                />
              </div>
            )}

            {desktopData && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Monitor className="mr-2 text-green-400" />
                  Desktop Performance
                </h2>
                <CardMetric
                  title="Desktop Impressions"
                  value={desktopData.impressions.toLocaleString()}
                  icon={<Eye className="w-5 h-5" />}
                  className="border-green-500/20 hover:border-green-500/40"
                />
                <CardMetric
                  title="Desktop Clicks"
                  value={desktopData.clicks.toLocaleString()}
                  icon={<MousePointerClick className="w-5 h-5" />}
                  className="border-green-500/20 hover:border-green-500/40"
                />
                <CardMetric
                  title="Desktop Conversions"
                  value={desktopData.conversions.toLocaleString()}
                  icon={<Users className="w-5 h-5" />}
                  className="border-green-500/20 hover:border-green-500/40"
                />
                <CardMetric
                  title="Desktop Spend"
                  value={`$${desktopData.spend.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<DollarSign className="w-5 h-5" />}
                  className="border-green-500/20 hover:border-green-500/40"
                />
                <CardMetric
                  title="Desktop Revenue"
                  value={`$${desktopData.revenue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<TrendingUp className="w-5 h-5" />}
                  className="border-green-500/20 hover:border-green-500/40"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <BarChart
              title="Spend by Device"
              data={devicePerformanceData.map((dp) => ({
                label: dp.device,
                value: dp.spend,
                color: dp.device === "Mobile" ? "#3B82F6" : "#10B981",
              }))}
              formatValue={(value) => `$${value.toLocaleString()}`}
            />
            <BarChart
              title="Revenue by Device"
              data={devicePerformanceData.map((dp) => ({
                label: dp.device,
                value: dp.revenue,
                color: dp.device === "Mobile" ? "#3B82F6" : "#10B981",
              }))}
              formatValue={(value) => `$${value.toLocaleString()}`}
            />
          </div>

          <div className="overflow-x-auto w-full max-w-full">
            <Table
              title="Device Performance Details"
              showIndex={true}
              maxHeight="400px"
              columns={[
                {
                  key: "device",
                  header: "Device",
                  width: "15%",
                  sortable: true,
                  sortType: "string",
                  render: (value) => (
                    <div className="font-medium text-white flex items-center">
                      {value === "Mobile" ? (
                        <Smartphone className="h-4 w-4 mr-2 text-blue-400" />
                      ) : (
                        <Monitor className="h-4 w-4 mr-2 text-green-400" />
                      )}
                      {value}
                    </div>
                  ),
                },
                {
                  key: "percentage_of_traffic",
                  header: "Traffic %",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-sm">{value.toFixed(1)}%</span>
                  ),
                },
                {
                  key: "impressions",
                  header: "Impressions",
                  width: "15%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-sm">{value.toLocaleString()}</span>
                  ),
                },
                {
                  key: "clicks",
                  header: "Clicks",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-sm">{value.toLocaleString()}</span>
                  ),
                },
                {
                  key: "conversions",
                  header: "Conversions",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-green-400 font-medium text-sm">
                      {value.toLocaleString()}
                    </span>
                  ),
                },
                {
                  key: "ctr",
                  header: "CTR",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-blue-400 text-sm">
                      {value.toFixed(2)}%
                    </span>
                  ),
                },
                {
                  key: "conversion_rate",
                  header: "Conv. Rate",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-purple-400 text-sm">
                      {value.toFixed(2)}%
                    </span>
                  ),
                },
                {
                  key: "spend",
                  header: "Spend",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-sm">
                      $
                      {value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  ),
                },
                {
                  key: "revenue",
                  header: "Revenue",
                  width: "10%",
                  align: "right",
                  sortable: true,
                  sortType: "number",
                  render: (value) => (
                    <span className="text-green-400 font-medium text-sm">
                      $
                      {value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  ),
                },
              ]}
              defaultSort={{ key: "percentage_of_traffic", direction: "desc" }}
              data={devicePerformanceData}
              emptyMessage="No device performance data available"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
