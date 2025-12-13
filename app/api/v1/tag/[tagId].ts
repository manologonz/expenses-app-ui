import { ApiType, UrlBuilder } from "@/utils/api/url-builder";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ur } from "zod/locales";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    let tagId: number;
    const session = await getToken({ req });

    if (!session) {
        return res.status(403).json({ detail: "Not authenticated" });
    }

    if (!slug) {
        return res.status(403).json({ detail: "Tag not found" });
    }

    tagId = parseInt(slug[0]);

    if (isNaN(tagId)) {
        return res.status(403).json({ detail: "Tag not found" });
    }

    const urlBuilder = new UrlBuilder(ApiType.LOCAL);

    try {
        const url = urlBuilder.v1().tags(tagId).build();
        const respose = await axios.get(url, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return res.json(respose.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 400).json({
                message: "Tag couldn't be fetched",
                detail:
                    error.response?.data?.detail ||
                    error.response?.status?.toString(),
            });
        } else {
            res.status(400).json({ detail: "Error while fetching tag." });
        }
    }
    res.json({ slug });
}
