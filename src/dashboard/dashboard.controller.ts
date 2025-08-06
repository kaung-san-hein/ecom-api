import { Controller, Get } from '@nestjs/common';
import { DashboardService, DashboardStats } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getDashboardStats(): Promise<DashboardStats> {
    return this.dashboardService.getDashboardStats();
  }
} 