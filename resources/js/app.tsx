import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    strictMode: true,
    pages: {
        path: './pages',
        extension: '.tsx',
        lazy: true,
    },
});