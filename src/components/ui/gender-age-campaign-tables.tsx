import { Table } from './table';

interface AgeGroupCampaignData {
  ageGroup: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  spend: number;
  revenue: number;
}

interface GenderCampaignTableProps {
  data: AgeGroupCampaignData[];
  gender: 'male' | 'female';
  className?: string;
}

export function MaleCampaignTable({ data, className = "" }: Omit<GenderCampaignTableProps, 'gender'>) {
  const columns = [
    {
      key: 'ageGroup',
      header: 'Age Group',
      width: '20%',
      sortable: true,
      sortType: 'string' as const,
      render: (value: string) => (
        <div className="font-medium text-white">
          {value}
        </div>
      )
    },
    {
      key: 'impressions',
      header: 'Impressions',
      width: '15%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'clicks',
      header: 'Clicks',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'conversions',
      header: 'Conversions',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-green-400 font-medium text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'ctr',
      header: 'CTR',
      width: '10%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-blue-400 text-sm">
          {value.toFixed(2)}%
        </span>
      )
    },
    {
      key: 'conversionRate',
      header: 'Conv. Rate',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-purple-400 text-sm">
          {value.toFixed(2)}%
        </span>
      )
    },
    {
      key: 'spend',
      header: 'Spend',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-green-400 font-medium text-sm">
          ${value.toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <div className={className}>
      <Table
        title="Male Campaign Performance by Age Group"
        columns={columns}
        data={data}
        showIndex={true}
        maxHeight="400px"
        defaultSort={{ key: 'impressions', direction: 'desc' }}
        emptyMessage="No male demographic data available"
      />
    </div>
  );
}

export function FemaleCampaignTable({ data, className = "" }: Omit<GenderCampaignTableProps, 'gender'>) {
  const columns = [
    {
      key: 'ageGroup',
      header: 'Age Group',
      width: '20%',
      sortable: true,
      sortType: 'string' as const,
      render: (value: string) => (
        <div className="font-medium text-white">
          {value}
        </div>
      )
    },
    {
      key: 'impressions',
      header: 'Impressions',
      width: '15%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'clicks',
      header: 'Clicks',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'conversions',
      header: 'Conversions',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-green-400 font-medium text-sm">
          {value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'ctr',
      header: 'CTR',
      width: '10%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-blue-400 text-sm">
          {value.toFixed(2)}%
        </span>
      )
    },
    {
      key: 'conversionRate',
      header: 'Conv. Rate',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-purple-400 text-sm">
          {value.toFixed(2)}%
        </span>
      )
    },
    {
      key: 'spend',
      header: 'Spend',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-sm">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: '12%',
      align: 'right' as const,
      sortable: true,
      sortType: 'number' as const,
      render: (value: number) => (
        <span className="text-green-400 font-medium text-sm">
          ${value.toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <div className={className}>
      <Table
        title="Female Campaign Performance by Age Group"
        columns={columns}
        data={data}
        showIndex={true}
        maxHeight="400px"
        defaultSort={{ key: 'impressions', direction: 'desc' }}
        emptyMessage="No female demographic data available"
      />
    </div>
  );
}