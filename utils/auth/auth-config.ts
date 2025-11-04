import { credentialsProviderConfig } from "@/utils/auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
// TODO: Add refresh token logic
export const authOptions: NextAuthOptions = {
    providers: [credentialsProviderConfig],
    callbacks: {
        async jwt({ token, user }) {
            if (user?.refreshToken) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {
            // Expose safe user data (but not cookie)
            session.user = token;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
