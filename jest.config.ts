import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from 'jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
  collectCoverage: true,
  // collectCoverageFrom: [
  //   '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
  //   '!**/*.spec.{ts,js}',
  // ],
  // coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text-summary'],
});
