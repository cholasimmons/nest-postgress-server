export interface JwtPayload {
    sub: string;
    email: string;
    roles?: string[];
}

export interface JwtToken {
    token: string;
}