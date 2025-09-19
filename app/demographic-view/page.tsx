"use client";
import { useState, useEffect, useMemo } from 'react';
import { fetchMarketingData } from '../../src/lib/api';
import { MarketingData, Campaign, DemographicBreakdown } from '../../src/types/marketing';
import { Navbar } from '../../src/components/ui/navbar';
import { CardMetric } from '../../src/components/ui/card-metric';
import { Footer } from '../../src/components/ui/footer';
import { Users, UserCheck, TrendingUp, Target, MousePointer, DollarSign, BarChart3 } from 'lucide-react';

interface GenderMetrics {
  clicks: number;
  spend: number;
  revenue: number;
}

export default function DemographicView() {
  const [marketingData, setMarketingData] = useState<MarketingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMarketingData();
        setMarketingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error loading marketing data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate gender-based metrics from all campaigns
  const genderMetrics = useMemo(() => {
    if (!marketingData?.campaigns) {
      return {
        male: { clicks: 0, spend: 0, revenue: 0 },
        female: { clicks: 0, spend: 0, revenue: 0 }
      };
    }

    const maleMetrics: GenderMetrics = { clicks: 0, spend: 0, revenue: 0 };
    const femaleMetrics: GenderMetrics = { clicks: 0, spend: 0, revenue: 0 };

    marketingData.campaigns.forEach((campaign: Campaign) => {
      campaign.demographic_breakdown.forEach((breakdown: DemographicBreakdown) => {
        const { gender, performance } = breakdown;
        const campaignSpend = campaign.spend;
        const campaignRevenue = campaign.revenue;
        
        // Calculate proportional spend and revenue based on clicks percentage
        const totalClicks = campaign.clicks;
        const clicksPercentage = totalClicks > 0 ? performance.clicks / totalClicks : 0;
        const proportionalSpend = campaignSpend * clicksPercentage;
        const proportionalRevenue = campaignRevenue * clicksPercentage;

        if (gender.toLowerCase() === 'male') {
          maleMetrics.clicks += performance.clicks;
          maleMetrics.spend += proportionalSpend;
          maleMetrics.revenue += proportionalRevenue;
        } else if (gender.toLowerCase() === 'female') {
          femaleMetrics.clicks += performance.clicks;
          femaleMetrics.spend += proportionalSpend;
          femaleMetrics.revenue += proportionalRevenue;
        }
      });
    });

    return {
      male: maleMetrics,
      female: femaleMetrics
    };
  }, [marketingData?.campaigns]);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading demographic data...</div>
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
    <div className="flex h-screen bg-gray-900">
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">
                Demographic View
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Gender-based performance metrics across all campaigns
              </p>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Gender Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Male Metrics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Users className="mr-2 text-blue-400" />
                Male Demographics
              </h2>
              
              <CardMetric
                title="Total Clicks by Males"
                value={genderMetrics.male.clicks.toLocaleString()}
                icon={<MousePointer className="w-5 h-5" />}
                className="border-blue-500/20 hover:border-blue-500/40"
              />
              
              <CardMetric
                title="Total Spend by Males"
                value={`$${genderMetrics.male.spend.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                className="border-blue-500/20 hover:border-blue-500/40"
              />
              
              <CardMetric
                title="Total Revenue by Males"
                value={`$${genderMetrics.male.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<BarChart3 className="w-5 h-5" />}
                className="border-blue-500/20 hover:border-blue-500/40"
              />
            </div>

            {/* Female Metrics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <UserCheck className="mr-2 text-pink-400" />
                Female Demographics
              </h2>
              
              <CardMetric
                title="Total Clicks by Females"
                value={genderMetrics.female.clicks.toLocaleString()}
                icon={<MousePointer className="w-5 h-5" />}
                className="border-pink-500/20 hover:border-pink-500/40"
              />
              
              <CardMetric
                title="Total Spend by Females"
                value={`$${genderMetrics.female.spend.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                className="border-pink-500/20 hover:border-pink-500/40"
              />
              
              <CardMetric
                title="Total Revenue by Females"
                value={`$${genderMetrics.female.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<BarChart3 className="w-5 h-5" />}
                className="border-pink-500/20 hover:border-pink-500/40"
              />
            </div>

            {/* Summary Metrics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-400" />
                Summary
              </h2>
              
              <CardMetric
                title="Total Clicks"
                value={(genderMetrics.male.clicks + genderMetrics.female.clicks).toLocaleString()}
                icon={<Target className="w-5 h-5" />}
                className="border-green-500/20 hover:border-green-500/40"
              />
              
              <CardMetric
                title="Total Spend"
                value={`$${(genderMetrics.male.spend + genderMetrics.female.spend).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-5 h-5" />}
                className="border-green-500/20 hover:border-green-500/40"
              />
              
              <CardMetric
                title="Total Revenue"
                value={`$${(genderMetrics.male.revenue + genderMetrics.female.revenue).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                icon={<BarChart3 className="w-5 h-5" />}
                className="border-green-500/20 hover:border-green-500/40"
              />
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Male Click Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.male.clicks / (genderMetrics.male.clicks + genderMetrics.female.clicks)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Male Spend Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.male.spend / (genderMetrics.male.spend + genderMetrics.female.spend)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Male Revenue Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.male.revenue / (genderMetrics.male.revenue + genderMetrics.female.revenue)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Female Click Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.female.clicks / (genderMetrics.male.clicks + genderMetrics.female.clicks)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Female Spend Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.female.spend / (genderMetrics.male.spend + genderMetrics.female.spend)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Female Revenue Share:</span>
                  <span className="text-white font-medium">
                    {((genderMetrics.female.revenue / (genderMetrics.male.revenue + genderMetrics.female.revenue)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
