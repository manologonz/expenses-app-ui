import { credentialsProviderConfig } from "@/utils/auth/providers/credentials";
import dayjs from "dayjs";
import { NextAuthOptions } from "next-auth";
import { refreshAccessToken } from "./token";

export const authOptions: NextAuthOptions = {
    providers: [credentialsProviderConfig],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = { ...token, ...user };
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            const today = dayjs();
            const accessTokenExpiration = dayjs(token.expiresIn as string);

            if (today.isBefore(accessTokenExpiration)) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            // Expose safe user data (but not cookie)
            session.user = token;
            session.accessToken = token.accessToken;
            session.error = token.error;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
