import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        username: string;
        email: string;
        active: boolean;
        token?: string;
        refreshToken: string;
        accessToken: string;
        expiresIn: string;
    }

    interface Session {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            username: string;
            role: string;
            email: string;
            active: boolean;
        };
        accessToken?: string;
        error?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        role: string;
        email: string;
        active: boolean;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        error?: string;
    }
}
