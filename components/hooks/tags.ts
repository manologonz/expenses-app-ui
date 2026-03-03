"use client";

import { useState } from "react";
import TagLocalService from "@/utils/api/tags";
import {
    TagListResponse,
    Tag,
    ActionStatus,
    TagListOptions,
} from "@/utils/types";
import useSWRInfinite from "swr/infinite";
import { ApiType, UrlBuilder } from "@/utils/api/url-builder";
import axios from "axios";
import useSWR from "swr";

export type Props = {
    page: number;
    search: number;
    data: TagListResponse[];
};

export function useTagList(options?: TagListOptions) {
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const pageLimit = "25";
    const urlBuilder = new UrlBuilder(ApiType.LOCAL);

    const tagService = new TagLocalService();

    // SWR expects a fetcher with a single argument
    const fetcher = async (url: string): Promise<TagListResponse> => {
        const response = await axios.get(url);
        return response.data;
    };

    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data) return null;

        const params: Record<string, string> = {
            limit: pageLimit,
        };

        if (sort) {
            params.sort = sort;
        }

        if (options?.depth) {
            params.depth = options.depth;
        }

        params.page = (pageIndex + 1).toString();

        if (search) {
            params.search = search;
        }

        return tagService.getKeyUrl(params);
    };

    const { data, error, isLoading, isValidating, size, setSize, mutate } =
        useSWRInfinite(
            getKey, // SWR key
            fetcher, // fetcher receives the key
            { parallel: true }, // options
        );

    const isLoadingMore =
        isValidating &&
        size > 0 &&
        data &&
        typeof data[size - 1] === "undefined";

    const status = error
        ? ActionStatus.ERROR
        : isLoading
          ? ActionStatus.LOADING
          : isLoadingMore
            ? ActionStatus.LOADING_MORE
            : ActionStatus.SUCCESS;

    return {
        data: data ?? [],
        hasMore: data ? data[data.length - 1].hasMore : false,
        status,
        search,
        mutate,
        next: () => setSize((s) => s + 1),
        doSearch: (value: string) => setSearch(value),
        doSort: (value: string, order: "asc" | "desc") =>
            setSort(`${value}:${order}`),
    };
}

export function useTagItem(tagId: number) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const tagService = new TagLocalService();
    const fetcher = async (): Promise<Tag> => {
        const response = await tagService.getTag(tagId);
        return response.data;
    };

    const deleteTag = async () => {
        return tagService.deleteTag(tagId);
    };

    const { data, isLoading, mutate, error } = useSWR("tag-item", fetcher);

    const status = error
        ? ActionStatus.ERROR
        : isLoading
          ? ActionStatus.LOADING
          : ActionStatus.SUCCESS;

    return {
        deleteLoading,
        deleteTag,
        data,
        status,
        mutate,
    };
}
