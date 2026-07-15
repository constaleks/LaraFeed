import { navItem, IsActiveFn } from "@/types";
import { Link } from "@inertiajs/react";

interface AppMobileNavigationProps {
    navItems: navItem[];
    isActive: IsActiveFn;
}

export default function AppMobileNavigation({ navItems, isActive }: AppMobileNavigationProps) {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-slate-700/60 bg-slate-950/90 py-2 backdrop-blur-md lg:hidden">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition-colors hover:bg-slate-800/60 ${
                        isActive(item.href) ? "font-bold" : "font-normal text-slate-300"
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
