import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 

export default defineConfig({
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
  test: {
    // O ambiente 'jsdom' simula o navegador para testar componentes React
    environment: 'jsdom',
    // Arquivo de setup para configurações globais (ex: matchers do jest-dom)
    setupFiles: ['./vitest-setup.ts'],
    // Cobertura de código (opcional)
    coverage: {
      reporter: ['text', 'html']
    },
    // Inclui os tipos do Vitest para o TypeScript
    typecheck: {
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx']
    },
    // Se você quiser que a API do Vitest (describe, it, expect) seja global
    // globals: true,
  },
});