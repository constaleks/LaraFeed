import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

import ThemeToggle from "@/components/theme-toggle";
import { index as homeIndex } from "@/routes/home";
import { Toaster } from "@/components/ui/sonner";

interface AuthLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export default function AuthLayout({ title, description, children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-muted/60 via-background to-background lg:flex">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

                <Link href={homeIndex()} className="relative text-6xl font-bold tracking-tight">
                    LaraFeed
                </Link>
            </div>

            <div className="flex w-full flex-col lg:w-1/2">
                <div className="flex items-center justify-between px-6 py-4 lg:justify-end">
                    <Link href={homeIndex()} className="text-xl font-bold lg:hidden">
                        LaraFeed
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="flex flex-1 items-center justify-center px-6 pb-16">
                    <div className="w-full max-w-sm">
                        <div className="mb-8 flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        </div>

                        {children}
                        <Toaster />
                    </div>
                </div>
            </div>
        </div>
    );
}
