import type { NextConfig } from "next";
import { z } from "zod";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        EXPENSES_API: process.env.EXPENSES_API,
    },
};

export default nextConfig;
