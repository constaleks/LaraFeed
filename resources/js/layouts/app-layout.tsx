import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <main>
            <header>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </header>
            <article>{children}</article>
        </main>
    )
}