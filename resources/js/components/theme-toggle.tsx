import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex w-fit items-center gap-4 rounded-full px-4 py-3 text-xl transition-colors hover:bg-accent"
        >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
    );
}
