import { Inject, Injectable } from '@nestjs/common';
import * as casbin from 'casbin';
import { CASBIN_ENFORCER } from './casbin.contants';

@Injectable()
export class CasbinService {
  constructor(
    @Inject(CASBIN_ENFORCER)
    public readonly enforcer: casbin.Enforcer,
  ) {}
  // TODO implement useful methods for our use case with policies via this.enforcer
}
