export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
    comments?: Comment[];
    likes?: Like[];
    likes_count?: number;
}

export interface NavItem {
    href: {
        url: string;
        method: Method;
    };
    label: string;
}

export type IsActiveFn = (href: string) => boolean;

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    posts?: Post[];
    comments?: Comment[];
}

export interface Comment {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    post_id: number;
    user_id: number;
    post?: Post;
    user?: User;
}

export interface Like {
    id: number;
    post_id: number;
    user_id: number;
    created_at: string;
}

export interface PostLikesData {
    count: number;
    user_has_liked: boolean;
}