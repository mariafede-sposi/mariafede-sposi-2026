import pkg from 'pg';
const { Pool } = pkg;

const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

pool.on('connect', (client) => {
    client.query(`SET statement_timeout = ${TIMEOUT_MS}`);
});
