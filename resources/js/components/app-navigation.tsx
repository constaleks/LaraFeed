import { navItem, IsActiveFn } from "@/types";
import { Link } from "@inertiajs/react";

interface AppNavigationProps {
    navItems: navItem[];
    isActive: IsActiveFn;
}

export default function AppNavigation({ navItems, isActive }: AppNavigationProps) {
    return (
        <aside className="hidden lg:flex flex-col w-64 shrink-0 px-2 py-4 sticky top-0 h-screen">
            <Link
                href="/"
                className="w-fit rounded-full p-3 text-2xl font-bold transition-colors hover:bg-slate-800/60"
            >
                LaraFeed
            </Link>

            <nav className="mt-2 flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`w-fit rounded-full px-4 py-3 text-xl transition-colors hover:bg-slate-800/60 ${
                            isActive(item.href) ? "font-bold" : "font-normal text-slate-300"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}

                <Link href="/posts/create" className="w-fit px-4 py-3 text-xl rounded-full transition-colors bg-slate-500/60 hover:bg-slate-700/60">Write a post</Link>
            </nav>

            <div className="mt-auto flex cursor-pointer items-center gap-3 rounded-full p-3 transition-colors hover:bg-slate-800/60">
                <div className="h-10 w-10 rounded-full bg-slate-700" />
                <div className="flex flex-col text-sm">
                    <span className="font-bold">Jane Doe</span>
                    <span className="text-slate-400">@janedoe</span>
                </div>
            </div>
        </aside>
    )
}