import { NavItem, IsActiveFn, PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "./ui/button";

import { create } from "@/actions/App/Http/Controllers/PostController";
import { create as loginCreate } from "@/actions/App/Http/Controllers/LoginController";
import { create as registerCreate } from "@/actions/App/Http/Controllers/RegisterController";
import { destroy } from "@/actions/App/Http/Controllers/LoginController";

interface AppNavigationProps {
    navItems: NavItem[];
    isActive: IsActiveFn;
}

export default function AppNavigation({ navItems, isActive }: AppNavigationProps) {
    const { user } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.delete(destroy());
    }

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
                        key={item.label} 
                        href={item.href}
                        className={`w-fit rounded-full px-4 py-3 text-xl transition-colors hover:bg-accent ${
                            isActive(item.href.url) ? "font-bold" : "font-normal text-muted-foreground"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}

                { user ? (
                    <Button render={<Link href={create()} />} nativeButton={false} size="lg" className="mx-2 text-lg">
                        Write a post
                    </Button>
                ) : (
                    <div className="mx-2 mt-3 flex flex-col gap-2">
                        <Button render={<Link href={registerCreate()} />} nativeButton={false} size="lg" className="text-lg">
                            Sign up
                        </Button>
                        <Button render={<Link href={loginCreate()} />} nativeButton={false} variant="outline" size="lg" className="text-lg">
                            Sign in
                        </Button>
                    </div>
                )}
            </nav>

            <div className="mt-auto flex flex-col gap-1">
                <ThemeToggle />

                { user ? (
                    <>
                        <div className="flex cursor-pointer items-center gap-3 rounded-full p-3 transition-colors hover:bg-accent">
                            <div className="h-10 w-10 rounded-full bg-muted" />
                            <div className="flex flex-col text-sm">
                                <span className="font-bold">{user.name}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-fit items-center gap-4 rounded-full px-4 py-3 text-xl transition-colors hover:bg-accent"
                        >
                            Sign out
                        </button>
                    </>
                ) : null}
            </div>
        </aside>
    )
}