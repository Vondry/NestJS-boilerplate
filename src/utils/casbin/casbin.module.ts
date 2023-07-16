import {
  DynamicModule,
  ExecutionContext,
  Global,
  Module,
  Provider,
} from '@nestjs/common';
import * as casbin from 'casbin';
import { Adapter } from 'casbin';

import { CASBIN_ENFORCER, CASBIN_OPTIONS } from './casbin.contants';
import { CasbinGuard } from './casbin.guard';
import { CasbinService } from './casbin.service';

export type CasbinModuleOptions = {
  model: string;
  policy: string | Promise<Adapter>;
  getEnforcerParamsFromContext: (context: ExecutionContext) => {
    subject: string;
    tenant: string;
  };
};

@Global()
@Module({})
export class CasbinModule {
  static register(options: CasbinModuleOptions): DynamicModule {
    if (!options.model || !options.policy) {
      throw new Error('Both model and policy must be provided!');
    }

    const moduleOptionsProvider = {
      provide: CASBIN_OPTIONS,
      useValue: options || {},
    } satisfies Provider;

    const enforcerProvider = {
      provide: CASBIN_ENFORCER,
      useFactory: async () => {
        let policyOption: string | Adapter;

        if (typeof options.policy === 'string') {
          policyOption = options.policy;
        } else {
          policyOption = await options.policy;
        }

        return casbin.newEnforcer(options.model, policyOption);
      },
    } satisfies Provider;

    return {
      module: CasbinModule,
      providers: [
        moduleOptionsProvider,
        enforcerProvider,
        CasbinGuard,
        CasbinService,
      ],
      exports: [
        moduleOptionsProvider,
        enforcerProvider,
        CasbinGuard,
        CasbinService,
      ],
    };
  }
}
