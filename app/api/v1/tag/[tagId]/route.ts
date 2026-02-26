import { UrlBuilder } from "@/utils/api/url-builder";
import { TagData } from "@/utils/types";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    data: { params: Promise<{ tagId?: string }> },
) {
    const session = await getToken({ req });

    const { tagId: _tagId } = await data.params;

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 },
        );
    }

    if (!_tagId) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const tagId = parseInt(_tagId);

    if (isNaN(tagId)) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const urlBuilder = new UrlBuilder();

    try {
        const url = urlBuilder.v1().tags(tagId).build();
        const respose = await axios.get(url, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return NextResponse.json(respose.data.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return NextResponse.json(
                {
                    message: "Tag couldn't be fetched",
                    detail:
                        error.response?.data?.detail ||
                        error.response?.status?.toString(),
                },
                { status: error.response?.status || 400 },
            );
        } else {
            return NextResponse.json(
                {
                    detail: "Error while fetching tag.",
                },
                { status: 400 },
            );
        }
    }
}

export async function PUT(
    req: NextRequest,
    data: { params: Promise<{ tagId?: string }> },
) {
    const session = await getToken({ req });

    const { tagId: _tagId } = await data.params;

    const body = await req.json();

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 },
        );
    }

    if (!_tagId) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const tagId = parseInt(_tagId);

    if (isNaN(tagId)) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const urlBuilder = new UrlBuilder();

    const tagData: TagData = {
        name: body.name,
    };

    if (body.id) {
        tagData.id = body.id;
    }

    if (body.color) {
        tagData.color = body.color;
    }

    try {
        const url = urlBuilder.v1().tags(tagId).build();
        const respose = await axios.put(url, tagData, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return NextResponse.json(respose.data.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: "Tag couldn't be fetched",
                    detail:
                        error.response?.data?.detail ||
                        error.response?.status?.toString(),
                },
                { status: error.response?.status || 400 },
            );
        } else {
            return NextResponse.json(
                {
                    detail: "Error while fetching tag.",
                },
                { status: 400 },
            );
        }
    }
}

export async function DELETE(
    req: NextRequest,
    data: { params: Promise<{ tagId?: string }> },
) {
    const session = await getToken({ req });

    const { tagId: _tagId } = await data.params;

    if (!session) {
        return NextResponse.json(
            { detail: "Not authenticated" },
            { status: 403 },
        );
    }

    if (!_tagId) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const tagId = parseInt(_tagId);

    if (isNaN(tagId)) {
        return NextResponse.json({ detail: "Tag not found" }, { status: 403 });
    }

    const urlBuilder = new UrlBuilder();

    try {
        const url = urlBuilder.v1().tags(tagId).build();
        const respose = await axios.delete(url, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return NextResponse.json(respose.data.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: "Tag couldn't be deleted",
                    detail:
                        error.response?.data?.detail ||
                        error.response?.status?.toString(),
                },
                { status: error.response?.status || 400 },
            );
        } else {
            return NextResponse.json(
                {
                    detail: "Error while deleting tag.",
                },
                { status: 400 },
            );
        }
    }
}
