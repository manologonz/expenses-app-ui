// File must be named: middleware.ts (not proxy.ts)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // Middleware function that runs for authenticated users
    function middleware(req) {
        // Add custom logic here (e.g., role-based access control)
        const token = req.nextauth.token;
        const { pathname, origin } = req.nextUrl;

        if (pathname === "/") {
            return NextResponse.redirect(`${origin}/dashboard`);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            // This callback determines if the request is authorized
            authorized: ({ token, req }) => {
                // Return true to allow access, false to redirect to login
                return !!token; // User must have a token (be logged in)
            },
        },
        pages: {
            signIn: "/auth/login", // Redirect to your login page
        },
    }
);

export const config = {
    // Protect these routes with authentication
    matcher: [
        "/",
        "/dashboard",
        "/expense/:path*",
        "/tag/:path*",
        "/report/:path*",
        "/budget/:path*",
    ],
};
