import { PrismaClient } from '@prisma/client';
import PrismaUtils from './utils/PrismaUtils.js';

export const client = new PrismaClient();

PrismaUtils.connect(client);