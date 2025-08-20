import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        const appInfoPath = path.resolve(__dirname, 'src/shared/data/appInfo.json');
        const appInfo = JSON.parse(fs.readFileSync(appInfoPath, 'utf-8'));
        return html.replace(/<title>.*<\/title>/, `<title>${appInfo.appName}</title>`);
      }
    }
  ],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
});
