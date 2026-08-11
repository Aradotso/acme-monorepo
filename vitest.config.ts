import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['soak-unbounded-5/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['soak-unbounded-5/math.ts'],
      thresholds: { lines: 100, functions: 100, statements: 100, branches: 100 },
    },
  },
});
