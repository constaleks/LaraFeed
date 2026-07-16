export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user: User;
}

export interface navItem {
    href: string;
    label: string;
}

export type IsActiveFn = (href: string) => boolean;

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}