<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config("app.name") }}</title>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />
    @vite('resources/css/app.css')
    @viteReactRefresh
    @vite('resources/react/app.tsx')
</head>
<body>
<h1>testoqy</h1>
<div id="app"></div>
</body>
</html>
