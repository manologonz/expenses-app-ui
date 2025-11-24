import { UrlBuilder } from "@/utils/api/url-builder";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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

export async function GET(req: NextRequest) {
    const session = await getToken({ req });

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 }
        );
    }

    const urlBuilder = new UrlBuilder();

    const url = urlBuilder.v1().tags().build();
    let requestStatus = 200;

    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return NextResponse.json(response.data, { status: requestStatus });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
        return NextResponse.json({ detai: "Can't get tags" }, { status: 400 });
    }
}

export async function OPTIONS(request: NextRequest) {}
