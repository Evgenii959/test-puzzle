import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['fsevents'], // Укажите зависимости, которые должны быть внешними, если необходимо
    },
  },
});
