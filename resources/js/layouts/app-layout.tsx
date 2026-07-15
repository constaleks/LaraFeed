import { usePage } from "@inertiajs/react";
import type { ReactNode } from "react";
import AppNavigation from "@/components/app-navigation";
import AppMobileNavigation from "@/components/app-mobile-navigation";

interface AppLayoutProps {
    title: string;
    children: ReactNode;
}

const navItems = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/about", label: "About" },
];

export default function AppLayout({ title, children }: AppLayoutProps) {
    const { url } = usePage();

    const isActive = (href: string) => (href === "/" ? url === "/" : url.startsWith(href));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-100 flex justify-center">
            <div className="flex w-full max-w-7xl">
                <AppNavigation navItems={navItems} isActive={isActive} />

                <main className="w-full max-w-3xl border-x border-slate-700/60 min-h-screen pb-16 lg:pb-0">
                    <div className="sticky top-0 z-10 border-b border-slate-700 px-4 py-3 backdrop-blur-md">
                        <h1 className="text-xl font-bold">{title}</h1>
                    </div>
                    <div className="flex flex-col gap-4 px-4 py-4">{children}</div>
                </main>

                <aside className="hidden xl:flex w-80 shrink-0 flex-col gap-4 px-4 py-4 sticky top-0 h-screen">
                    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-sm">
                        <h2 className="mb-2 text-xl font-bold">What's happening</h2>
                        <div className="flex flex-col gap-4 text-sm">
                            <div>
                                <p className="text-slate-400">Trending</p>
                                <p className="font-bold">Lorem Ipsum</p>
                                <p className="text-slate-400">12.3K likes</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Trending</p>
                                <p className="font-bold">Dolor Sit Amet</p>
                                <p className="text-slate-400">8,921 likes</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Trending</p>
                                <p className="font-bold">Consectetur Adipiscing</p>
                                <p className="text-slate-400">5,204 likes</p>
                            </div>
                        </div>
                    </div>

                    <p className="px-2 text-xs text-slate-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </aside>
            </div>

            <AppMobileNavigation navItems={navItems} isActive={isActive} />
        </div>
    );
}