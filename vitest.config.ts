import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['src/**/*.test.ts'],
                    setupFiles: ['./vitest-setup.ts'],
                }
            },
            {
                test: {
                    name: 'integration',
                    environment: 'node',
                    include: ['backend/tests/integration/**/*.test.ts'],
                    globalSetup: ['backend/tests/global-setup.ts'],
                    setupFiles: ['backend/tests/setup-integration.ts'],
                }
            }
        ]
    }
})