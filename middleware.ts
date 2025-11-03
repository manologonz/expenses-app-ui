// File must be named: middleware.ts (not proxy.ts)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // Middleware function that runs for authenticated users
    function middleware(req) {
        console.log("Authenticated user accessing:", req.nextUrl.pathname);
        console.log("User token:", req.nextauth.token);

        // Add custom logic here (e.g., role-based access control)
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Example: Restrict admin routes
        if (path.startsWith("/admin") && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
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
    matcher: ["/", "/dashboard", "/expense*", "/tag*", "/report*", "/budget*"],
};
