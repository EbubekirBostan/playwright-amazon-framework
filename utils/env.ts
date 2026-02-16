import 'dotenv/config';

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const ENV = {
  baseUrl: must('BASE_URL'),
  headless: (process.env.HEADLESS ?? 'true').toLowerCase() === 'true',
  workers: Number(process.env.WORKERS ?? '4'),
};
