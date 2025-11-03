import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import urlBuilder from "../../../../utils/url-builder";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "user@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    // Build the authentication URL using the urlBuilder
                    const authUrl = urlBuilder.v1().auth().login().build();

                    // Make API call to authenticate user
                    const response = await axios.post(authUrl, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const refreshCookie = response.headers["set-cookie"];

                    // If authentication is successful, return user object
                    if (
                        response.data &&
                        response.status === 200 &&
                        refreshCookie
                    ) {
                        return {
                            id: response.data.user.id as string,
                            firstName: response.data.user.firsName as string,
                            lastName: response.data.user.firsName as string,
                            username: response.data.user.username as string,
                            role: response.data.user.role as string,
                            email: response.data.user.email as string,
                            active: response.data.user.active as boolean,
                            token: response.data.accessToken as string,
                            refreshToken: refreshCookie[0],
                            expiresIn: response.data.expiresIn || 3600,
                        };
                    }

                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log(error.response?.data);
                        const message =
                            error.response?.data?.message ||
                            "Authentication failed";
                        throw new Error(message);
                    }
                    throw new Error(
                        "An unexpected error occurred during authentication"
                    );
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            token.refreshToken = user.refreshToken;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
