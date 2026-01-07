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
				sans: ["var(--font-inter)", "sans-serif"],
				heading: ["var(--font-outfit)", "sans-serif"],
			},
			borderRadius: {
				lg: "1rem", // 16px - Premium roundness
				md: "0.75rem", // 12px
				sm: "0.5rem", // 8px
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(211, 47, 47, 0.15)',
				'glow': '0 0 20px rgba(211, 47, 47, 0.25)',
				'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
