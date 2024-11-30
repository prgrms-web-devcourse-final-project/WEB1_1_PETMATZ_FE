import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), mkcert()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    define: {
        global: 'window',
    },
});
