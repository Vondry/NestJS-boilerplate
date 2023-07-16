import {
  applyDecorators,
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  HTTP_METHOD,
  UsePermissions,
} from './utils/casbin/usePermissions.guard';
import { CasbinGuard } from './utils/casbin/casbin.guard';

// TODO Resource will be also typed based on available resources in database
export function Access(endpoint: string, method: HTTP_METHOD) {
  return applyDecorators(
    UseGuards(CasbinGuard),
    UsePermissions({
      endpoint,
      method,
    }),
  );
}

@ApiTags('App controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return hello world' })
  async getHello() {
    return this.appService.getHello();
  }

  @Get('members')
  @Access('/members', 'POST')
  async getMember(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ 'members-get': true });
  }

  @Get('/members/update')
  @Access('members', 'GET')
  async patchMembers1(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ 'members-update': true });
  }

  @Get('/members/email')
  @Access('members-email', 'GET')
  async updateMemberEmail(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ 'email-update': true });
  }
}
