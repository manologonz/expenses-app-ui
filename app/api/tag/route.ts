import { authOptions } from "@/utils/auth/auth-config";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getToken({ req });

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 }
        );
    }

    return NextResponse.json({ message: "Ok I guess" });
}

export async function OPTIONS(request: NextRequest) {}
