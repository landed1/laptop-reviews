"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className='relative p-2 rounded-lg hover:bg-[#3a0ca3]'>
      <div className='relative w-5 h-5'>
        <Sun className='absolute h-5 w-5 transition-all dark:rotate-90 dark:scale-0' />
        <Moon className='absolute h-5 w-5 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
      </div>
    </button>
  );
}
