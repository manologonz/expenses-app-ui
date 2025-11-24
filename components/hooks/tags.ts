"use client";

import { useEffect, useState } from "react";
import TagLocalService from "@/utils/api/tags";
import { TagListResponse, Tag } from "@/utils/types";

export type Props = {
    page: number;
    search: number;
    data: TagListResponse[];
};

export function useTagList() {
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [status, setLoading] = useState<"loading" | "error" | "success">(
        "loading"
    );
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const tagService = new TagLocalService();

    const getTags = async () => {
        setLoading("loading");
        const response = await tagService.listTags(search);
        setTagList(response.data?.data || []);
        setLoading("success");
    };

    useEffect(() => {
        getTags();
    }, [search]);

    return {
        data: tagList,
        status,
        next: () => setPage(page + 1),
        doSearch: (value: string) => {
            setSearch(value);
        },
        doSort: (value: string, order: "asc" | "desc") =>
            setSort(`${value}:${order}`),
    };
}
