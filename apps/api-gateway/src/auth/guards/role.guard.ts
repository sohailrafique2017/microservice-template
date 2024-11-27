import { ROLE } from '@app/database/enums';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '@app/api-gateway/auth/decorators/role.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requireRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!requireRoles) return true;

		const { user } = context.switchToHttp().getRequest();
		if (!user || !user.role) {
			throw new ForbiddenException('No roles found for the user');
		}

		const hasRole = requireRoles.some(role => role === user.role.name);

		if (!hasRole) {
			throw new ForbiddenException('You do not have permission to access this resource');
		}

		return true;
	}
}
