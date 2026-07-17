import { navItem, IsActiveFn } from "@/types";
import { Link } from "@inertiajs/react";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "./ui/button";

interface AppNavigationProps {
    navItems: navItem[];
    isActive: IsActiveFn;
}

export default function AppNavigation({ navItems, isActive }: AppNavigationProps) {
    return (
        <aside className="hidden lg:flex flex-col w-64 shrink-0 px-2 py-4 sticky top-0 h-screen">
            <Link
                href="/"
                className="w-fit rounded-full p-3 text-2xl font-bold transition-colors hover:bg-accent"
            >
                LaraFeed
            </Link>

            <nav className="mt-2 flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`w-fit rounded-full px-4 py-3 text-xl transition-colors hover:bg-accent ${
                            isActive(item.href) ? "font-bold" : "font-normal text-muted-foreground"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}

                <Button render={<Link href="/posts/create" />} nativeButton={false} size="lg" className="mx-2 text-lg">
                    Write a post
                </Button>
            </nav>

            <div className="mt-auto flex flex-col gap-1">
                <ThemeToggle />

                <div className="flex cursor-pointer items-center gap-3 rounded-full p-3 transition-colors hover:bg-accent">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex flex-col text-sm">
                        <span className="font-bold">Jane Doe</span>
                        <span className="text-muted-foreground">@janedoe</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}