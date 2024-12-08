import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        mkcert(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
            includeAssets: [
                '/favicons/favicon-32px.ico',
                '/favicons/favicon-96px.ico',
                '/icons/icon-24px.png',
                '/icons/icon-32px.png',
                '/icons/icon-48px.png',
                '/icons/icon-64px.png',
                '/icons/icon-72px.png',
                '/icons/icon-96px.png',
                '/icons/icon-144px.png',
                '/icons/icon-192px.png',
                '/icons/icon-256px.png',
                '/icons/icon-512px.png',
            ],
            manifest: {
                name: 'PETMATZ',
                short_name: 'PETMATZ',
                description: '이웃과 함께하는 맞춤형 돌봄 플랫폼',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/icons/icon-24px.png',
                        sizes: '24x24',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-32px.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-48px.png',
                        sizes: '48x48',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-64px.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-72px.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-96px.png',
                        sizes: '96x96',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-144px.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-192px.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-256px.png',
                        sizes: '256x256',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512px.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    define: {
        global: 'window',
    },
});
