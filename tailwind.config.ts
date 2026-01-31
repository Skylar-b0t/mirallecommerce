import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "hsl(215 85% 38%)",      // Deep blue
                    dark: "hsl(215 85% 32%)",
                    foreground: "hsl(0 0% 100%)",
                },
                accent: {
                    DEFAULT: "hsl(32 90% 52%)",       // Warm amber (M-Pesa)
                    foreground: "hsl(0 0% 10%)",
                },
                success: {
                    DEFAULT: "hsl(145 63% 42%)",
                    foreground: "hsl(0 0% 100%)",
                },
                warning: {
                    DEFAULT: "hsl(38 92% 50%)",
                    foreground: "hsl(0 0% 10%)",
                },
                danger: {
                    DEFAULT: "hsl(0 72% 50%)",
                    foreground: "hsl(0 0% 100%)",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                surface: "hsl(var(--surface))",
                "surface-foreground": "hsl(var(--surface-foreground))",
                border: "hsl(var(--border))",
                muted: "hsl(var(--muted-foreground))",
                price: "hsl(var(--price))",
                "price-muted": "hsl(var(--price-muted))",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-satoshi)", "var(--font-inter)", "sans-serif"],
            },
            boxShadow: {
                soft: "0 4px 12px rgba(0, 0, 0, 0.06)",
                "soft-dark": "0 6px 20px rgba(0, 0, 0, 0.4)",
                "inner-light": "inset 0 1px 2px rgba(255, 255, 255, 0.05)",
            },
            transitionProperty: {
                smooth: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-in-right": "slideInRight 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
