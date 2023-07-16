import { SetMetadata } from '@nestjs/common';
import { CASBIN_PERMISSIONS } from './casbin.contants';

// TODO support also regex for method (GET|POST|PUT)
export type HTTP_METHOD = 'GET' | 'POST' | 'PUT';

export type Permission = {
  endpoint: string;
  method: HTTP_METHOD;
};

export const UsePermissions = (permissions: Permission) => {
  return SetMetadata(CASBIN_PERMISSIONS, permissions);
};
