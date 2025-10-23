import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import urlBuilder from "../../utils/url-builder";
import { JWT } from "next-auth/jwt";

/**
 * Refreshes the access token using the refresh token
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const refreshUrl = urlBuilder.v1().auth().concatenate("/refresh").build();

    const response = await axios.post(refreshUrl, {
      refreshToken: token.refreshToken,
    });

    if (response.status === 200 && response.data) {
      return {
        ...token,
        accessToken: response.data.token || response.data.accessToken,
        refreshToken: response.data.refreshToken ?? token.refreshToken,
        accessTokenExpires:
          Date.now() + (response.data.expiresIn || 3600) * 1000,
        error: undefined,
      };
    }

    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
          const authUrl = urlBuilder.v1().auth().build();

          // Make API call to authenticate user
          const response = await axios.post(authUrl, {
            email: credentials.email,
            password: credentials.password,
          });

          // If authentication is successful, return user object
          if (response.data && response.status === 200) {
            return {
              id: response.data.id || response.data.user?.id,
              email: response.data.email || response.data.user?.email,
              name: response.data.name || response.data.user?.name,
              token: response.data.token || response.data.accessToken,
              refreshToken: response.data.refreshToken,
              expiresIn: response.data.expiresIn || 3600, // Default to 1 hour
            };
          }

          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.message || "Authentication failed";
            throw new Error(message);
          }
          throw new Error("An unexpected error occurred during authentication");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in - store user data and tokens
      if (user && account) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + (user.expiresIn || 3600) * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      console.log("Access token expired, refreshing...");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Add token data to session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
