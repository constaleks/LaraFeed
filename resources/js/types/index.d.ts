export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface navItem {
    href: string;
    label: string;
}

export type IsActiveFn = (href: string) => boolean;