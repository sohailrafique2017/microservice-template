import { ROLE } from '@app/database/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const RequirePermisison = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
