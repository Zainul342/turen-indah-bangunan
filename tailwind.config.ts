import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // TIB Brand Colors
                brand: {
                    '50': '#FDF2F2',
                    '100': '#FDE8E8',
                    '200': '#FBD5D5',
                    '300': '#F8B4B4',
                    '400': '#F98080',
                    '500': '#F05252',
                    '600': '#D32F2F',
                    '700': '#C81E1E',
                    '800': '#9B1C1C',
                    '900': '#771D1D',
                    DEFAULT: '#D32F2F'
                },
                // Nixtio Premium Colors
                'nix-offwhite': '#F5F5F5',
                'nix-black': '#0A0A0A',
                'nix-gray': '#767676',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            fontFamily: {
                // Use Inter for everything like Nixtio
                sans: ["var(--font-inter)", "Inter", "sans-serif"],
                heading: ["var(--font-inter)", "Inter", "sans-serif"],
                display: ["var(--font-inter)", "Inter", "sans-serif"],
                // Modern Aesthetic Serif
                aesthetic: ["var(--font-playfair)", "Playfair Display", "serif"],
            },
            borderRadius: {
                // Keep Tailwind defaults
                lg: "1rem",
                md: "0.75rem",
                sm: "0.5rem",
                // Nixtio Premium Radius
                'pill': '50px',      // For buttons (Nixtio style)
                'card': '24px',      // For cards
                'card-lg': '30px',   // For large cards
                'nix-u': '0px 0px 24px 24px', // Top flat, bottom rounded
            },
            letterSpacing: {
                // Nixtio Premium - Tight heading spacing
                'nix-tight': '-0.06em',   // For large headings
                'nix-normal': '-0.03em',  // For medium text
            },
            fontSize: {
                'nixtio-giant': ['144px', { lineHeight: '1', letterSpacing: '-0.06em' }],
                'nixtio-4xl': ['85px', { lineHeight: '1', letterSpacing: '-0.04em' }],
                'nixtio-3xl': ['60px', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
            },
            spacing: {
                'nixtio-pad': '30px',
            },
            boxShadow: {
                // TIB Brand glow
                'glow-sm': '0 0 10px rgba(211, 47, 47, 0.15)',
                'glow': '0 0 20px rgba(211, 47, 47, 0.25)',
                // Nixtio Premium shadows (subtle)
                'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
                'nix': '0px 0px 0px 1px rgba(0, 0, 0, 0.1)',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
