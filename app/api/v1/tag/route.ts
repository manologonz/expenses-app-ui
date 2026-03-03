import { UrlBuilder } from "@/utils/api/url-builder";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const session = await getToken({ req });

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 },
        );
    }

    const data = await req.json();

    const urlBuilder = new UrlBuilder();

    const createUrl = urlBuilder.v1().tags().build();

    try {
        const response = await axios.post(createUrl, data, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.log("Error", error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: "Tag couldn't be created",
                    detail:
                        error.response?.data?.detail ||
                        error.response?.status?.toString(),
                },
                { status: error.response?.status },
            );
        } else {
            return NextResponse.json({ detail: "Can't create tag, API Code:" });
        }
    }
}

export async function GET(req: NextRequest) {
    const session = await getToken({ req });

    const { searchParams } = new URL(req.url);

    const params: Record<string, string> = {};

    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const depth = searchParams.get("depth");

    if (sort) {
        params.sort = sort;
    }

    if (limit) {
        params.limit = limit;
    }

    if (page) {
        params.page = page;
    }

    if (search) {
        params.search = search;
    }

    if (depth) {
        params.depth = depth;
    }

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 },
        );
    }

    const urlBuilder = new UrlBuilder();

    urlBuilder.v1().tags();

    if (Object.keys(params).length > 0) {
        urlBuilder.setParams(params);
    }

    let url = urlBuilder.build();

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
