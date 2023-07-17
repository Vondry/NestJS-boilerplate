import { z } from 'zod';

export const dbSchema = z.object({
  DATABASE_USER: z.string().min(3),
  DATABASE_PASSWORD: z.string().min(3),
  DATABASE_NAME: z.string().min(3),
  DATABASE_HOST: z.string().min(3),
  DATABASE_PORT: z.string().transform(Number).pipe(z.number()),
});

export const envSchema = z
  .object({
    // Additional project envs
  })
  .merge(dbSchema);

export type ENV = z.infer<typeof envSchema>;
