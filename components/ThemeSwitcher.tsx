"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    // Avoid hydration mismatch without useEffect
    if (!resolvedTheme) {
        return null;
    }

    return (
        <div className="fixed top-6 right-6 z-50 flex gap-2 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "light"
                        ? "bg-white text-black shadow-sm scale-105"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Light Mode"
            >
                <Sun size={18} />
            </button>

            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "dark"
                        ? "bg-gray-800 text-white shadow-sm scale-105"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Dark Mode"
            >
                <Moon size={18} />
            </button>

            <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "system"
                        ? "bg-blue-500/20 text-blue-400 shadow-sm scale-105"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="System Mode"
            >
                <Monitor size={18} />
            </button>
        </div>
    );
}
