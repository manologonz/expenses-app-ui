import CredentialsProvider from "next-auth/providers/credentials";
import { UrlBuilder } from "@/utils/api/url-builder";
import axios from "axios";
import dayjs from "dayjs";

export const credentialsProviderConfig = CredentialsProvider({
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
            const urlBuilder = new UrlBuilder();
            const authUrl = urlBuilder.v1().auth().login().build();

            // Make API call to authenticate user
            const response = await axios.post(authUrl, {
                email: credentials.email,
                password: credentials.password,
            });

            const refreshCookie = response.headers["set-cookie"];

            // If authentication is successful, return user object
            if (response.data && response.status === 200 && refreshCookie) {
                const user = {
                    id: response.data.user.id as string,
                    firstName: response.data.user.firstName as string,
                    lastName: response.data.user.firstName as string,
                    username: response.data.user.username as string,
                    role: response.data.user.role as string,
                    email: response.data.user.email as string,
                    active: response.data.user.active as boolean,
                    refreshToken: refreshCookie[0],
                    accessToken: response.data.accessToken,
                    expiresIn: response.data.accessTokenExpiration as string,
                };

                return user;
            }

            return null;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message || "Authentication failed";
                throw new Error(message);
            }
            throw new Error(
                "An unexpected error occurred during authentication"
            );
        }
    },
});
