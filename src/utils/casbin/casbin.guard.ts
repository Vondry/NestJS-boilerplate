import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as casbin from 'casbin';
import {
  CASBIN_ENFORCER,
  CASBIN_OPTIONS,
  CASBIN_PERMISSIONS,
} from './casbin.contants';
import { CasbinModuleOptions } from './casbin.module';
import { Permission } from './usePermissions.guard';

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CASBIN_ENFORCER) private enforcer: casbin.Enforcer,
    @Inject(CASBIN_OPTIONS) private options: CasbinModuleOptions,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const permission = this.reflector.get<Permission>(
        CASBIN_PERMISSIONS,
        context.getHandler(),
      );

      const params = this.options.getEnforcerParamsFromContext(context);

      return await this.enforcer.enforce(
        params.subject,
        params.tenant,
        permission.endpoint,
        permission.method,
      );
    } catch (e) {
      console.error(e);
    }
  }
}
