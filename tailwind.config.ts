import type { Config } from 'tailwindcss';
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: { canvas: '#0A0B0D', surface: '#121418', elevated: '#181B20', volt: '#D4FF00', ink: '#F5F5F7', muted: '#AFB3BD' },
            fontFamily: { display: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'], body: ['Plus Jakarta Sans', 'Arial', 'sans-serif'] },
            transitionTimingFunction: { crisp: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        }
    },
    plugins: []
} satisfies Config;

