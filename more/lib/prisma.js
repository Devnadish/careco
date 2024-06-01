/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client';

const db =
    globalThis.prisma ||
    new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    });
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;
