import { NavItem, IsActiveFn, PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";

import { create as loginCreate } from "@/actions/App/Http/Controllers/LoginController";
import { destroy } from "@/actions/App/Http/Controllers/LoginController";

interface AppMobileNavigationProps {
    navItems: NavItem[];
    isActive: IsActiveFn;
}

export default function AppMobileNavigation({ navItems, isActive }: AppMobileNavigationProps) {
    const { auth } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.delete(destroy());
    }

    return (
        <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-border bg-background/90 py-2 backdrop-blur-md lg:hidden">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition-colors hover:bg-accent ${
                        isActive(item.href.url) ? "font-bold" : "font-normal text-muted-foreground"
                    }`}
                >
                    {item.label}
                </Link>
            ))}

            { auth.user ? (
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full px-4 py-2 text-sm font-normal text-muted-foreground transition-colors hover:bg-accent"
                >
                    Sign out
                </button>
            ) : (
                <Link
                    href={loginCreate()}
                    className="rounded-full px-4 py-2 text-sm font-normal text-muted-foreground transition-colors hover:bg-accent"
                >
                    Sign in
                </Link>
            )}
        </nav>
    );
}
