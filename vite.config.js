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
    // Padrão leve: testes de lógica rodam em node. Arquivos que precisam de
    // DOM (testes de componente .tsx) declaram `// @vitest-environment jsdom`
    // no topo — mecanismo oficial do Vitest 4 para ambiente por arquivo.
    environment: 'node',
    // Setup global: o vitest-setup.ts importa o jest-dom apenas quando o
    // ambiente do arquivo em execução tem DOM (window), evitando custo em
    // testes unitários puros.
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