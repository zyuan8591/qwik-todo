import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData(source, fp) {
            if (fp.endsWith('variable.scss')) return source;
            return `@import '@/assets/styles/variable.scss'; ${source}`;
          },
        },
      },
    },
  };
});
