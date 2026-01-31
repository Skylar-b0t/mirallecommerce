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
                    DEFAULT: "#4F46E5", // Indigo-600
                    dark: "#6366F1",    // Indigo-500
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#EC4899", // Pink-500
                    dark: "#F472B6",    // Pink-400
                    foreground: "#FFFFFF",
                },
                success: {
                    DEFAULT: "#14B8A6", // Teal-500
                    foreground: "#FFFFFF",
                },
                warning: {
                    DEFAULT: "#F59E0B", // Amber-500
                    foreground: "#FFFFFF",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                "surface-foreground": "var(--surface-foreground)",
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
