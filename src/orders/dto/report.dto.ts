export class MonthlyDataDto {
  [year: number]: number[];
}

export class TopProductDto {
  name: string;
  quantity: number;
  revenue: number;
}

export class RecentOrderDto {
  id: number;
  date: Date;
  total: number;
  status: string;
  customerName: string;
}

export class YearlyComparisonDto {
  [year: number]: {
    orders: number;
    revenue: number;
  };
}

export class OrderReportDto {
  monthlyOrders: MonthlyDataDto;
  monthlyRevenue: MonthlyDataDto;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: TopProductDto[];
  orderStatusDistribution: { [status: string]: number };
  recentOrders: RecentOrderDto[];
  yearlyComparison: YearlyComparisonDto;
}
