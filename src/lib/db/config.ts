import { Pool, PoolConfig } from 'pg';

// For Next.js Serverless environments, it's recommended to limit the connection pool
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 5, // Keep small for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
};

// Prevent multiple instances of Pool in development (due to HMR)
const globalForPg = global as unknown as { pgPool: Pool };

export const pool = globalForPg.pgPool || new Pool(poolConfig);

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool;
}

export default pool;
