<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
            }
        </script>
        @viteReactRefresh
        @vite(['resources/js/app.tsx', 'resources/css/app.css'])
        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>