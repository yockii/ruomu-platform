export type User = {
    id?: string;
    username: string;
    realName?: string;
    status?: number;
}

export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    user: User;
}