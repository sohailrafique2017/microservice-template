import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT }) // Make the service transient to allow different context in each file
export class AppLogger {
	private logger = new Logger();

	constructor() {}

	setContext(context: string) {
		this.logger = new Logger(context); // Set context for the logger (e.g., service name)
	}

	log(message: string) {
		this.logger.log(message);
	}

	error(message: string, trace?: string) {
		this.logger.error(message, trace);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	debug(message: string) {
		this.logger.debug(message);
	}

	verbose(message: string) {
		this.logger.verbose(message);
	}
}
