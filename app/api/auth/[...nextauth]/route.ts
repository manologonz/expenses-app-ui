import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import urlBuilder from "../../../../utils/url-builder";
import { authOptions } from "@/utils/auth/auth-config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
