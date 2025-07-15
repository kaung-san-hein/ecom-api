import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploads/:path(*)')
  serveFile(@Param('path') filePath: string, @Res() res: Response) {
    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Serve the file
    return res.sendFile(fullPath);
  }
}
