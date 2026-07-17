import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from '@/hooks/use-theme';

createInertiaApp({
    strictMode: true,
    pages: {
        path: './pages',
        extension: '.tsx',
        lazy: true,
    },
    withApp: (app) => <ThemeProvider>{app}</ThemeProvider>,
});