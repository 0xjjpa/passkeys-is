import { default as onlyPino } from 'pino';

export const logger = onlyPino({
    level: 'debug',
});